import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../cart/cartContext";


export default function Checkout() {
  
  const API_BASE = import.meta.env.VITE_API_URL;
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/cart/checkout";
  const { cart, fetchCart, vatAmount, grandTotal, totalAmount } = useCart();

  

  useEffect(() => {
    async function onload() {
     navigate(from, { replace: true }); 
     await fetchCart(); // Ensure cart data is fresh when arriving at checkout

     

    }
    onload();
    }, []);
    


    
  return (
    <>    
    {/* {cart?.items?.length > 0 && <p>Cart items: {cart.items[0].product_name}</p>} */}
    <section className="section-content padding-y bg">
      <div className="container">
        <div className="row">
          <main className="col-md-8">
            <article className="card mb-4">
              <div className="card-body">
                <h4 className="card-title mb-4">Review cart</h4>
                <div className="row">
                  {cart?.items?.length > 0 && (
                    cart.items.map((item) => (                        
                  <div className="col-md-6">
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
            <article className="card mb-4">
              <div className="card-body">
                <h4 className="card-title mb-4">Contact info</h4>
                <form action="">
                  <div className="row">
                    <div className="form-group col-sm-6">
                      <label>First name</label>
                      <input type="text" placeholder="Type here" className="form-control" />
                    </div>
                    <div className="form-group col-sm-6">
                      <label>Last name</label>
                      <input type="text" placeholder="Type here" className="form-control" />
                    </div>
                    <div className="form-group col-sm-6">
                      <label>Phone</label>
                      <input type="text" value="+358" className="form-control" />
                    </div>
                    <div className="form-group col-sm-6">
                      <label>Email</label>
                      <input type="email" placeholder="example@gmail.com" className="form-control" />
                    </div>
                  </div> 
                </form>
              </div> 
            </article> 
            <article className="card mb-4">
              <div className="card-body">
                <h4 className="card-title mb-4">Delivery info</h4>
                <form action="">
                  <div className="row">
                      <div className="form-group col-sm-6">
                        <label>Country*</label>
                        <select name="" className="form-control">
                          <option value="">Finland</option>
                          <option value="">England</option>                          
                          <option value="">France</option>
                          <option value="">Italy</option>
                          <option value="">Spain</option>
                          <option value="">Sweden</option>
                          <option value="">Germany</option>
                          <option value="">Norway</option>
                          <option value="">Denmark</option>
                        </select>
                      </div>
                      <div className="form-group col-sm-6">
                        <label>State*</label>
                        <input type="text" placeholder="Type here" className="form-control" />
                      </div>
                      <div className="form-group col-sm-8">
                        <label>Street*</label>
                        <input type="text" placeholder="Type here" className="form-control" />
                      </div>
                      <div className="form-group col-sm-4">
                        <label>Building</label>
                        <input type="text" placeholder="" className="form-control" />
                      </div>
                      <div className="form-group col-sm-4">
                        <label>House</label>
                        <input type="text" placeholder="Type here" className="form-control" />
                      </div>
                      <div className="form-group col-sm-4">
                        <label>Postal code</label>
                        <input type="text" placeholder="" className="form-control" />
                      </div>
                      <div className="form-group col-sm-4">
                        <label>Zip</label>
                        <input type="text" placeholder="" className="form-control" />
                      </div>
                  </div> 
                </form>
              </div> 
            </article>
            <article className="accordion" id="accordion_pay">
              <div className="card">
                <header className="card-header">
                  <img src="/assets/images/misc/payment-paypal.png" className="float-right" height="24" /> 
                  <label className="form-check collapsed" data-toggle="collapse" data-target="#pay_paynet">
                    <input className="form-check-input" name="payment-option" checked type="radio" value="option2" />
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
                <div className="card">
                  <header className="card-header">
                    <img src="/assets/images/misc/payment-card.png" className="float-right" height="24" />  
                    <label className="form-check" data-toggle="collapse" data-target="#pay_payme">
                      <input className="form-check-input" name="payment-option" type="radio" value="option2" />
                      <h6 className="form-check-label"> Credit Card  </h6>
                    </label>
                  </header>
                  <div id="pay_payme" className="collapse" data-parent="#accordion_pay">
                    <div className="card-body">
                      <p className="alert alert-success">Some information or instruction</p>
                      <form className="form-inline">
                        <input type="text" className="form-control mr-2" placeholder="xxxx-xxxx-xxxx-xxxx" name="" />
                        <input type="text" className="form-control mr-2" style={{ width: '100px' }}  placeholder="dd/yy" name="" />
                        <input type="number" maxLength="3" className="form-control mr-2"  style={{ width: '100px' }}  placeholder="cvc" name="" />
                        <button className="btn btn btn-success">Button</button>
                      </form>
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
                  <img src="./images/misc/payments.png" height="26" />
                </p>
                <a href="./place-order.html" className="btn btn-primary btn-block"> Place Order </a>
                
              </div> 
            </div> 
          </aside> 
        </div>
      </div> 
    </section>
    </>
  );
}