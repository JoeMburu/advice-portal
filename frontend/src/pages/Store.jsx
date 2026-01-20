import { Link } from "react-router-dom";
import.meta.env.VITE_GOOGLE_CLIENT_ID
import.meta.env.VITE_API_URL
import axios from "axios";
import {React, useState, useEffect } from "react";



export default function Store() {
  
  const API_BASE = import.meta.env.VITE_API_URL; // e.g. https://your-backend.herokuapp.com
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;    

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend API
    axios.get(`${API_BASE}/store/`)  
      .then((response) => {
        setProducts(response.data);        
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      }); 
  }, []);

    
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
                    <li><a href="#">People  </a></li>
                    <li><a href="#">Watches </a></li>
                    <li><a href="#">Cinema  </a></li>
                    <li><a href="#">Clothes  </a></li>
                    <li><a href="#">Home items </a></li>
                    <li><a href="#">Animals</a></li>
                    <li><a href="#">People </a></li>
                    </ul>
                  </div>               
                </div> 
              </article> {/* End of category filter */}

              <article className="filter-group"> {/* Category filter */}
                <header className="card-header">
                  <a href="#" data-toggle="collapse" data-target="#collapse_1" aria-expanded="true" className="">
                    <i className="icon-control fa fa-chevron-down"></i>
                    <h6 className="title">Sizes</h6>
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
              {products.length > 0 ? (products.map((product, index) => (
                <div className="col-md-4" key={product.id}>
                  <figure className="card card-product-grid">
                    <div className="img-wrap">                    
                      <img src={product.product_image} />                    
                    </div>
                    <figcaption className="info-wrap">
                      <div className="fix-height">
                        <a href="./product-detail.html" className="title">Great item name goes here</a>
                        <div className="price-wrap mt-2">
                          <span className="price">$1280</span>
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
            <nav class="mt-4" aria-label="Page navigation sample">
              <ul class="pagination">
                <li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>
                <li class="page-item active"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item"><a class="page-link" href="#">Next</a></li>
              </ul>
            </nav>
          </main>
        </div>
      </div>
    </section>
    </>
  );
}
