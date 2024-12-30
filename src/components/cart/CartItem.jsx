import React from "react";
import { Link } from "react-router";

export default function CartItem({ cart, handleCartUpdate, handleCartDelete }) {
  return (
    <div className="justify-between mb-4 rounded-lg bg-white p-2 shadow-md sm:flex sm:justify-start">
      <img
        src={cart.food_item.image}
        alt={cart.food_item.name}
        className="w-full rounded-lg sm:w-20"
      />
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <Link
            to={`/food/${cart.food_item.id}`}
            className="text-lg font-bold text-blue-500"
          >
            {cart.food_item.name}
          </Link>
          <p className="mt-1 text-xs text-gray-700">
            {cart.food_item.category}
          </p>
        </div>
        <div className="mt-4 flex justify-between sm:flex-col sm:items-end sm:space-y-6 sm:mt-0 ">
          <div className="flex items-center border-gray-100">
            <span
              onClick={() => handleCartUpdate(cart.id, "decrease")}
              className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
            >
              {" "}
              -{" "}
            </span>
            <input
              className="h-8 w-8 border bg-white text-center text-xs outline-none"
              type="number"
              value={cart.quantity}
              min="1"
            />
            <span
              onClick={() => handleCartUpdate(cart.id, "increase")}
              className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
            >
              {" "}
              +{" "}
            </span>
          </div>
          <div className="flex items-center">
            <p className="text-md font-semibold">
              <del className="mx-2 text-gray-400">${cart.food_item.price}</del>$
              {cart.food_item.price - (cart.food_item.discount / 100) * 100} [-
              {cart.food_item.discount}%] ={" "}
              {(cart.food_item.price - (cart.food_item.discount / 100) * 100) *
                cart.quantity}
            </p>
            <button onClick={() => handleCartDelete(cart.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
