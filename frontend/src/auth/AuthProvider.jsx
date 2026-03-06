import {useState, useEffect, useMemo} from 'react'
import axiosInstance from '../api/axiosInstance.jsx';
import { tokenStorage } from './tokenStorage';
import { AuthContext } from './authContext.jsx';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';


function isExpired(accessToken) {
  try {
    const { exp } = jwtDecode(accessToken);
    return !exp || Date.now() >= exp * 1000;    
  } catch {
    return true;
  }
}

function decoderUser (user) {
  if (!user) return null;
  return {
    username: user.username ?? null,
    email: user.email ?? null,
    firstName: user.first_name ?? null,
    lastName: user.last_name ?? null,
  }  
}

const AuthProvider = ({children}) => {
  const API_BASE = import.meta.env.VITE_API_URL;

  const [accessToken, setAccessToken] = useState(tokenStorage.getAccess());
  const [user, setUser] = useState(decoderUser(tokenStorage.getUser()));
  //const [refreshToken, setRefreshToken] = useState(tokenStorage.getRefresh());

  const [isLoggedIn, setIsLoggedIn] = useState(!!tokenStorage.getAccess());

  const login =  async (email, password) => {
    const response = await axiosInstance.post(`${API_BASE}/api/v1/accounts/token/`, {email, password});
    const { access, refresh } = response.data;
    tokenStorage.setTokens(access, refresh);
    setAccessToken(access);
    setIsLoggedIn(true);
    const user = await axiosInstance.get(`${API_BASE}/api/v1/accounts/me/`);
    tokenStorage.setUser(user.data);
    setUser(user.data);
  };
  
  const logout = () => {
    tokenStorage.clear();
    setAccessToken(null);
    setIsLoggedIn(false);
    setUser(null);
  };  

  const refreshAccess = async () => {
    const refresh = tokenStorage.getRefresh();
    if (!refresh) {
      throw new Error("No refresh token available");
    }

    const res = await axios.post(`${API_BASE}/api/v1/accounts/token/refresh/`, {refresh});
    const newAccess = res.data.access;
    const newRefresh = res.data.refresh;

    if (newRefresh) {
      tokenStorage.setTokens(newAccess, newRefresh);
    } else {
      tokenStorage.setAccess(newAccess);
    }

    setAccessToken(newAccess);
    setIsLoggedIn(true);
    
    return newAccess;
  }

  useEffect(() => {
    const init = async () => {
      const access = tokenStorage.getAccess();
      const refresh = tokenStorage.getRefresh();
      const user = tokenStorage.getUser();

      if (user) {
        const decodedUser = decoderUser(user);
        setUser(decodedUser);        
      }

      if (access && !isExpired(access)) {
        setAccessToken(access);
        setIsLoggedIn(true);        
        console.log("Existing access token is valid, user logged in.");
        return;
      }      

      if (refresh) {
        try {
          await refreshAccess();  
          console.log("Access token refreshed successfully on app load."); 
          return;       
        } catch (err) {
          console.error("Failed to refresh access token on app load:", err);

          const status = err.response?.status;
          if (status === 400 || status === 401) {
            logout();
          } 
          return;
        }
        // no tokens
      }
    };

    init();
  }, []);

  const value = useMemo(() => ({
    accessToken,
    isLoggedIn,
    isAuthenticated: !!accessToken,
    login,
    logout,
    user,
  }), [isLoggedIn, accessToken, user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider> 
  )
}

export default AuthProvider
