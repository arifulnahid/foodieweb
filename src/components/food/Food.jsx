import React, { useState } from "react";
import FoodItem from "./FoodItem";
import Filter from "../filter/Filter";
import useSWR from "swr";
import { authFetcher, fetcher } from "../../api/api";
import Loader from "../loader/Loader";
import { useAuth } from "../../contextProvider/AuthContext";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function Food() {
  const [checked, setChecked] = useState("");
  const [search, setSearch] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data, isLoading, error } = useSWR(
    `food/list/?category_name=${checked}&search=${search}`,
    fetcher
  );
  const { data: discount } = useSWR(
    `food/list?ordering=-discount&limit=4`,
    fetcher
  );

  const filterHandler = (value) => {
    setChecked((prev) => (checked.includes(value) ? "" : value));
  };

  const handleCart = (food_id) => {
    if (!user) {
      navigate("/login/", { state: { from: `/` } });
    }

    authFetcher("customer/cart/", {
      method: "POST",
      body: JSON.stringify({ food_item: food_id }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${user?.token}`,
      },
    })
      .then((data) => {
        toast.success("Addedd to cart");
        navigate("/cart");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (!isLoading && error) {
    content = <div>{error?.message}</div>;
  } else if (!isLoading && !error && data) {
    content = data?.map((food) => (
      <FoodItem key={food.id} food={food} handleCart={handleCart} />
    ));
  }

  return (
    <div className="sm:p-4 md:p-6 p-2 mx-auto min-h-screen">
      <div>
        <h1 className="p-4 bg-gradient-to-r from-emerald-500 rounded-sm font-bold w-1/2">
          Speacial
        </h1>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 my-6">
          {discount ? (
            discount?.results?.map((food, i) => (
              <FoodItem key={i} food={food} handleCart={handleCart} />
            ))
          ) : (
            <Loader />
          )}
        </div>
      </div>
      <div className="min-h-screen">
        <h1 className="p-4 bg-gradient-to-r from-emerald-500 rounded-sm font-bold my-10 w-1/2">
          All
        </h1>
        <div className="my-10">
          <Filter
            filterHandler={filterHandler}
            checked={checked}
            setSearch={setSearch}
          />
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {content}
        </div>
      </div>
    </div>
  );
}
