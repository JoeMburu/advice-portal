import { Link, useParams, useNavigate  } from "react-router-dom";
import {React, useState, useEffect } from "react";
import axios from "axios";

export default function ProductDetail({onRefreshCart}) {  
  const API_BASE = import.meta.env.VITE_API_URL; 
  const navigate = useNavigate();
  const { slug } = useParams();  
  const [product, setProduct] = useState(null);


  const authConfig = () => {
    const token = localStorage.getItem("access_token");

  return token
    ? {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    : {
        withCredentials: true,
      };
  };  

  useEffect(() => {
    async function fetchProduct() {
      const response = await axios.get(`${API_BASE}/store/product/${slug}/`);
      setProduct(response.data[0]);
    }
    fetchProduct();
  }, [slug, API_BASE]);

  if (!product) return <div>Loading...</div>;

  const handleAddToCart = async (productId) => {
    axios.defaults.withCredentials = true;
    await axios.post(`${API_BASE}/cart/add/${productId}/`, null, 
      authConfig()
      
    ).then(() => {
      onRefreshCart();
      navigate("/cart", { replace: true });
    })


    


    
    
  }
  
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
                <button className="btn  btn-primary" onClick={() => handleAddToCart(product.id)}> <span className="text">Add to cart</span> <i className="fas fa-shopping-cart"></i>  </button>
              </article> 
            </main> 
          </div>
        </div>
      </div> 
    </section>
    </>
  );
}