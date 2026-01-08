import { useState } from "react";

const TOTAL = 10;

export default function App() {
  const [index, setIndex] = useState(1);
  const [advice, setAdvice] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE = import.meta.env.VITE_API_URL; // e.g. https://your-backend.herokuapp.com
  

  async function fetchNext() {
    setError("");
    // const res = await fetch(`/api/advice/${index}`);
    // const data = await res.json();
    // console.log(data);
    // console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
    // console.log("MODE:", import.meta.env.MODE);

    if (done) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/advice/${index}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setAdvice(data.advice);
      if (index >= TOTAL) {
        setDone(true);
      } else {
        setIndex(index + 1);
      }

    }
    catch (err) {
      setError(err.message);
    }
    finally {
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
