import React, { useState, useEffect } from "react";
import { Link } from "react-router";

export default function Dropdown({ isOpen, setIsOpen, wrapperRef }) {
  const [currentItem, setCurrentItem] = useState(null);

  const navigationItems = [
    {
      linkName: "Profile",
      url: "/profile/details",
    },
    {
      linkName: "Order",
      url: "/profile/orders",
    },
    {
      linkName: "Cart",
      url: "/cart",
    },
    {
      linkName: "Logout",
      url: "/logout",
    },
  ];

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  //   useEffect(() => {
  //     function handleClickOutside(event) {
  //       if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
  //         setIsOpen(false);
  //       }
  //     }
  //     document.addEventListener("mousedown", handleClickOutside);
  //     return () => {
  //       document.removeEventListener("mousedown", handleClickOutside);
  //     };
  //   }, [wrapperRef]);

  const handleKeyDown = (e) => {
    if (isOpen) {
      e.preventDefault();

      switch (e.keyCode) {
        // KeyDown
        case 40:
          if (currentItem === navigationItems.length - 1) {
            setCurrentItem(0);
          } else {
            setCurrentItem(currentItem + 1);
          }
          break;
        // KeyUp
        case 38:
          if (currentItem === 0) {
            setCurrentItem(navigationItems.length - 1);
          } else {
            setCurrentItem(currentItem - 1);
          }
          break;
        // Escape
        case 27:
          setCurrentItem(1);
          setIsOpen(false);
          break;
        default:
          break;
      }
    }
  };

  return (
    <>
      {/* <!-- Component: Basic dropdown menu--> */}
      <div className="" id="dropdown">
        {/*  <!-- Start Menu list --> */}
        <ul
          className={`${
            isOpen ? "flex" : "hidden"
          } absolute top-full right-0 z-10 mt-1 flex w-72 list-none flex-col rounded bg-white py-2 shadow-md shadow-slate-500/10 `}
        >
          {navigationItems.map((item, index) => {
            return (
              <li key={index}>
                <Link
                  className={` ${
                    index === currentItem
                      ? "bg-emerald-50 text-emerald-500"
                      : "bg-none text-slate-500"
                  } flex items-start justify-start gap-2 p-2 px-5 transition-colors duration-300 hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 focus:text-emerald-600 focus:outline-none focus-visible:outline-none`}
                  to={item.url}
                  aria-current={index + 1 === currentItem ? "page" : "false"}
                >
                  <span className="flex flex-col gap-1 overflow-hidden whitespace-nowrap">
                    <span className="truncate leading-5">{item.linkName}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        {/*  <!-- End Menu list --> */}
      </div>
      {/* <!-- End Basic dropdown menu--> */}
    </>
  );
}
