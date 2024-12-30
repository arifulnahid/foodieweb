import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { axiosapi } from "../../api/api";
import { useAuth } from "../../contextProvider/AuthContext";

export default function Login() {
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    axiosapi
      .post("customer/login/", state)
      .then((res) => {
        setIsLoading(false);
        if (res.data?.error) {
          setError(res.data?.error);
        } else {
          login(res.data);
          navigate(location.state ? location.state.from : "/");
        }
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.message);
      });
  };

  useEffect(() => {
    if (user && user?.token) {
      navigate(location.state.from ?? "/");
    }
  }, []);

  return (
    <div className="w-full sm:w-1/2 p-4 mx-auto mt-10 min-h-screen">
      <div>Login Your Account</div>

      <form onSubmit={handleLogin}>
        <div className="relative my-6">
          <input
            id="username"
            required={true}
            type="text"
            name="username"
            placeholder="your username"
            value={state["username"]}
            className="peer relative h-10 w-full border-b border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            onChange={handleChange}
          />
          <label
            htmlFor="username"
            className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
          >
            Usernmae
          </label>
        </div>
        <div className="relative my-6">
          <input
            id="password"
            required={true}
            type="text"
            name="password"
            placeholder="your password"
            className="peer relative h-10 w-full border-b border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            onChange={handleChange}
          />
          <label
            htmlFor="password"
            className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
          >
            Password
          </label>
        </div>
        <div className="mb-2">
          <span className="text-red-500">{error}</span>
        </div>
        <button
          disabled={isLoading}
          className="inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded-full whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
        >
          <span>Login</span>
        </button>

        <div className="my-4">
          <span>
            Don't have any account{" "}
            <Link className="text-blue-500" to="/register">
              Register
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
