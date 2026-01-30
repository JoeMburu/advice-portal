import {useState, createContext} from 'react'

// Create context
const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('access_token')
  );
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('user');    
    if (!userData || userData === 'undefined') return null;
    try {
      return JSON.parse(userData);
    } catch {
      return null;
    }
    
  });

  const login = (access, refresh, user) => {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    setIsLoggedIn(true);
  };
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
  };  

  return (
    <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, login, logout, user}}>
      {children}
    </AuthContext.Provider> 
  )
}

export default AuthProvider
export {AuthContext}