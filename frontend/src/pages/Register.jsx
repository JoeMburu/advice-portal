import { Link } from "react-router-dom";
import { useState } from "react";


import axios from "axios";





export default function Register() {

    const API_BASE = import.meta.env.VITE_API_URL; // e.g. https://your-backend.herokuapp.com
  
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState(""); 
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirm, setPassword_confirm]  = useState("");

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);


  const registerUser = async (e) => {
    e.preventDefault();
    setLoading(true);   
    // get user data
    const userData = {
      first_name: first_name,      
      last_name: last_name,      
      email: email,
      username: first_name[0] + first_name.slice(1),
      phone_number: phone,
      address: address,
      password: password,
      password_confirm: password_confirm  
    };

    try {
      const response = await axios.post(`${API_BASE}/api/v1/accounts/register/`, userData);
      console.log("Registration successful:", response.data);
      setSuccess(true);
      setErrors({});
      // Clear form fields
      setFirst_name("");
      setLast_name("");
      setEmail("");
      setPhone("");
      setAddress("");
      setPassword("");
      setPassword_confirm("");
    }
    catch (error) {
      // handle error
      setErrors(error.response.data);
      setSuccess(false);
    }
    finally {
      setLoading(false);      
    }
  } 
  
  


  const hasAnyErrors = !!errors.non_field_errors || Object.keys(errors || {}).length > 0;
  
  return (
    <>
    <section className="section-content padding-y">
      {/* ============================ COMPONENT REGISTER   ================================= */}
      <div className="card mx-auto" style={{maxWidth:"520px", marginTop:"40px"}}>
        <article className="card-body">
          <header className="mb-4"><h4 className="card-title">Sign up</h4></header>
          
          <form onSubmit={registerUser}>
                <div className="form-row">
                { success && <div className="alert alert-success"> Registration successful! You can now log in. </div> }
                            
                { hasAnyErrors && <div className="alert alert-danger"> Correct the errors below. </div> }
                
              </div>
              <div className="form-row">
                <div className="col form-group">
                  <label>First name</label>
                  <input type="text" className="form-control" placeholder="" value={first_name} onChange={e => setFirst_name(e.target.value)} />
                  <small>{errors.first_name && <div className="text-danger">{errors.first_name[0]}</div>}</small>
                </div> {/* form-group end.// */}
                <div className="col form-group">
                  <label>Last name</label>
                    <input type="text" className="form-control" placeholder="" value={last_name} onChange={e => setLast_name(e.target.value)} />
                    <small>{errors.last_name && <div className="text-danger">{errors.last_name[0]}</div>}</small>
                </div> {/* form-group end.// */}
              </div> {/* form-row end.// */}
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" placeholder="" value={email} onChange={e => setEmail(e.target.value)} />
                <small>{errors.email && <div className="text-danger">{errors.email[0]}</div>}</small>
                <small className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div> {/* form-group end.// */}  
              <div className="form-group">
                <label>Phone</label>
                <input type="tel" className="form-control" placeholder="" value={phone} onChange={e => setPhone(e.target.value)} />                  
              </div> {/* form-group end.// */}                
              <div className="form-group">
                <label>Address</label>
                <input type="text" className="form-control" placeholder="" value={address} onChange={e => setAddress(e.target.value)} />                 
              </div> {/* form-group end.// */} 
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Password</label>
                  <input className="form-control" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                  <small>{errors.password && <div className="text-danger">{errors.password[0]}</div>}</small>
                  <small>{errors.non_field_errors && <div className="text-danger">{errors.non_field_errors[0]}</div>}</small>
                </div> {/* form-group end.// */} 
                <div className="form-group col-md-6">
                  <label>Confirm password</label>
                    <input className="form-control" type="password" value={password_confirm} onChange={e => setPassword_confirm(e.target.value)}   />
                    <small>{errors.password_confirm && <div className="text-danger">{errors.password_confirm[0]}</div>}</small>
                </div> {/* form-group end.// */}  
              </div>
              <div className="form-group">
                <button type="submit" className={`btn btn-primary btn-block ${loading ? 'disabled' : ''}` }> Register  </button>
              </div> {/* form-group// */}      
                          
          </form>
        </article>{/* card-body.// */}
      </div> {/* card .// */}
      <p className="text-center mt-4">Have an account? <Link to="/login">Log In</Link></p>
      <p className="text-center mt-4">OR </p>
      {/* <p className="text-center mt-4">Have a Google account? 
        <button type="button" onClick={() => handleGoogleLogin()} className="btn btn-primary ml-3" >Continue with Google</button>
      </p> */}
      <br /><br />
      {/* ============================ COMPONENT REGISTER  END.// ================================= */}
    </section>
    {/* ========================= SECTION CONTENT END// ========================= */}      
    </>
  );
}