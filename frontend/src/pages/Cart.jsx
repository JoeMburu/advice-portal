import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../auth/authContext.jsx";
import { useCart } from "../cart/cartContext.jsx";
import { useProducts } from "../product/productContext.jsx";
//import axios from "axios";



export default function Cart() {
  
  const navigate = useNavigate(); 
  const { isLoggedIn } = useAuth();
  const { cart, fetchCart, loading, addToCart, decreaseItem, removeFromCart, vatAmount, grandTotal, totalAmount } = useCart(); // Access cart context
  const { products } = useProducts(); // Access product context 
 //const [cartItems, setCartItems] = useState([]); // Local state for cart items

 useEffect(() => {
  async function loadCart() {   
    await fetchCart(); // Fetch cart data from context (which handles API call)    
  }

  loadCart();
 }, [fetchCart]);  
  
  const handleDecreaseQuantity = async (productId) => {   
    await decreaseItem(productId);       
  };

  const handleIncreaseQuantity = async (productId) => {  
    await addToCart(productId);    
  };

  const handleRemoveItem = async (productId) => {
    await removeFromCart(productId);   
    
  };

  const handleCheckout = async () => {
    // console.log("Proceeding to checkout...");
    // console.log("Is user logged in?", isLoggedIn);
  };

  return (
    <>    
    {cart?.items?.length > 0 ? (
    <section className="section-content padding-y bg">
      <div className="container">               
        <div className="row">
          <aside className="col-lg-9">
            <div className="card">
              <table className="table table-borderless table-shopping-cart">
                <thead className="text-muted">                  
                  <tr className="small text-uppercase">
                    <th scope="col">Product</th>
                    <th scope="col" width="120">Quantity</th>
                    <th scope="col" width="120">Price</th>
                    <th scope="col" className="text-right" width="200"> </th>
                  </tr>                  
                </thead>
                <tbody>
                  {cart?.items?.length > 0 && (
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
                  <dd className="text-right">${totalAmount.toFixed(2)}</dd>
                </dl>
                <dl className="dlist-align">
                  <dt>Tax:</dt>
                  <dd className="text-right"> ${vatAmount.toFixed(2)}</dd>
                </dl>
                <dl className="dlist-align">
                  <dt>Total:</dt>
                  <dd className ="text-right text-dark b"><strong>${grandTotal.toFixed(2)}</strong></dd>
                </dl>
                <hr />
                <p className="text-center mb-3">
                  <img src="assets/images/misc/payments.png" height="26" />
                </p>
                <Link to="/cart/checkout" className="btn btn-primary btn-block"> Checkout </Link>
                <Link to="/store" className  ="btn btn-light btn-block">Continue Shopping</Link>
              </div>
            </div>
          </aside> 
        </div> 
      </div> 
    </section>       
    ) : (
      <section className="section-content padding-y bg">
        <div className="container text-center"> 
          <div className="card">
            <div className="card-body">
              <h3>Your cart is empty</h3> 
              <p className="text-muted">Looks like you haven't added anything to your cart yet.</p>
              <Link to="/store" className="btn btn-primary">Start Shopping</Link>
            </div>
          </div>
        </div>
      </section>
    )}   
    
    </>
  );
}
