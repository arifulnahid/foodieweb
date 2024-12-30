import React, { useEffect } from "react";
import { useAuth } from "../../contextProvider/AuthContext";
import { useNavigate } from "react-router";
import { authFetcher } from "../../api/api";

export default function Logout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    authFetcher("customer/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${user?.token}`,
      },
    });
    navigate("/login");
  }, []);
}
