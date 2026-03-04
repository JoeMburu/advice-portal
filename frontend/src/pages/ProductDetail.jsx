import { Link, useParams, useNavigate  } from "react-router-dom";
import { useEffect } from "react";

import { useCart } from "../cart/cartContext.jsx";
import { useProducts } from "../product/productContext.jsx";

export default function ProductDetail() {  
  const API_BASE = import.meta.env.VITE_API_URL; 
  const navigate = useNavigate();
  const { slug } = useParams();  
  //const [product, setProduct] = useState(null); 
  //const [loading, setLoading] = useState(true);
  const { product, loadingProduct, fetchProduct } = useProducts();

  const { addToCart } = useCart();

 useEffect(() => {
    // Fetch a product based on the slug from the URL
    async function fetchDtailedProduct() {
      await fetchProduct(slug); // Use the fetchProduct function from the context to fetch product details
    }
    fetchDtailedProduct();   
  }, [slug, fetchProduct]); // Re-run when slug changes or fetchProduct function reference changes

  const handleAddToCart = async (productId) => {    
    if (productId) {
      await addToCart(productId)
      navigate("/store", { replace: true });
    } else {
      console.error("Product ID is missing");
      return;
    }      
  }  
  
  return (
    <> 
    { loadingProduct && <p>Loading product details...</p> }
    { product && (  
    <section className="section-content padding-y bg">
      <div className="container">
        <div className="card">
          <div className="row no-gutters">
            <aside className="col-md-6">
              <article className="gallery-wrap"> 
                <div className="img-big-wrap">
                  <a href="#"><img src={product.product_image} alt={product.product_name} /></a>
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
    </section> )}   
    </>
  );
}