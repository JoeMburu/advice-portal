import { useState } from "react";

const TOTAL = 10;

export default function App() {
  const [index, setIndex] = useState(1);
  const [advice, setAdvice] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE = import.meta.env.VITE_API_URL; // e.g. https://your-backend.herokuapp.com
  console.log("API_BASE: ", API_BASE);

  async function fetchNext() {
    setError("");

    if (done) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/advice/${index}/`);
      console.log("RES: ")
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = await res.json();

      if (data.done) {
        setDone(true);
        setAdvice(data.message ?? "That's all the advice.");
      } else {
        setAdvice(data.advice);
        if (index >= TOTAL) setDone(true);
        setIndex((prev) => prev + 1);
      }
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 640, margin: "40px auto", fontFamily: "system-ui" }}>
      <h1>Advice</h1>

      <button onClick={fetchNext} disabled={loading || done}>
        {loading ? "Loading..." : done ? "No more advice" : "Get next advice"}
      </button>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {advice && (
        <div style={{ marginTop: 20, padding: 16, border: "1px solid #ddd" }}>
          {advice}
        </div>
      )}

      {!done && <p style={{ marginTop: 12 }}>Click up to {TOTAL} times.</p>}
      {done && <p style={{ marginTop: 12 }}>You reached the end.</p>}
    </div>
  );
}
