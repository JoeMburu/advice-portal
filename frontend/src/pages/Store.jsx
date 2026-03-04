import { Link } from "react-router-dom";
import.meta.env.VITE_GOOGLE_CLIENT_ID
import.meta.env.VITE_API_URL
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useProducts } from "../product/productContext";

export default function Store() {
  
  const API_BASE = import.meta.env.VITE_API_URL; // e.g. https://your-backend.herokuapp.com
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID; 
  const [searchParams] = useSearchParams();
  const categorySlug = searchParams.get("category"); // null or string    
  //const [products, setProducts] = useState([]);
  //const [categories, setCategories] = useState([]);
  const { products, categories, fetchProducts, fetchProductCategories, fetchProductsByCategory, loadingProducts, loadingCategories } = useProducts();

  const navigate = useNavigate(); 
  
 

  useEffect(() => {
    async function fetchStoreProducts() {
      await fetchProductCategories(); // fetch categories first

      if (categorySlug) {
        await fetchProductsByCategory(categorySlug); // fetch products by category if category filter is applied
      } else {
        await fetchProducts(); // fetch all products if no category filter
      }
     
    }

    fetchStoreProducts();
  }, [categorySlug, fetchProducts, fetchProductCategories, fetchProductsByCategory]);
 

  const onSelectedCategory = (slug) => {   
    navigate(`/store?category=${slug}`);
  };

  const onSelectAllCategories = () => {   
    navigate(`/store`);    
  }; 

      
  return (  
    <> 
    <section className="section-pagetop bg"> {/* Top section */}
      <div className="container">
        <h2 className="title-page">Our Store</h2>      
      </div> 
    </section>   {/* End of top section */}

    <section className="section-content padding-y"> {/* Section */}
      <div className="container">
        <div className="row">
          <aside className="col-md-3">
            <div className="card">
	            <article className="filter-group"> {/* Category filter */}
                <header className="card-header">
                  <a href="#" data-toggle="collapse" data-target="#collapse_1" aria-expanded="true" className="">
                    <i className="icon-control fa fa-chevron-down"></i>
                    <h6 className="title">Categories</h6>
                  </a>                  
		            </header>
                <div className="filter-content collapse show" id="collapse_1" style={{}}>
                  <div className="card-body">                  
                    <ul className="list-menu">
                      <li><button className="btn btn-link" onClick={() => onSelectAllCategories()}>All</button></li>
                      { loadingCategories && <p>Loading categories...</p> }                      
                      {categories.map((category) => (
                        <li key={category.id}>
                          <button 
                            className={`btn btn-link ${categorySlug === category.slug ? "fw-bold text-primary" : ""  }`} 
                            onClick={() => onSelectedCategory(category.slug)}  > {category.category_name} </button>                          
                        </li>
                      ))}                                     
                    </ul>
                  </div>               
                </div> 
              </article> {/* End of category filter */}           
              <article className="filter-group"> {/* Category filter */}
                <header className="card-header">
                  <a href="#" data-toggle="collapse" data-target="#collapse_1" aria-expanded="true" className="">
                    <i className="icon-control fa fa-chevron-down"></i>
                    <h6 className="title">Price range</h6>
                  </a>                  
		            </header>
                {/* <div className="filter-content collapse show" id="collapse_1" style="">
                  <div className="card-body">                  
                    <ul className="list-menu">
                    <li><a href="#">People  </a></li>
                    <li><a href="#">Watches </a></li>
                    <li><a href="#">Cinema  </a></li>
                    <li><a href="#">Clothes  </a></li>
                    <li><a href="#">Home items </a></li>
                    <li><a href="#">Animals</a></li>
                    <li><a href="#">People </a></li>
                    </ul>
                  </div>               
                </div> */}
              </article> {/* End of category filter */}
            
            
            
            </div> {/* end of card.// */}
          </aside>
          <main className="col-md-9"> 
            <header className="border-bottom mb-4 pb-3">
              <div className="form-inline">
                <span className="mr-md-auto">{products.length} Items found </span>                
              </div>
            </header>
            <div className="row">
              {loadingProducts && <p>Loading products...</p>}              
              {products.length > 0 ? (products.map((product, index) => (
                <div className="col-md-4" key={product.id}>
                  <figure className="card card-product-grid">
                    <Link className="img-wrap" to={`/product/${product.slug}`}>                                      
                      <img src={product.product_image} />                    
                    </Link>
                    <figcaption className="info-wrap">
                      <div className="fix-height">
                        <Link to={`/product/${product.slug}`} className="title">{product.product_name}</Link>
                        <div className="price-wrap mt-2">
                          <span className="price">${product.price}</span>
                          <del className="price-old">$1980</del>
                        </div> 
                      </div>
                      <a href="#" className={`btn btn-block btn-${index+1 > 1 ? 'success' : 'primary'}`}>Added to cart </a>
                    </figcaption>
                  </figure>
                </div> 
              ))) : (
                <p>No products available.</p>
              )}              
            </div> {/* end of row.// */}
            <nav className="mt-4" aria-label="Page navigation sample">
              <ul className="pagination">
                <li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#">Next</a></li>
              </ul>
            </nav>
          </main>
        </div>
      </div>
    </section>
    </>
  );
}
