import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const [isChecking, setIsChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    setIsChecking(false);
  }, []);

  if (isChecking) {
    return <div>Loading...</div>; // atau spinner
  }

  return isLoggedIn ? children : <Navigate to="/login" replace />;
}