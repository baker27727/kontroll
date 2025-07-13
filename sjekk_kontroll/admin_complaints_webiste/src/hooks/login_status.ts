import { useState, useEffect } from 'react';

const useLoginStatus = () => {
  const [userIsLogged, setUserIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    console.log(token);
    

    // Update the login status based on the presence of the token
    setUserIsLogged(token != null);
  }, []);

  return userIsLogged;
};

export default useLoginStatus;
