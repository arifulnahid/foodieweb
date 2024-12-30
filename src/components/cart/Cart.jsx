import React, { useEffect, useState } from "react";
import useSWR from "swr";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { authFetcher } from "../../api/api";
import { useAuth } from "../../contextProvider/AuthContext";
import Loader from "../loader/Loader";
import CartItem from "./CartItem";

export default function Cart() {
  const [checkout, setCheckout] = useState({
    subtotal: 0,
    shipping_fee: 120,
    discount: 0,
  });
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const { data, isLoading, error, mutate } = useSWR(
    user?.token ? "customer/cart/" : null,
    (url) =>
      authFetcher(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${user?.token}`,
        },
      })
  );

  const handleCartUpdate = (cart_id, type) => {
    authFetcher(`customer/cart/${cart_id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${user?.token}`,
      },
      body: JSON.stringify({ type }),
    })
      .then((data) => {
        mutate();
        toast.success("Cart Updated");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleCartDelete = (id) => {
    toast.success("Cart Deleted");
    authFetcher(`customer/cart/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${user?.token}`,
      },
    })
      .then((data) => {
        toast.success("Cart Deleted");
        mutate();
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
  } else if (!isLoading && !error && data?.length === 0) {
    content = <div>No Cart Found</div>;
  } else if (!isLoading && !error && data?.length > 0) {
    content = data?.map((cart) => (
      <CartItem
        key={cart.id}
        cart={cart}
        handleCartUpdate={handleCartUpdate}
        handleCartDelete={handleCartDelete}
      />
    ));
  } else {
    navigate("/ ");
    return <div>Error Happend</div>;
  }

  const handleCheckout = () => {
    const food_items = data?.map((cart) => cart.food_item.id);
    const total = checkout.subtotal + checkout.shipping_fee - checkout.discount;
    const discount = checkout.discount;
    const userid = user?.customer.id;
    const ids = data?.map((cart) => cart.id);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${user?.token}`,
    };

    authFetcher("customer/order/", {
      method: "POST",
      headers,
      body: JSON.stringify({ food_items, total, discount, user: userid }),
    })
      .then((data) => {
        authFetcher("customer/cart/bulk-delete/", {
          method: "DELETE",
          headers,
          body: JSON.stringify({ ids }),
        });
        toast.success("Order Confirm");
        navigate("/profile/orders");
      })
      .catch((e) => {
        console.log(data);
      });
  };

  useEffect(() => {
    const subtotal = data?.reduce((subtotal, cart) => {
      return (cart.food_item.price + subtotal) * cart.quantity;
    }, 0);

    const discount = data?.reduce((discount, cart) => {
      return ((cart.food_item.discount / 100) * 100 + discount) * cart.quantity;
    }, 0);

    setCheckout((prev) => ({ ...prev, subtotal, discount }));
  }, [data]);

  return (
    <div className="h-screen bg-gray-100 pt-4">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">{content}</div>
        {/* <!-- Sub total --> */}
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">${checkout.subtotal}</p>
          </div>
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Discount</p>
            <p className="text-gray-700">
              ${checkout.discount} (
              {((checkout.discount / checkout.subtotal) * 100).toFixed(2)}
              %)
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">${checkout.shipping_fee}</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">
                ${checkout.subtotal - checkout.discount + checkout.shipping_fee}{" "}
                USD
              </p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
          >
            Check out
          </button>
        </div>
      </div>
    </div>
  );
}
