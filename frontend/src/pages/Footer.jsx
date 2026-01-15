import { Link } from "react-router-dom";



export default function Footer() {
  
  const API_BASE = import.meta.env.VITE_API_URL; // e.g. https://your-backend.herokuapp.com
    
  return (
    <>
    <footer className="section-footer border-top">
      <div className="container">
        <section className="footer-bottom border-top row">
          <div className="col-md-2">
            <p className="text-muted"> &copy; 2026 HelmiData </p>
          </div>
          <div className="col-md-8 text-md-center">
            <span  className="px-2">info@pixsellz.io</span>
            <span  className="px-2">+879-332-9375</span>
            <span  className="px-2">Pihkatie 12 A 5, 65320, Vaasa</span>
          </div>
          <div className="col-md-2 text-md-right text-muted">
            <i className="fab fa-lg fa-cc-visa"></i>
            <i className="fab fa-lg fa-cc-paypal"></i>
            <i className="fab fa-lg fa-cc-mastercard"></i>
          </div>
        </section>
      </div>{/* //container */}
    </footer>
    </>
  );
}