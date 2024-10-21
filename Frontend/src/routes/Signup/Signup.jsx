import React from "react";
import { FcGoogle } from "react-icons/fc"; // Install react-icons if not installed

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-n-7">
      <div className="max-w-md w-full bg-n-8 p-8 rounded shadow-lg">
        <h1 className="h1 text-center mb-6 text-color-1">Sign Up</h1>
        <form>
          <div className="mb-4">
            <label className="block text-n-1 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border border-n-9 rounded bg-n-7 text-n-1 placeholder-n-4 focus:outline-none focus:border-color-1"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-n-1 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-n-9 rounded bg-n-7 text-n-1 placeholder-n-4 focus:outline-none focus:border-color-1"
              placeholder="Enter your email"
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
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="button bg-color-1 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Sign Up
            </button>
          </div>

          <div className="flex items-center justify-center mb-4">
            <span className="text-n-4">or</span>
          </div>

          <div className="flex items-center justify-center mb-4">
            <button
              type="button"
              className="flex items-center justify-center w-full py-2 px-4 border border-n-9 rounded bg-white text-n-1 hover:bg-n-6 focus:outline-none focus:border-color-1"
            >
              <FcGoogle className="mr-2" size={24} />
              Sign up with Google
            </button>
          </div>

          <div className="flex items-center justify-between">
            <a className="inline-block align-baseline font-bold text-sm text-color-5 hover:text-color-2" href="#">
              Already have an account? Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
