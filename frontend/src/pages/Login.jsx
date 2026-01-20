import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../AuthProvider.jsx";
import GoogleLoginButton from "./GoogleLoginButton.jsx";
import { GoogleLogin } from "@react-oauth/google";



export default function Login() { 
  
  const API_BASE = import.meta.env.VITE_API_URL; // e.g. https://your-backend.herokuapp.com

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);  

    // get user data
    const userData = {      
      email: email,
      password: password,      
    };

    try {
      const response = await axios.post(`${API_BASE}/api/v1/accounts/token/`, userData);
      login(response.data.access, response.data.refresh, response.data.user || null)          
      setSuccess(true);
      setErrors({});      
      navigate("/dashboard");
    }
    catch (error) {
      // handle error
      if (error.response && error.response.data) {
        setErrors({ non_field_errors: ["Invalid credentials. Please try again."]});
        setSuccess(false);
      }     
    }
    finally {
      setLoading(false);
    }
  }

  // 👇 THIS function lives here
  async function handleGoogleSuccess(credentialResponse) {
    try {
      const res = await axios.post(
        `${API_BASE}/api/auth/google/`, 
        {access_token: credentialResponse.credential}, 
        {headers: { "Content-Type": "application/json" }}
      );
      const data = res.data;
      console.log("Google auth successful", data);
      login(data.access, data.refresh, data.user || null);
      navigate("/dashboard", { replace: true });
    }
    catch(err){
      const data = err.response?.data;
      console.error("Google auth failed", data || err.message);
    }    
  }
    
  return (
    <>
    <section className="section-content padding-y" style={{minHeight:"84vh"}}>
      <div className="card mx-auto" style={{maxWidth: "380px", marginTop:"100px"}}>
        <div className="card-body">
        <h4 className="card-title mb-4">Sign in</h4>        
        <form onSubmit={loginUser}>   
          <div className="form-group">
            {errors.non_field_errors && (
              <div className="alert alert-danger">
                {errors.non_field_errors[0]}
              </div>
            )}
          </div>        
          <div className="form-group">
            <input type="email" className="form-control" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} />
          </div> {/*<!-- form-group// -->*/}
          <div className="form-group">
            <input type="password" className="form-control" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          </div> {/*<!-- form-group// -->*/}  
            
            <div className="form-group">
              <a href="#" className="float-right">Forgot password?</a> 
            
            </div> {/*<!-- form-group form-check .// -->*/}
            <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block" disabled={loading}> {loading ? "Logging in..." : "Login"} </button>
            </div> {/*<!-- form-group// -->*/}     
            
        </form>
        </div> {/*<!-- card-body.// -->*/}

        <p className="text-center mt-4">Don't have account? <Link to="/register">Sign up</Link></p>
        <GoogleLoginButton onSuccess={handleGoogleSuccess} />
      </div> {/*<!-- card .// -->*/}
     
     <br /><br /> 
    </section>    
    </>
  );
}
