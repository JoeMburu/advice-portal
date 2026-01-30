import { Link, useNavigate  } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import { useContext, useEffect, useState } from "react";
import axios from "axios";




export default function Header() {
  
  const API_BASE = import.meta.env.VITE_API_URL; // e.g. https://your-backend.herokuapp.com
  const { isLoggedIn, setIsLoggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login", { replace: true });
  }

     // categories effect stays separate
  useEffect(() => {
    axios
      .get(`${API_BASE}/store/products/categories/`)
      .then((res) => {
        setCategories(res.data)        
      });
  }, [API_BASE]);

  return (
    <>
    <header className="section-header">
      <nav className="navbar p-md-0 navbar-expand-sm navbar-light border-bottom">
        <div className="container">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTop4" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTop4">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                <a href="#" className="nav-link">   English </a>                
              </li>
              <li className="nav-item dropdown">
                <a href="#" className="nav-link"> USD </a>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li><a href="#" className="nav-link"> <i className="fa fa-envelope"></i> Email </a></li>
              <li><a href="#" className="nav-link"> <i className="fa fa-phone"></i> Call us </a></li>
            </ul>
          </div>
        </div> 
      </nav>

      <section className="header-main border-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-2 col-md-3 col-6">
              <Link to="/" className="brand-wrap">
                <img className="logo" src="/assets/images/logo.png" />
              </Link>
            </div>
            <div className="col-lg col-sm col-md col-6 flex-grow-0">
              <div className="category-wrap dropdown d-inline-block float-right">
                <Link type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" to="/store"> 
                  <i className="fa fa-bars"></i> All category 
                </Link> 
                             
                <div className="dropdown-menu">
                  {categories.map((category) => (
                  <Link key={category.id} className="dropdown-item" to={`/store?category=${category.slug}`}>{category.category_name} </Link>                 
                  ))}
                </div>
              </div>  {/* category-wrap.// */}
            </div> {/* col.// */}
            <Link to="/store" className="btn btn-outline-primary">Store</Link>
            <div className="col-lg  col-md-6 col-sm-12 col">
              <form action="#" className="search">
                <div className="input-group w-100">
                  <input type="text" className="form-control" style={{width:"60%"}} placeholder="Search" />
                  
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="submit">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                  </div>
              </form> {/* search-wrap .end// */}
            </div> {/* col.// */}
            <div className="col-lg-3 col-sm-6 col-8 order-2 order-lg-3">
              <div className="d-flex justify-content-end mb-3 mb-lg-0">
                <div className="widget-header">
                  <small className="title text-muted">{isLoggedIn && user ? `Welcome ${user.username}!` : "Welcome Guest!"}</small>
                  <div> 
                    { isLoggedIn ? (
                      <button type="button" className="btn btn-outline-danger text-danger" onClick={logout}>Logout</button>
                    ): (
                      <>
                      <Link to="/login">Sign in</Link> <span className="dark-transp"> | </span>
                      <Link to="/register"> Register</Link>
                      </>
                    ) }
                    
                  </div>
                </div>
                <a href="./cart.html" className="widget-header pl-3 ml-3">
                  <div className="icon icon-sm rounded-circle border"><i className="fa fa-shopping-cart"></i></div>
                  <span className="badge badge-pill badge-danger notify">0</span>
                </a>
              </div> {/*<!-- widgets-wrap.// -->*/}
            </div> {/* col.// */}
          </div> {/* row.// */}
        </div> {/* container.// */}
      </section> {/* header-main .// */}
    </header> 
    </>
  );
}
