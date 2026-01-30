import { Link, useParams } from "react-router-dom";
import {React, useState, useEffect } from "react";
import axios from "axios";



export default function ProductDetail() {  
  const API_BASE = import.meta.env.VITE_API_URL; 

  const { slug } = useParams();  
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      const response = await axios.get(`${API_BASE}/store/product/${slug}/`);
      setProduct(response.data[0]);
    }
    fetchProduct();
  }, [slug, API_BASE]);

  if (!product) return <div>Loading...</div>;
  
  return (
    <>    
    <section className="section-content padding-y bg">
      <div className="container">
        <div className="card">
          <div className="row no-gutters">
            <aside className="col-md-6">
              <article className="gallery-wrap"> 
                <div className="img-big-wrap">
                  <a href="#"><img src={product.product_image} /></a>
                </div> 
              </article> 
            </aside>
            <main className="col-md-6 border-left">
              <article className="content-body">
                <h2 className="title">{product.product_name}</h2>
                <div className="mb-3"> 
                  <div className="price h4">{product.price}</div> 
                </div> 
                <p>{product.description}</p>
                <hr />                 
                <a href="./product-detail.html" className="btn  btn-primary"> <span className="text">Add to cart</span> <i className="fas fa-shopping-cart"></i>  </a>
              </article> 
            </main> 
          </div>
        </div>
      </div> 
    </section>
    </>
  );
}