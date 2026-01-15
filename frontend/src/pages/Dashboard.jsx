import { Link } from "react-router-dom";



export default function Dashboard() {
  
  const API_BASE = import.meta.env.VITE_API_URL; // e.g. https://your-backend.herokuapp.com
    
  return (
    <>
    <section className="section-footer border-top">
      <div className="container">
        <h2>Dashboard</h2>
      </div>{/* //container */}
    </section>
    </>
  );
}