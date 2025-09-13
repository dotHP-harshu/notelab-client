import React, { useEffect } from 'react'

function Success({success, setSuccess}) {
    useEffect(() => {
      const timer = setTimeout(() => {
        setSuccess("")
      }, 2000);
    
      return () => {
        clearTimeout(timer)
      }
    }, [success])
    
    if(success === ''){
      return ""
    }
    
    
  return (
    <p
      className="bg-success px-4 py-1 border-2 border-border-color
     rounded-md text-text-main text-base fixed bottom-6 left-1/2 -translate-x-1/2  "
    >
      {success}
    </p>
  );
}

export default Success
