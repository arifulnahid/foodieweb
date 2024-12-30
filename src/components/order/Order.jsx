import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { authFetcher } from "../../api/api";
import { useAuth } from "../../contextProvider/AuthContext";
import OrderItem from "./OrderItem";
import Loader from "../loader/Loader";

export default function Order() {
  const { user } = useAuth();

  const { data, isLoading, error } = useSWR(
    `customer/order/?user=${user?.customer.id}`,
    (url) =>
      authFetcher(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${user?.token}`,
        },
      })
  );

  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (!isLoading && error) {
    content = <div>{error?.message}</div>;
  } else if (!isLoading && !error && data?.length === 0) {
    content = <div>No Order Found</div>;
  } else if (!isLoading && !error && data) {
    content = data?.map((order) => <OrderItem key={order.id} order={order} />);
  }

  return (
    <section className="px-4 mt-4 text-gray-600 antialiased" x-data="app">
      <div className="flex flex-col justify-center">
        {/* <!-- Table --> */}
        <div className="mx-auto w-full rounded-sm border border-gray-200 bg-white shadow-lg">
          <header className="border-b border-gray-100 px-5 py-4">
            <div className="font-semibold text-gray-800">Your Orders</div>
          </header>

          <div className="overflow-x-auto p-3">
            <table className="w-full table-auto">
              <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-400">
                <tr>
                  <th></th>
                  <th className="p-2">
                    <td className="text-left font-semibold">Product Name</td>
                  </th>
                  <th className="p-2">
                    <td className="text-left font-semibold">Date</td>
                  </th>
                  <th className="p-2">
                    <td className="text-left font-semibold">Total</td>
                  </th>
                  <th className="p-2">
                    <td className="text-left font-semibold">Payment</td>
                  </th>
                  <th className="p-2">
                    <td className="text-left font-semibold">Status</td>
                  </th>
                  <th className="p-2">
                    <td className="text-center font-semibold">Action</td>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 text-sm">
                {content}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
