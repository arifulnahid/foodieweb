import React from "react";
import { useEffect } from "react";
import { fetcher } from "../../api/api";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";

export default function Activate() {
  const param = useParams();
  const naviagte = useNavigate();

  useEffect(() => {
    fetcher(`/customer/activate/${param.uid64}/${param.token}`).then((data) => {
      toast.success("Account activate successfully");
      naviagte("/login");
    });
  }, [param]);

  return <div>Account Activate Faild</div>;
}
