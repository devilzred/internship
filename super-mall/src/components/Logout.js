import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

const Logout = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await signOut(auth);
        navigate('/admin-login');  // Redirect to admin login page after logout
      } catch (error) {
        console.error("Error logging out: ", error);
      }
    };

    performLogout();
  }, [auth, navigate]);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
