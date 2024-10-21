import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc"; // Install react-icons if not installed
import { useFirebase } from "../../context/Firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const firebase = useFirebase();

  const navigate = useNavigate();
  console.log(firebase)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (firebase.isLoggedIn) {
      // navigate to home page 
      navigate("/");

    }
  }, [firebase, navigate]);

  // Handle email/password login
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page

    try {
      await firebase.signinUserWithEmailAndPassword(email, password);
      setSuccess("Logged in successfully!");
      setError("");
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  // Handle Google login
  const handleGoogleSignIn = async () => {
    try {
      await firebase.signinWithGoogle();
      setSuccess("Logged in with Google successfully!");
      setError("");
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-n-7">
      <div className="max-w-md w-full bg-n-8 p-8 rounded shadow-lg">
        <h1 className="h1 text-center mb-6 text-color-1">Login</h1>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-n-1 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-n-9 rounded bg-n-7 text-n-1 placeholder-n-4 focus:outline-none focus:border-color-1"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-n-1 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-n-9 rounded bg-n-7 text-n-1 placeholder-n-4 focus:outline-none focus:border-color-1"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="button bg-color-1 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Login
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center mb-4">
          <span className="text-n-4">or</span>
        </div>

        <div className="flex items-center justify-center mb-4">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full py-2 px-4 border border-n-9 rounded bg-white text-n-1 hover:bg-n-6 focus:outline-none focus:border-color-1"
          >
            <FcGoogle className="mr-2" size={24} />
            Login with Google
          </button>
        </div>

        <div className="flex items-center justify-between">
          <a className="inline-block align-baseline font-bold text-sm text-color-5 hover:text-color-2" href="#">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
