import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../../contextProvider/AuthContext";
import Dropdown from "../profile/Dropdown";
import useSWR from "swr";
import { authFetcher } from "../../api/api";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const wrapperRef = useRef(null);
  const { user } = useAuth();
  const { data, mutate } = useSWR("customer/cart/", (url) =>
    authFetcher(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${user?.token}`,
      },
    })
  );

  useEffect(() => {
    if (!user?.token) setIsOpen(false);
    mutate();
  }, [user]);

  return (
    <>
      {/*<!-- Header --> */}
      <header className=" relative z-20 w-full border-b border-slate-200 bg-white/90 shadow-lg shadow-slate-700/5 after:absolute after:left-0 after:top-full after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden">
        <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
          <nav
            aria-label="main navigation"
            className="flex h-[5.5rem] items-stretch justify-between font-medium text-slate-700"
            role="navigation"
          >
            {/*      <!-- Brand logo --> */}
            <Link
              id="WindUI"
              aria-label="WindUI logo"
              aria-current="page"
              className="flex items-center gap-2 whitespace-nowrap py-3 text-lg focus:outline-none lg:flex-1"
              to=""
            >
              <svg
                width="300"
                height="300"
                viewBox="0 0 300 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 bg-emerald-500"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M88.1121 88.1134L150.026 150.027L150.027 150.027L150.027 150.027L150.028 150.027L150.027 150.026L88.1133 88.1122L88.1121 88.1134ZM273.878 273.877C272.038 274.974 196.128 319.957 165.52 289.349L88.1124 211.942L26.1434 273.911C26.1434 273.911 -20.3337 196.504 10.651 165.519L88.1121 88.1134L26.1417 26.1433C26.1417 26.1433 69.6778 0.00338007 104.519 0H0V300H300V0H104.533C116.144 0.00112664 126.789 2.90631 134.534 10.651L211.941 88.1123L273.877 26.177C274.974 28.0159 319.957 103.926 289.349 134.535L211.942 211.942L273.878 273.877ZM273.878 273.877L273.912 273.857V273.911L273.878 273.877ZM273.877 26.177L273.911 26.1429H273.857C273.857 26.1429 273.863 26.1544 273.877 26.177Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 0H300V300H0V0ZM150.026 150.025C121.715 99.731 88.1131 88.1122 88.1131 88.1122L10.6508 165.519C10.6508 165.519 26.143 150.027 150.026 150.027H150.027C150.026 150.027 150.026 150.027 150.026 150.027L150.026 150.027C99.731 178.339 88.1124 211.941 88.1124 211.941L165.52 289.348C165.52 289.348 150.032 273.86 150.027 150.027H150.029C178.341 200.323 211.944 211.942 211.944 211.942L289.352 134.535C289.352 134.535 273.864 150.023 150.027 150.027V150.027L150.027 150.027C200.322 121.715 211.941 88.1125 211.941 88.1125L134.534 10.651C134.534 10.651 150.026 26.1431 150.026 150.025ZM150.027 150.027L150.026 150.027C150.026 150.026 150.026 150.026 150.026 150.025C150.026 150.025 150.027 150.026 150.027 150.027ZM150.027 150.027L150.027 150.026L150.027 150.027C150.027 150.027 150.027 150.027 150.027 150.027L150.027 150.027ZM150.027 150.027C150.027 150.027 150.027 150.027 150.027 150.027H150.027L150.027 150.027Z"
                  fill="rgba(255,255,255,.2)"
                />
              </svg>
              Foodie
            </Link>
            {/*      <!-- Actions --> */}
            <div className="ml-auto flex gap-4 items-center justify-end px-6 lg:ml-0 lg:flex-1 lg:p-0">
              {!user ? (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </>
              ) : (
                <>
                  <Link
                    to="cart"
                    className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-lg text-emerald-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-labelledby="title description"
                      role="graphics-symbol"
                    >
                      <title id="title">Cart Icon</title>
                      <desc id="description">Cart icon with items</desc>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                    <span className="absolute -right-1.5 -top-1.5 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-pink-500 px-1.5 text-sm text-white">
                      {data?.length ? data?.length : "0"}
                      <span className="sr-only"> new emails </span>
                    </span>
                  </Link>
                  {/*        <!-- Avatar --> */}
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen ? " true" : "false"}
                    ref={wrapperRef}
                    className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-white"
                  >
                    <img
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      alt="user name"
                      title="user name"
                      width="40"
                      height="40"
                      className="max-w-full rounded-full"
                    />
                    <span className="absolute bottom-0 right-0 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-pink-500 p-1 text-sm text-white">
                      <span className="sr-only"> 7 new emails </span>
                    </span>
                  </button>
                  {/*        <!-- End Avatar --> */}
                </>
              )}
            </div>
          </nav>
        </div>
        {
          <Dropdown
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            wrapperRef={wrapperRef}
          />
        }
      </header>
      {/*<!-- End Navbar with Topbar--> */}
    </>
  );
}
