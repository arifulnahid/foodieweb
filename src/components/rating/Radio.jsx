import React, { useState } from "react";

export default function FormElementsRadioPrimary() {
  const [selectedOption, setSelectedOption] = useState("");

  const onValueChange = (e) => {
    // setSelectedOption(e.target.value);
    setSelectedOption(e);
  };

  return (
    <>
      {/*<!-- Component: Primary checkboxes --> */}
      <fieldset className="flex gap-10">
        <legend className="mb-6 text-slate-500">Primary radio group:</legend>
        <div className="flex items-center">
          <input
            className="hidden peer cursor-pointer"
            type="radio"
            value="⭐"
            id="1"
            name="1"
            checked={selectedOption.length >= 1}
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
            onChange={onValueChange}
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
      {/*<!-- End Primary checkboxes --> */}
    </>
  );
}
