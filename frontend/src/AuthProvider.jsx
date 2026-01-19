import {useState, createContext} from 'react'

// Create context
const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('access_token')
  );
  const login = (access, refresh) => {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    setIsLoggedIn(true);
  };
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsLoggedIn(false);
  };  

  return (
    <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, login, logout}}>
      {children}
    </AuthContext.Provider> 
  )
}

export default AuthProvider
export {AuthContext}