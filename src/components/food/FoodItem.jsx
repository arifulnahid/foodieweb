import _ from "lodash";
import React from "react";
import { Link } from "react-router";

export default function FoodItem({ food, handleCart }) {
  return (
    <>
      {/*<!-- Component: E-commerce card --> */}
      <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
        {/*  <!-- Image --> */}
        <Link to={`food/${food.id}`}>
          <figure>
            <img
              src={food.image}
              alt="card image"
              className="aspect-video w-full"
            />
          </figure>
          {/*  <!-- Body--> */}
          <div className="p-6">
            <header className="mb-4">
              <h3 className="text-xl font-medium text-slate-700">
                {food.name}
              </h3>
              <p>
                <span className=" text-slate-400 mr-2">
                  ${food.price - (food.discount / 100) * 100}
                </span>
                {food.discount > 0 && (
                  <>
                    <del className="">${food.price} </del>
                    <span className="text-red-500">{food.discount}%</span>
                  </>
                )}
              </p>
            </header>
            <p>
              {_.truncate(food.description, {
                length: 60,
                separator: " ",
              })}
            </p>
          </div>
        </Link>
        {/*  <!-- Action base sized basic button --> */}
        <div className="flex justify-end p-6 pt-0">
          <button
            onClick={() => handleCart(food.id)}
            className="inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
          >
            <span>Add To Cart</span>
          </button>
        </div>
      </div>
      {/*<!-- End E-commerce card --> */}
    </>
  );
}
