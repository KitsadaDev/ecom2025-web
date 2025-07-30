import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom';

const LoadingToRedirect = () => {

    const [count, setCount] = useState(3);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => {
                if (currentCount === 1) {
                    setRedirect(true);
                    clearInterval(interval);
                }
                return currentCount - 1;
            })
        },1000);
        return () => clearInterval(interval);
    },[]);

    if (redirect) {
        return <Navigate to="/" />;
    }

  return (
    <div>
      Redirect in {count} seconds...
    </div>
  )
}

export default LoadingToRedirect
