import React, { useState } from "react";
import useSWR from "swr";
import CategoryItem from "./CategoryItem";
import { fetcher } from "../../api/api";

export default function Filter({ filterHandler, checked, setSearch }) {
  const [on, setOn] = useState(false);
  const { data, error, isLoading } = useSWR(`food/categories`, fetcher);

  return (
    <>
      <div>
        <div className="flex items-center gap-2">
          <div>
            <button
              onClick={() => setOn(!on)}
              disabled={error}
              className="inline-flex items-center justify-center h-10 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
            >
              <span>Fillter</span>
            </button>
          </div>
          <div className="w-full">
            <div className="relative">
              <input
                id="id-s03"
                type="search"
                name="id-s03"
                placeholder="Search here"
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search content"
                className="peer relative h-10 w-full rounded border border-slate-200 px-4 pr-12 text-sm text-slate-500 outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-4 top-2.5 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
                aria-label="Search icon"
                role="graphics-symbol"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div
          className={`p-4 ${
            on ? "grid" : "hidden"
          } grid-rows-4 grid-flow-col justify-normal gap-2`}
        >
          {data?.map((category) => (
            <CategoryItem
              filterHandler={filterHandler}
              checked={checked.includes(category.name)}
              key={category.id}
              category={category}
            />
          ))}
        </div>
      </div>
    </>
  );
}
