import React, { useEffect, useState } from "react";
import RatingItem from "./RatingItem";
import useSWR from "swr";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useAuth } from "../../contextProvider/AuthContext";
import Loader from "../loader/Loader";
import { fetcher, authFetcher } from "../../api/api";

export default function Rating({ param }) {
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);
  const { user } = useAuth();
  const [selectedOption, setSelectedOption] = useState("⭐");
  const [comment, setComment] = useState("");

  const {
    data: ratings,
    isLoading,
    error,
    mutate,
  } = useSWR(`food/review/?food_item=${param.id}`, fetcher);

  const onValueChange = (e) => {
    setSelectedOption(e);
  };

  const commenthandler = (e) => {
    setComment(e.target.value);
  };

  const handleRating = () => {
    if (!user) {
      navigate("/login/", { state: { from: `/food/${param.id}` } });
    }

    authFetcher("food/review/", {
      method: "POST",
      body: JSON.stringify({
        food_item: param.id,
        rating: selectedOption,
        comment: comment,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${user?.token}`,
      },
    })
      .then((data) => {
        mutate();
        toast.success("Review Addedd Successfully");
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.message);
      });
  };

  useEffect(() => {
    ratings?.forEach((e) => {
      if (e.user == user.customer.username) {
        setAdded(true);
      }
    });
  }, [ratings, param.id, isLoading]);

  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (!isLoading && error) {
    content = <div className="text-red-400">{error?.message}</div>;
  } else if (!isLoading && !error && ratings) {
    content = ratings?.map((rating) => (
      <RatingItem key={rating.id} rating={rating} />
    ));
  }

  return (
    <div className="my-10">
      {!added && (
        <div className="py-6 flex flex-col justify-center">
          <div className="py-3">
            <div className="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
              <div className="px-12 py-5">
                <h2 className="text-gray-800 text-3xl font-semibold">
                  Your opinion matters to us!
                </h2>
              </div>
              <div className="bg-gray-200 w-full flex flex-col items-center">
                <div className="flex flex-col items-center py-6 space-y-3">
                  <div className="flex space-x-3">
                    <fieldset className="flex gap-10">
                      <legend className="mb-6 text-slate-500">
                        How was quality of the Food?
                      </legend>
                      <div className="flex items-center">
                        <input
                          className="hidden peer cursor-pointer"
                          type="radio"
                          value="⭐"
                          id="1"
                          name="1"
                          checked={selectedOption.length >= 1}
                          readOnly
                        />
                        <svg
                          className="w-10 h-10 peer-checked:text-yellow-500 text-gray-500 cursor-pointer"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          onClick={() => onValueChange("⭐")}
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <div className="relative flex items-center">
                        <input
                          className="hidden peer cursor-pointer"
                          type="radio"
                          value="⭐⭐"
                          id="2"
                          name="2"
                          checked={selectedOption.length >= 2}
                          readOnly
                        />
                        <svg
                          className="w-10 h-10 cursor-pointer peer-checked:text-yellow-500 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          onClick={() => onValueChange("⭐⭐")}
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <div className="relative flex items-center">
                        <input
                          className="hidden peer cursor-pointer"
                          type="radio"
                          value="⭐⭐⭐"
                          id="3"
                          name="3"
                          checked={selectedOption.length >= 3}
                          readOnly
                        />
                        <svg
                          className="w-10 h-10 cursor-pointer peer-checked:text-yellow-500 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          onClick={() => onValueChange("⭐⭐⭐")}
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <div className="relative flex items-center">
                        <input
                          className="hidden peer cursor-pointer"
                          type="radio"
                          value="⭐⭐⭐⭐"
                          id="4"
                          name="4"
                          checked={selectedOption.length >= 4}
                          readOnly
                        />
                        <svg
                          className="w-10 h-10 cursor-pointer peer-checked:text-yellow-500 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          onClick={() => onValueChange("⭐⭐⭐⭐")}
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <div className="relative flex items-center">
                        <input
                          className="hidden peer cursor-pointer"
                          type="radio"
                          value="⭐⭐⭐⭐⭐"
                          id="5"
                          name="5"
                          checked={selectedOption.length >= 5}
                          readOnly
                        />
                        <svg
                          className="w-10 h-10 cursor-pointer peer-checked:text-yellow-500 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          onClick={() => onValueChange("⭐⭐⭐⭐⭐")}
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div className="w-3/4 flex flex-col">
                  <textarea
                    rows="3"
                    className="p-4 text-gray-500 rounded-xl resize-none"
                    onChange={commenthandler}
                  />
                  <button
                    onClick={handleRating}
                    className="py-3 my-8 text-lg bg-gradient-to-r bg-emerald-500 rounded-xl text-white"
                  >
                    Rate now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div>{content}</div>
    </div>
  );
}
