import moment from "moment";
import React from "react";

export default function RatingItem({ rating }) {
  return (
    <div className="my-2">
      <div className="">
        <div className="bg-white rounded-2xl px-10 py-4 shadow-lg hover:shadow-2xl transition duration-500">
          <div className="">
            <div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4 ">
                  <div className="">
                    <img
                      className="w-12 h-12 rounded-full"
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      alt=""
                    />
                  </div>
                  <div className="text-sm font-semibold">
                    <div>
                      {rating.user} •{" "}
                      <span className="font-normal">
                        {" "}
                        {moment(rating.created_at).fromNow()}
                      </span>
                    </div>

                    <div className="flex mt-2">{rating.rating}</div>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-md text-gray-600">{rating.comment}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
