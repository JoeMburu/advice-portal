import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../cart/cartContext";
import { useOrders } from "../order/orderContext.jsx";


export default function Checkout() {  
  const API_BASE = import.meta.env.VITE_API_URL;
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/cart/checkout";
  const { cart, fetchCart, vatAmount, grandTotal, totalAmount } = useCart();
  const { placeOrder} = useOrders();

  // Paymeny method state
  const [paymentMethod, setPaymentMethod] = useState("paypal");

  // contact infofo state
  const [contactInfo, setContactInfo] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: ""
  });

  // delivery info state
  const [deliveryInfo, setDeliveryInfo] = useState({
    country: "",
    state: "",
    street: "",
    building: "",
    house: "",    
    postalCode: ""
  });

  // payment info state
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: ""
  });

  useEffect(() => {
    async function onload() {
     navigate(from, { replace: true }); 
     await fetchCart();
    }
    onload();
    }, []);

    async function handleCheckoutFormSubmit(e) {
      e.preventDefault();

      try {
        const createdOrder = await placeOrder(contactInfo, deliveryInfo, paymentInfo, paymentMethod);  
        console.log("Order created successfully: ", createdOrder);
        navigate("/order-confirmation", { state: createdOrder });

      } catch (err) {
        console.error("Error placing order: ", err);
        return;
      }





      
      //console.log("Checkout form submitted", contactInfo, deliveryInfo, paymentInfo);     

      //console.log("Submitting order with cart data:", cart);
      //navigate("/order-confirmation");
    }    
  return (
    <>        
    <section className="section-content padding-y bg">
      <div className="container">
        <form onSubmit={handleCheckoutFormSubmit}>
          <div className="row">
            <main className="col-md-8">
              <article className="card mb-4">
                <div className="card-body">
                  <h4 className="card-title mb-4">Review cart</h4>
                  <div className="row">
                    {cart?.items?.length > 0 && (
                      cart.items.map((item) => (                                             
                      <div className="col-md-6" key={item.id}>
                        <figure className="itemside  mb-4">
                          <div className="aside">
                            <img src={item.product_image} className="border img-sm" />
                          </div>
                          <figcaption className="info">
                            <p>{item.product_name}</p>
                            <span className="text-muted">{item.quantity}x = ${item.product_price * item.quantity.toFixed(2)}</span>
                          </figcaption>
                        </figure>
                      </div> 
                      ))
                    )}
                  </div>
                </div> 
              </article> 
              <article className="card mb-4"> {/* first article form */ }
                <div className="card-body">
                  <h4 className="card-title mb-4">Contact info</h4>
                  <div> {/* form 1 */ }
                    <div className="row">
                      <div className="form-group col-sm-6">
                        <label>First name</label>
                        <input type="text" placeholder="Type here" className="form-control" value={contactInfo.firstname} onChange={(e) => setContactInfo({...contactInfo, firstname: e.target.value})} />
                      </div>
                      <div className="form-group col-sm-6">
                        <label>Last name</label>
                        <input type="text" placeholder="Type here" className="form-control" value={contactInfo.lastname} onChange={(e) => setContactInfo({...contactInfo, lastname: e.target.value})} />
                      </div>
                      <div className="form-group col-sm-6">
                        <label>Phone</label>
                        <input type="text" value={contactInfo.phone} className="form-control" onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})} />
                      </div>
                      <div className="form-group col-sm-6">
                        <label>Email</label>
                        <input type="email" placeholder="example@gmail.com" className="form-control" value={contactInfo.email} onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})} />
                      </div>
                    </div> 
                  </div>
                </div> 
              </article> 
              <article className="card mb-4">
                <div className="card-body">
                  <h4 className="card-title mb-4">Delivery info</h4>
                  <div> {/* form 2 */ }
                    <div className="row">
                        <div className="form-group col-sm-6">
                          <label>Country*</label>
                          <select name="country" value={deliveryInfo.country} onChange={(e) => setDeliveryInfo({...deliveryInfo, country: e.target.value})} className="form-control">
                            <option value="">Select country</option>
                            <option value="Finland">Finland</option>
                            <option value="England">England</option>                          
                            <option value="France">France</option>
                            <option value="Italy">Italy</option>
                            <option value="Spain">Spain</option>
                            <option value="Sweden">Sweden</option>
                            <option value="Germany">Germany</option>
                            <option value="Norway">Norway</option>
                            <option value="Denmark">Denmark</option>
                          </select>
                        </div>
                        <div className="form-group col-sm-6">
                          <label>State*</label>
                          <input type="text" placeholder="Enter state" className="form-control" value={deliveryInfo.state} onChange={(e) => setDeliveryInfo({...deliveryInfo, state: e.target.value})} />
                        </div>
                        <div className="form-group col-sm-8">
                          <label>Street*</label>
                          <input type="text" placeholder="Enter street" className="form-control" value={deliveryInfo.street} onChange={(e) => setDeliveryInfo({...deliveryInfo, street: e.target.value})} />
                        </div>
                        <div className="form-group col-sm-4">
                          <label>Building</label>
                          <input type="text" placeholder="Enter building number" className="form-control" value={deliveryInfo.building} onChange={(e) => setDeliveryInfo({...deliveryInfo, building: e.target.value})} />
                        </div>
                        <div className="form-group col-sm-4">
                          <label>House</label>
                          <input type="text" placeholder="Enter house number" className="form-control" value={deliveryInfo.house} onChange={(e) => setDeliveryInfo({...deliveryInfo, house: e.target.value})} />
                        </div>
                        <div className="form-group col-sm-4">
                          <label>Postal code</label>
                          <input type="text" placeholder="Enter postal code" className="form-control" value={deliveryInfo.postalCode} onChange={(e) => setDeliveryInfo({...deliveryInfo, postalCode: e.target.value})} />
                        </div>
                        <div className="form-group col-sm-4">
                          <label>Zip</label>
                          <input type="text" placeholder="Enter zip code" className="form-control" value={deliveryInfo.zip} onChange={(e) => setDeliveryInfo({...deliveryInfo, zip: e.target.value})} />
                        </div>
                    </div> 
                  </div>
                </div> 
              </article>
              <article className="accordion" id="accordion_pay">
                <div className="card">
                  <header className="card-header">
                    <img src="/assets/images/misc/payment-paypal.png" className="float-right" height="24" /> 
                    <label className="form-check" data-toggle="collapse" data-target="#pay_paynet">
                      <input 
                        className="form-check-input" 
                        name="payment-option" 
                        checked={paymentMethod === "paypal"}
                        type="radio" 
                        value="paypal" 
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <h6 className="form-check-label"> 
                        Paypal 
                      </h6>
                    </label>
                  </header>
                  <div id="pay_paynet" className="collapse show" data-parent="#accordion_pay">
                    <div className="card-body">
                      <p className="text-center text-muted">Connect your PayPal account and use it to pay your bills. You'll be redirected to PayPal to add your billing information.</p>
                      <p className="text-center">
                        <a href="#"><img src="/assets/images/misc/btn-paypal.png" height="32" /></a>
                        <br /><br />
                      </p>                   
                    </div> 
                  </div> 
                </div>
                <div className="card">
                  <header className="card-header">
                    <img src="/assets/images/misc/payment-card.png" className="float-right" height="24" />  
                    <label className="form-check" data-toggle="collapse" data-target="#pay_payme">
                      <input 
                        className="form-check-input" 
                        name="payment-option" 
                        type="radio" 
                        value="credit-card" 
                        checked={paymentMethod === "credit-card"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />  
                      <h6 className="form-check-label"> Credit Card  </h6>
                    </label>
                  </header>
                  <div id="pay_payme" className="collapse" data-parent="#accordion_pay">
                    <div className="card-body">
                      <p className="alert alert-success">Some information or instruction</p>
                      <div className="form-inline"> {/* form 3 */ }
                        <input type="text" className="form-control mr-2" placeholder="xxxx-xxxx-xxxx-xxxx" name="" value={paymentInfo.cardNumber} onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})} />
                        <input type="text" className="form-control mr-2" style={{ width: '100px' }}  placeholder="dd/yy" name="" value={paymentInfo.expiryDate} onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})} />
                        <input type="number" maxLength="3" className="form-control mr-2"  style={{ width: '100px' }}  placeholder="cvc" name="" value={paymentInfo.cvc} onChange={(e) => setPaymentInfo({...paymentInfo, cvc: e.target.value})} />
                        <button className="btn btn btn-success">Button</button>
                      </div>
                    </div> 
                  </div> 
                </div>              	
              </article> 
            </main> 
            <aside className="col-md-4">
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
                    <dd className="text-right text-dark b"><strong>${grandTotal.toFixed(2)}</strong></dd>
                  </dl>
                  <hr />
                  <p className="text-center mb-3">
                    <img src="/assets/images/misc/payments.png" height="26" />
                  </p>
                  <button type="submit" className="btn btn-primary btn-block">
                    Place Order
                  </button>
                </div> 
              </div> 
            </aside> 
          </div> {/* row.// */}
        </form>
      </div> 
    </section>
    </>
  );
}