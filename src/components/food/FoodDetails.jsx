import React from "react";
import { useNavigate, useParams } from "react-router";
import useSWR from "swr";
import { authFetcher, fetcher } from "../../api/api";
import { useAuth } from "../../contextProvider/AuthContext";
import Rating from "../rating/Rating";
import toast from "react-hot-toast";

export default function FoodDetails() {
  const param = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data, isLoading, error } = useSWR(`food/list/${param.id}`, fetcher);

  const handleCart = () => {
    if (!user) {
      navigate("/login/", { state: { from: `/food/${param.id}` } });
    }

    authFetcher("customer/cart/", {
      method: "POST",
      body: JSON.stringify({ food_item: param?.id }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${user?.token}`,
      },
    })
      .then((data) => {
        toast.success("Added to cart");
        navigate("/cart");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <main className="mx-auto w-5/6 mt-10 min-h-screen">
      <section className="flex flex-col md:flex-row gap-11 py-10 px-5 bg-white rounded-md shadow-lg">
        <div className="text-indigo-500 flex w-1/2 flex-col justify-between">
          <img src={data?.image} alt="food" />
        </div>
        <div className="text-indigo-500">
          <small className="uppercase">{data?.category}</small>
          <h3 className="uppercase text-black text-2xl font-medium">
            {data?.name}
          </h3>
          <h3 className="text-2xl font-semibold mb-7">${data?.price}</h3>
          <small className="text-black">{data?.description}</small>
          <div className="flex gap-0.5 mt-4">
            <button
              id="addToCartButton"
              onClick={handleCart}
              className="bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 focus:outline-none transition text-white uppercase px-8 py-3"
            >
              add to cart
            </button>
          </div>
        </div>
      </section>
      <section>
        <div>
          <Rating param={param} />
        </div>
      </section>
    </main>
  );
}
