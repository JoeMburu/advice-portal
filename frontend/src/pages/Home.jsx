import { Link } from "react-router-dom";
import.meta.env.VITE_GOOGLE_CLIENT_ID
import.meta.env.VITE_API_URL
import { useEffect } from "react";  
import { useProducts } from "../product/productContext";




export default function Home() {
  
  const API_BASE = import.meta.env.VITE_API_URL;  
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;    
  //const [products, setProducts] = useState([]);
  //const [loading, setLoading] = useState(true);
  const { products, loadingProducts, fetchProducts } = useProducts();

  useEffect(() => {
    // Fetch popular products from the backend API
    fetchProducts();         
  }, [fetchProducts]);

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
          {loadingProducts && <p>Loading products...</p>}
          {products && products.map((product) => (       
            <div className="col-md-3" key={product.id}>
                <div className="card card-product-grid">                  
                  <Link to={`/product/${product.slug}`} className="img-wrap"> <img src={product.product_image} /> </Link>
                 
                  <figcaption className="info-wrap">
                    <Link to={`/product/${product.slug}`} className="title">{product.product_name}</Link>
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
