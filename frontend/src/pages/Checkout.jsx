import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";


export default function Checkout() {
  
  const API_BASE = import.meta.env.VITE_API_URL;
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/cart/checkout";
  

  useEffect(() => {
    function onload() {
     navigate(from, { replace: true });      
    }
    onload();
    }, []);   

  

    
  return (
    <>
    <h2>Checkout Page...</h2>
    </>
  );
}