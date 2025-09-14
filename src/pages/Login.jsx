import React, { useEffect } from "react";
import Logo from "../components/Logo";

function Login() {
  const handleLogin = () => {
    try {
      window.location.href = "https://notelab-backend.vercel.app/auth/google";
    } catch (error) {
      navigate("/login");
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="w-full min-h-dvh flex justify-center items-center">
      <div className="w-full grid grid-cols-2 max-sm:grid-cols-1 justify-center items-center  ">
        {/* Img section  */}
        <div className="p-10 flex justify-center items-center max-sm:p-2">
          <img
            src="/images/login-hero.png"
            alt="hero"
            className="w-3/4 max-lg:w-56 max-w-96"
          />
        </div>
        {/* Img section  */}

        {/* login section  */}
        <div className="w-full h-full flex justify-center items-center ">
          <div className="w-72 min-h-72 border-2 border-border-color p-4 flex flex-col justify-center items-center gap-4 rounded-md max-sm:scale-90 ">
            <Logo size={40} />
            <h1 className="text-2xl text-center font-main font-bold tracking-tight">
              Welcome to NoteLab
            </h1>
            <p className="text-sm text-text-muted text-center ">
              Access notes by logging in with
            </p>
            <img
              src="/images/google-logo.svg"
              alt="svg"
              className="w-8 object-center"
            />
            <button
              onClick={handleLogin}
              className="w-full rounded-sm bg-surface-color text-center text-sm tracking-tight py-2 cursor-pointer select-none"
            >
              Sign in with Google
            </button>
          </div>
        </div>
        {/* login section  */}
      </div>
    </div>
  );
}

export default Login;
