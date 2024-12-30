import React from "react";
import { useAuth } from "../../contextProvider/AuthContext";

export default function ProfileDetails() {
  const { user } = useAuth();

  return (
    <div className="flow-root w-full md:w-3/4 mx-auto mt-4">
      <dl className="-my-3 divide-y divide-gray-100 text-sm">
        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Username</dt>
          <dd className="text-gray-700 sm:col-span-2">
            {user?.customer?.username}
          </dd>
        </div>

        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Title</dt>
          <dd className="text-gray-700 sm:col-span-2">Mr</dd>
        </div>

        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">First Name</dt>
          <dd className="text-gray-700 sm:col-span-2">
            {user?.customer?.first_name}
          </dd>
        </div>

        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Last Name</dt>
          <dd className="text-gray-700 sm:col-span-2">
            {user?.customer?.last_name}
          </dd>
        </div>

        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Email</dt>
          <dd className="text-gray-700 sm:col-span-2">
            {user?.customer?.email}
          </dd>
        </div>

        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Bio</dt>
          <dd className="text-gray-700 sm:col-span-2"></dd>
        </div>
      </dl>
    </div>
  );
}
