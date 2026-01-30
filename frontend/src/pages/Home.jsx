import { Link } from "react-router-dom";
import.meta.env.VITE_GOOGLE_CLIENT_ID
import.meta.env.VITE_API_URL
import axios from "axios";
import {React, useState, useEffect } from "react";



export default function Home() {
  
  const API_BASE = import.meta.env.VITE_API_URL; // e.g. https://your-backend.herokuapp.com
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;    

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend API
    axios.get(`${API_BASE}/`)  
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      }); 
  }, []);

    
  return (  
    <>      
    {/* ========================= SECTION MAIN ========================= */}
    <section className="section-intro padding-y-sm">
      <div className="container">
        <div className="intro-banner-wrap">
          <img src="/assets/images/banners/1.jpg" className ="img-fluid rounded" />
        </div>

      </div> {/* container //  */}
    </section>
    {/* ========================= SECTION MAIN END// ========================= */}

    {/* ========================= SECTION  ========================= */}
    <section className="section-name padding-y-sm">
      <div className="container">     
        <header className="section-heading">
          <Link to="/store" className="btn btn-outline-primary float-right">See all</Link>
          <h3 className="section-title">Popular products</h3>
        </header>{/* sect-heading */}
      
        <div className="row">
          { products.map((product) => (       
            <div className="col-md-3" key={product.id}>
                <div className="card card-product-grid">                  
                  <Link to={`/store/product/${product.slug}`} className="img-wrap"> <img src={product.product_image} /> </Link>
                 
                  <figcaption className="info-wrap">
                    <a href="./product-detail.html" className="title">{product.product_name}</a>
                    <div className="price mt-1">${product.price}</div> 
                  </figcaption>
                </div>
            </div> 
            ))
          }        
        </div> {/* row.// */}
      </div>{/* container // */}
    </section>
    
    </>
  );
}
