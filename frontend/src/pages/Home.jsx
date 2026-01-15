import { Link } from "react-router-dom";



export default function Home() {
  
  const API_BASE = import.meta.env.VITE_API_URL; // e.g. https://your-backend.herokuapp.com
    
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
          <a href="./store.html" className="btn btn-outline-primary float-right">See all</a>
          <h3 className="section-title">Popular products</h3>
        </header>{/* sect-heading */}
      
        <div className="row">
          <div className="col-md-3">
            <div className="card card-product-grid">
              <a href="./product-detail.html" className="img-wrap"> <img src="/assets/images/items/1.jpg" /> </a>
              <figcaption className="info-wrap">
                <a href="./product-detail.html" className="title">Just another product name</a>
                <div className="price mt-1">$179.00</div> {/* price-wrap.// */}
              </figcaption>
            </div>
          </div> {/* col.// */}
          <div className="col-md-3">
            <div className="card card-product-grid">
              <a href="./product-detail.html" className="img-wrap"> <img src="/assets/images/items/2.jpg" /> </a>
              <figcaption className="info-wrap">
                <a href="./product-detail.html" className="title">Some item name here</a>
                <div className="price mt-1">$280.00</div> {/* price-wrap.// */}
              </figcaption>
            </div>
          </div> {/* col.// */}
          <div className="col-md-3">
            <div className="card card-product-grid">
              <a href="./product-detail.html" className="img-wrap"> <img src="/assets/images/items/3.jpg" /> </a>
              <figcaption className="info-wrap">
                <a href="./product-detail.html" className="title">Great product name here</a>
                <div className="price mt-1">$56.00</div> {/* price-wrap.// */}
              </figcaption>
            </div>
          </div> {/* col.// */}
          <div className="col-md-3">
            <div className="card card-product-grid">
              <a href="./product-detail.html" className="img-wrap"> <img src="/assets/images/items/4.jpg" /> </a>
              <figcaption className="info-wrap">
                <a href="./product-detail.html" className="title">Just another product name</a>
                <div className="price mt-1">$179.00</div> {/* price-wrap.// */} 
              </figcaption>
            </div>
          </div> {/* col.// */}
          <div className="col-md-3">
            <div className="card card-product-grid">
              <a href="./product-detail.html" className="img-wrap"> <img src="/assets/images/items/5.jpg" /> </a>
              <figcaption className="info-wrap">
                <a href="./product-detail.html" className="title">Just another product name</a>
                <div className="price mt-1">$179.00</div> {/* price-wrap.// */}
              </figcaption>
            </div>
          </div> {/* col.// */}
          <div className="col-md-3">
            <div className="card card-product-grid">
              <a href="./product-detail.html" className="img-wrap"> <img src="/assets/images/items/6.jpg" /> </a>
              <figcaption className="info-wrap">
                <a href="./product-detail.html" className="title">Some item name here</a>
                <div className="price mt-1">$280.00</div> {/* price-wrap.// */}
              </figcaption>
            </div>
          </div> {/* col.// */}
          <div className="col-md-3">
            <div className="card card-product-grid">
              <a href="./product-detail.html" className="img-wrap"> <img src="/assets/images/items/7.jpg" /> </a>
              <figcaption className="info-wrap">
                <a href="./product-detail.html" className="title">Great product name here</a>
                <div className="price mt-1">$56.00</div> {/* price-wrap.// */}
              </figcaption>
            </div>
          </div> {/* col.// */}
          <div className="col-md-3">
            <div className="card card-product-grid">
              <a href="./product-detail.html" className="img-wrap"> <img src="/assets/images/items/9.jpg" /> </a>
              <figcaption className="info-wrap">
                <a href="./product-detail.html" className="title">Just another product name</a>
                <div className="price mt-1">$179.00</div> {/* price-wrap.// */}
              </figcaption>
            </div>
          </div> {/* col.// */}
        </div> {/* row.// */}
      </div>{/* container // */}
    </section>
    </>
  );
}
