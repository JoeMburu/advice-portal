import { useState } from "react";

const TOTAL = 10;

export default function App() {
  
  const API_BASE = import.meta.env.VITE_API_URL; // e.g. https://your-backend.herokuapp.com
  

  
  return (
    <>
      <header className="section-header">
        <nav className="navbar navbar-dark navbar-expand p-0 bg-primary">
          <div className="container">
            <ul className="navbar-nav d-none d-md-flex mr-auto">
              <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Delivery</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Payment</a></li>
            </ul>
            <ul className="navbar-nav">
              <li  className="nav-item"><a href="#" className="nav-link"> Call: +99812345678 </a></li>
              <li className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown"> English </a>
                  <ul className="dropdown-menu dropdown-menu-right" style={{maxWidth: "100px"}}>
                  <li><a className="dropdown-item" href="#">Arabic</a></li>
                  <li><a className="dropdown-item" href="#">Russian </a></li>
                  </ul>
              </li>
            </ul> {/* navbar-nav.// */}
          </div> {/* container */}
        </nav> {/* header-top-light.// */}

        <section className="header-main border-bottom">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-2 col-6">
                <a href="http://bootstrap-ecommerce.com" className="brand-wrap">
                  <img className="logo" src="/assets/images/logo.png" />
                </a> 
              </div>
              <div className="col-lg-6 col-12 col-sm-12">
                <form action="#" className="search">
                  <div className="input-group w-100">
                      <input type="text" className="form-control" placeholder="Search" />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">
                          <i className="fa fa-search"></i> Search
                        </button>
                      </div>
                    </div>
                </form> {/* search-wrap .end// */}
              </div> {/* col.// */}
              <div className="col-lg-4 col-sm-6 col-12">
                <div className="widgets-wrap float-lg-right">
                  <div className="widget-header  mr-3">
                    <a href="#" className="icon icon-sm rounded-circle border"><i className="fa fa-shopping-cart"></i></a>
                    <span className="badge badge-pill badge-danger notify">0</span>
                  </div>
                  <div className="widget-header icontext">
                    <a href="#" className="icon icon-sm rounded-circle border"><i className="fa fa-user"></i></a>
                    <div className="text">
                      <span className="text-muted">Welcome!</span>
                      <div> 
                        <a href="#">Sign in</a> |  
                        <a href="#"> Register</a>
                      </div>
                    </div>
                  </div>
                </div> {/* widgets-wrap.// */}
              </div> {/* col.// */}
            </div> {/* row.// */}
          </div> {/* container.// */}
        </section> {/* header-main .// */}      

        <nav className="navbar navbar-main navbar-expand-lg navbar-light border-bottom">
          <div className="container">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main_nav" aria-controls="main_nav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="main_nav">
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a className="nav-link pl-0" data-toggle="dropdown" href="#"><strong> <i className="fa fa-bars"></i> &nbsp;  All category</strong></a>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="#">Foods and Drink</a>
                    <a className="dropdown-item" href="#">Home interior</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">Category 1</a>
                    <a className="dropdown-item" href="#">Category 2</a>
                    <a className="dropdown-item" href="#">Category 3</a>
                  </div>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Fashion</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Supermarket</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Electronics</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Baby &amp Toys</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Fitness sport</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Clothing</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Furnitures</a>
                </li>
              </ul>
            </div> {/* collapse .// */}
          </div> {/* container .// */}
        </nav>
      </header> {/* section-header.// */}
      
      {/* ========================= SECTION INTRO ========================= */}
      <section className="section-intro padding-y-sm">
      <div className="container">

      <div className="intro-banner-wrap">
        <img src="/assets/images/banners/1.jpg" className="img-fluid rounded" />
      </div>

      </div> {/* container //  */}
      </section>
      {/* ========================= SECTION INTRO END// ========================= */}


      {/* ========================= SECTION FEATURE ========================= */}
      <section className="section-content padding-y-sm">
        <div className="container">
          <article className="card card-body">
            <div className="row">
              <div className="col-md-4">	
                <figure className="item-feature">
                  <span className="text-primary"><i className="fa fa-2x fa-truck"></i></span>
                  <figcaption className="pt-3">
                    <h5 className="title">Fast delivery</h5>
                    <p>Dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore </p>
                  </figcaption>
                </figure> {/* iconbox // */}
              </div>{/* col // */}
              <div className="col-md-4">
                <figure  className="item-feature">
                  <span className="text-primary"><i className="fa fa-2x fa-landmark"></i></span>	
                  <figcaption className="pt-3">
                    <h5 className="title">Creative Strategy</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    </p>
                  </figcaption>
                </figure> {/* iconbox // */}
              </div> {/* col // */}
              <div className="col-md-4">
                <figure  className="item-feature">
                  <span className="text-primary"><i className="fa fa-2x fa-lock"></i></span>
                  <figcaption className="pt-3">
                    <h5 className="title">High secured </h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    </p>
                  </figcaption>
                </figure> {/* iconbox // */}
              </div> {/* col // */}
            </div>
          </article>
        </div>  {/* container .//  */}
      </section>
      {/* ========================= SECTION FEATURE END// ========================= */}

      {/* ========================= SECTION CONTENT ========================= */}
      <section className="section-content">
        <div className="container">
          <header className="section-heading">
            <h3 className="section-title">Popular products</h3>
          </header>{/* sect-heading */}	
          <div className="row">
            <div className="col-md-3">
              <div href="#" className="card card-product-grid">
                <a href="#" className="img-wrap"> <img src="/assets/images/items/1.jpg" /> </a>
                <figcaption className="info-wrap">
                  <a href="#" className="title">Just another product name</a>
                  
                  <div className="rating-wrap">
                    <ul className="rating-stars">
                      <li style={{width: "80%"}} className="stars-active"> 
                        <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i>
                      </li>
                      <li>
                        <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i> 
                      </li>
                    </ul>
                    <span className="label-rating text-muted"> 34 reviws</span>
                  </div>
                  <div className="price mt-1">$179.00</div> {/* price-wrap.// */}
                </figcaption>
              </div>
            </div> {/* col.// */}
            <div className="col-md-3">
              <div href="#" className="card card-product-grid">
                <a href="#" className="img-wrap"> <img src="/assets/images/items/2.jpg" /> </a>
                <figcaption className="info-wrap">
                  <a href="#" className="title">Some item name here</a>
                  
                  <div className="rating-wrap">
                    <ul className="rating-stars">
                      <li style={{width: "80%"}} className="stars-active"> 
                        <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i>
                      </li>
                      <li>
                        <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i> 
                      </li>
                    </ul>
                    <span className="label-rating text-muted"> 34 reviws</span>
                  </div>
                  <div className="price mt-1">$280.00</div> {/* price-wrap.// */}
                </figcaption>
              </div>
            </div> {/* col.// */}
            <div className="col-md-3">
              <div href="#" className="card card-product-grid">
                <a href="#" className="img-wrap"> <img src="/assets/images/items/3.jpg" /> </a>
                <figcaption className="info-wrap">
                  <a href="#" className="title">Great product name here</a>
                  
                  <div className="rating-wrap">
                    <ul className="rating-stars">
                      <li style={{width: "80%"}} className="stars-active"> 
                        <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i>
                      </li>
                      <li>
                        <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i> 
                      </li>
                    </ul>
                    <span className="label-rating text-muted"> 34 reviws</span>
                  </div>
                  <div className="price mt-1">$56.00</div> {/* price-wrap.// */}
                </figcaption>
              </div>
            </div> {/* col.// */}
            <div className="col-md-3">
              <div href="#" className="card card-product-grid">
                <a href="#" className="img-wrap"> <img src="/assets/images/items/4.jpg" /> </a>
                <figcaption className="info-wrap">
                  <a href="#" className="title">Just another product name</a>
                  
                  <div className="rating-wrap">
                    <ul className="rating-stars">
                      <li style={{width: "80%"}} className="stars-active"> 
                        <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i>
                      </li>
                      <li>
                        <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i> 
                      </li>
                    </ul>
                    <span className="label-rating text-muted"> 34 reviws</span>
                  </div>
                  <div className="price mt-1">$179.00</div> {/* price-wrap.// */}
                </figcaption>
              </div>
            </div> {/* col.// */}
          </div> {/* row.// */}
        </div> {/* container .//  */}
      </section>
      {/* ========================= SECTION CONTENT END// ========================= */}

      {/* ========================= SECTION CONTENT ========================= */}
      <section className="section-content">
        <div className="container">
          <header className="section-heading">
            <h3 className="section-title">New arrived</h3>
          </header>{/* sect-heading */}

          <div className="row">
            <div className="col-md-3">
              <div href="#" className="card card-product-grid">
                <a href="#" className="img-wrap"> <img src="/assets/images/items/5.jpg" /> </a>
                <figcaption className="info-wrap">
                  <a href="#" className="title">Just another product name</a>
                  
                  <div className="rating-wrap">
                    <ul className="rating-stars">
                      <li style={{width: "80%"}} className="stars-active"> 
                        <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i>
                      </li>
                      <li>
                        <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i> 
                      </li>
                    </ul>
                    <span className="label-rating text-muted"> 34 reviws</span>
                  </div>
                  <div className="price mt-1">$179.00</div> {/* price-wrap.// */}
                </figcaption>
              </div>
            </div> {/* col.// */}
            <div className="col-md-3">
              <div href="#" className="card card-product-grid">
                <a href="#" className="img-wrap"> <img src="/assets/images/items/6.jpg" /> </a>
                <figcaption className="info-wrap">
                  <a href="#" className="title">Some item name here</a>
                  
                  <div className="rating-wrap">
                    <ul className="rating-stars">
                      <li style={{width: "80%"}} className="stars-active"> 
                        <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i>
                      </li>
                      <li>
                        <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i> 
                      </li>
                    </ul>
                    <span className="label-rating text-muted"> 34 reviws</span>
                  </div>
                  <div className="price mt-1">$280.00</div> {/* price-wrap.// */}
                </figcaption>
              </div>
            </div> {/* col.// */}
            <div className="col-md-3">
              <div href="#" className="card card-product-grid">
                <a href="#" className="img-wrap"> <img src="/assets/images/items/7.jpg" /> </a>
                <figcaption className="info-wrap">
                  <a href="#" className="title">Great product name here</a>
                  
                  <div className="rating-wrap">
                    <ul className="rating-stars">
                      <li style={{width: "80%"}} className="stars-active"> 
                        <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i>
                      </li>
                      <li>
                        <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i> 
                      </li>
                    </ul>
                    <span className="label-rating text-muted"> 34 reviws</span>
                  </div>
                  <div className="price mt-1">$56.00</div> {/* price-wrap.// */}
                </figcaption>
              </div>
            </div> {/* col.// */}
            <div className="col-md-3">
              <div href="#" className="card card-product-grid">
                <a href="#" className="img-wrap"> <img src="/assets/images/items/9.jpg" /> </a>
                <figcaption className="info-wrap">
                  <a href="#" className="title">Just another product name</a>
                  
                  <div className="rating-wrap">
                    <ul className="rating-stars">
                      <li style={{width: "80%"}} className="stars-active"> 
                        <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i>
                      </li>
                      <li>
                        <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className    ="fa fa-star"></i> 
                      </li>
                    </ul>
                    <span className="label-rating text-muted"> 34 reviws</span>
                  </div>
                  <div className="price mt-1">$179.00</div> {/* price-wrap.// */}
                </figcaption>
              </div>
            </div> {/* col.// */}
          </div> {/* row.// */}
        </div> {/* container .//  */}
      </section>
      {/* ========================= SECTION CONTENT END// ========================= */}


      {/* ========================= SECTION CONTENT ========================= */}
      <section className="section-content padding-bottom-sm">
        <div className="container">
          <header className="section-heading">
            <a href="#" className="btn btn-outline-primary float-right">See all</a>
            <h3 className="section-title">Recommended</h3>
              
          </header>{/* sect-heading */}
          <div className="row">
            <div className="col-md-3">
              <div href="#" className="card card-product-grid">
                <a href="#" className="img-wrap"> <img src="/assets/images/items/1.jpg" /> </a>
                <figcaption className="info-wrap">
                  <a href="#" className="title">Just another product name</a>
                  <div className="price mt-1">$179.00</div> {/* price-wrap.// */}
                </figcaption>
              </div>
            </div> {/* col.// */}
            <div className="col-md-3">
              <div href="#" className="card card-product-grid">
                <a href="#" className="img-wrap"> <img src="/assets/images/items/2.jpg" /> </a>
                <figcaption className="info-wrap">
                  <a href="#" className="title">Some item name here</a>
                  <div className="price mt-1">$280.00</div> {/* price-wrap.// */}
                </figcaption>
              </div>
            </div> {/* col.// */}
            <div className="col-md-3">
              <div href="#" className="card card-product-grid">
                <a href="#" className="img-wrap"> <img src="/assets/images/items/3.jpg" /> </a>
                <figcaption className="info-wrap">
                  <a href="#" className="title">Great product name here</a>
                  <div className="price mt-1">$56.00</div> {/* price-wrap.// */}  
                </figcaption>
              </div>
            </div> {/* col.// */}
            <div className="col-md-3">
              <div href="#" className="card card-product-grid">
                <a href="#" className="img-wrap"> <img src="/assets/images/items/4.jpg" /> </a>
                <figcaption className="info-wrap">
                  <a href="#" className="title">Just another product name</a>
                  <div className="price mt-1">$179.00</div> {/* price-wrap.// */} 
                </figcaption>
              </div>
            </div> {/* col.// */}
          </div> {/* row.// */}
        </div> {/* container .//  */} 
      </section>
      {/* ========================= SECTION CONTENT END// ========================= */}

      {/* ========================= SECTION  ========================= */}
      <section className="section-name bg padding-y-sm">
        <div className="container">
          <header className="section-heading">
            <h3 className="section-title">Our Brands</h3>
          </header>{/* sect-heading */}         

          <div className="row">
            <div className="col-md-2 col-6">
              <figure className="box item-logo">
                <a href="#"><img src="/assets/images/logos/logo1.png" /></a>
                <figcaption className="border-top pt-2">36 Products</figcaption>
              </figure> {/* item-logo.// */}
            </div> {/* col.// */}
            <div className="col-md-2  col-6">
              <figure className="box item-logo">
                <a href="#"><img src="/assets/images/logos/logo2.png" /></a>
                <figcaption className="border-top pt-2">980 Products</figcaption>
              </figure> {/* item-logo.// */}
            </div> {/* col.// */}
            <div className="col-md-2  col-6">
              <figure className="box item-logo">
                <a href="#"><img src="/assets/images/logos/logo3.png" /></a>
                <figcaption className="border-top pt-2">25 Products</figcaption>
              </figure> {/* item-logo.// */}
            </div> {/* col.// */}
            <div className="col-md-2  col-6">
              <figure className="box item-logo">
                <a href="#"><img src="/assets/images/logos/logo4.png" /></a>
                <figcaption className="border-top pt-2">72 Products</figcaption>
              </figure> {/* item-logo.// */}
            </div> {/* col.// */}
            <div className="col-md-2  col-6">
              <figure className="box item-logo">
                <a href="#"><img src="/assets/images/logos/logo5.png" /></a>
                <figcaption className="border-top pt-2">41 Products</figcaption>
              </figure> {/* item-logo.// */}
            </div> {/* col.// */}
            <div className="col-md-2  col-6">
              <figure className="box item-logo">
                <a href="#"><img src="/assets/images/logos/logo5.png" /></a>
                <figcaption className="border-top pt-2">41 Products</figcaption>
              </figure> {/* item-logo.// */}
            </div> {/* col.// */}
            <div className="col-md-2  col-6">
              <figure className="box item-logo">
                <a href="#"><img src="/assets/images/logos/logo2.png" /></a>
                <figcaption className="border-top pt-2">12 Products</figcaption>
              </figure> {/* item-logo.// */}
            </div> {/* col.// */}
          </div> {/* row.// */}
        </div>{/* container // */}    
        </section>
        {/* ========================= SECTION  END// ========================= */}


        {/* ========================= SECTION  ========================= */}
        <section className="section-name padding-y">
          <div className="container">

          <h3 className="mb-3">Download app demo text</h3>
          <a href="#"><img src="/assets/images/misc/appstore.png" height="40" /></a>
          <a href="#"><img src="/assets/images/misc/appstore.png" height="40" /></a>

          </div> {/* container //  */}
        </section>
        {/* ========================= SECTION  END// ======================= */}


        {/* ========================= FOOTER ========================= */}
        <footer className="section-footer border-top bg">
          <div className="container">
            <section className="footer-top  padding-y">
              <div className="row">
                <aside className="col-md col-6">
                  <h6 className="title">Brands</h6>
                  <ul className="list-unstyled">
                    <li> <a href="#">Adidas</a></li>
                    <li> <a href="#">Puma</a></li>
                    <li> <a href="#">Reebok</a></li>
                    <li> <a href="#">Nike</a></li>
                  </ul>
                </aside>
                <aside className="col-md col-6">
                  <h6 className="title">Company</h6>
                  <ul className="list-unstyled">
                    <li> <a href="#">About us</a></li>
                    <li> <a href="#">Career</a></li>
                    <li> <a href="#">Find a store</a></li>
                    <li> <a href="#">Rules and terms</a></li>
                    <li> <a href="#">Sitemap</a></li>
                  </ul>
                </aside>
                <aside className="col-md col-6">
                  <h6 className="title">Help</h6>
                  <ul className="list-unstyled">
                    <li> <a href="#">Contact us</a></li>
                    <li> <a href="#">Money refund</a></li>
                    <li> <a href="#">Order status</a></li>
                    <li> <a href="#">Shipping info</a></li>
                    <li> <a href="#">Open dispute</a></li>
                  </ul>
                </aside>
                <aside className="col-md col-6">
                  <h6 className="title">Account</h6>
                  <ul className="list-unstyled">
                    <li> <a href="#"> User Login </a></li>
                    <li> <a href="#"> User register </a></li>
                    <li> <a href="#"> Account Setting </a></li>
                    <li> <a href="#"> My Orders </a></li>
                  </ul>
                </aside>
                <aside className="col-md">
                  <h6 className="title">Social</h6>
                  <ul className="list-unstyled">
                    <li><a href="#"> <i className="fab fa-facebook"></i> Facebook </a></li>
                    <li><a href="#"> <i className="fab fa-twitter"></i> Twitter </a></li>
                    <li><a href="#"> <i className="fab fa-instagram"></i> Instagram </a></li>
                    <li><a href="#"> <i className="fab fa-youtube"></i> Youtube </a></li>
                  </ul>
                </aside>
              </div> {/* row.// */}
            </section>	{/* footer-top.// */}


            <section className="footer-bottom row">
              <div className="col-md-2">
                <p className="text-muted"> &copy 2019 Company name </p>
              </div>
              <div className="col-md-8 text-md-center">
                <span  className="px-2">info@pixsellz.io</span>
                <span  className="px-2">+879-332-9375</span>
                <span  className="px-2">Street name 123, Avanue abc</span>
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
