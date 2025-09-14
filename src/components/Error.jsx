import React, { useEffect } from 'react'

function Error({error, setError}) {
    useEffect(() => {
      const timer = setTimeout(() => {
        setError("");
      }, 30000);

      return () => {
        clearTimeout(timer);
      };
    }, [error]);

    if (error === "") return "";

    return (
      <p
        className="bg-error px-4 py-1 border-2 border-border-color
     rounded-md text-text-main text-base fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] "
      >
        {error}
      </p>
    );
}

export default Error
