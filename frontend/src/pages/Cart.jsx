import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authContext.jsx";


export default function Cart({onRefreshCart}) {
  const API_BASE = import.meta.env.VITE_API_URL; // e.g. https://your-backend.herokuapp.com
  const [cart, setCart] = useState([]);
  const navigate = useNavigate(); 
  const { isLoggedIn } = useAuth();

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
    const fetchCart = async () => {
      try {
        const response = await axios.get(`${API_BASE}/cart/`, authConfig());

        console.log("Fetched cart data:", response.data);
        setCart(response.data.cart);
     
      } catch (err) {
        console.error("STATUS: ", err.response?.status);
        console.error("DATA: ", err.response?.data);
      }     
    };
    fetchCart();
   }, []);  
    

  const handleIncreaseQuantity = async (productId) => {    
    await axios.post(`${API_BASE}/cart/add/${productId}/`, null, authConfig()).then(() => {
      // Increase quantity on successful
      axios.get(`${API_BASE}/cart/`, authConfig()).then((res) => {
        setCart(res.data.cart);
        onRefreshCart();
      }); 
    });  
  };

  const handleDecreaseQuantity = async (productId) => {    
    await axios.post(`${API_BASE}/cart/decrease_product/${productId}/`, null, authConfig()).then(() => {
      // Decrease quantity on successful
      axios.get(`${API_BASE}/cart/`, authConfig()).then((res) => {
        setCart(res.data.cart);
        onRefreshCart();
      }); 
    });     
  };

  const handleRemoveItem = async (productId) => {
    await axios.post(`${API_BASE}/cart/remove/${productId}/`, null, authConfig()).then(() => {
      // Remove item on successful
      axios.get(`${API_BASE}/cart/`, authConfig()).then((res) => {
        setCart(res.data.cart);
        onRefreshCart();
      }); 
    });
    
  };

  const handleCheckout = async () => {
    console.log("Proceeding to checkout...");
    console.log("Is user logged in?", isLoggedIn);
  };

  return (
    <>    
    <section className="section-content padding-y bg">
      <div className="container">        
        <div className="row">
          <aside className="col-lg-9">
            <div className="card">
              <table className="table table-borderless table-shopping-cart">
                <thead className="text-muted">
                  { cart["items"] && cart["items"].length > 0 && <tr className="small text-uppercase">
                    <th scope="col">Product</th>
                    <th scope="col" width="120">Quantity</th>
                    <th scope="col" width="120">Price</th>
                    <th scope="col" className="text-right" width="200"> </th>
                  </tr>}
                </thead>
                <tbody>
                  {cart?.items?.length > 0 ? (
                    cart.items.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <figure className="itemside align-items-center">
                            <div className="aside">
                              <img src={item.product_image} className="img-sm" alt={item.product_name} />
                            </div>
                            <figcaption className="info">
                              <a href="#" className="title text-dark">{item.product_name}</a>
                              {/* <p className="text-muted small">Matrix: 25 Mpx <br /> Brand: Canon</p> */}
                            </figcaption>
                          </figure>
                        </td>

                        <td>
                          <div className="col">
                            <div className="input-group input-spinner">
                              <div className="input-group-prepend">
                                <button className="btn btn-light" type="button" onClick={() => handleDecreaseQuantity(item.product_id)}>
                                  <i className="fa fa-minus"></i>
                                </button>
                              </div>

                              <input type="text" className="form-control" value={item.quantity} readOnly />

                              <div className="input-group-append">
                                <button className="btn btn-light" type="button" onClick={() => handleIncreaseQuantity(item.product_id)}>
                                  <i className="fa fa-plus"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className="price-wrap">
                            <var className="price">${item.subtotal}</var> 
                            <small className="text-muted">${item.product_price} each</small>
                          </div>
                        </td>

                        <td className="text-right">
                          <button className="btn btn-danger" type="button" onClick={() => handleRemoveItem(item.product_id)}>
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">Your cart is empty.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div> 
          </aside> 
          <aside className="col-lg-3">
            <div className="card">
              <div className="card-body">
                <dl className="dlist-align">
                  <dt>Total price:</dt>
                  <dd className="text-right">$69.97</dd>
                </dl>
                <dl className="dlist-align">
                  <dt>Tax:</dt>
                  <dd className="text-right"> $10.00</dd>
                </dl>
                <dl className="dlist-align">
                  <dt>Total:</dt>
                  <dd className ="text-right text-dark b"><strong>$59.97</strong></dd>
                </dl>
                <hr />
                <p className="text-center mb-3">
                  <img src="assets/images/misc/payments.png" height="26" />
                </p>
                <Link onClick={() => handleCheckout()} className="btn btn-primary btn-block"> Checkout </Link>
                <Link to="/store" className  ="btn btn-light btn-block">Continue Shopping</Link>
              </div>
            </div>
          </aside> 
        </div> 
      </div> 
    </section>
  </>
  );
}
