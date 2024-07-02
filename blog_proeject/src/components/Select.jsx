/* eslint-disable react/prop-types */
import React, { useId } from "react";

// eslint-disable-next-line react/prop-types
function Select({ options, label, className = "", ...props }, ref) {
  const id = useId();

  return (
    <div className="w-full">
      {label && <label htmlFor={id} className=""></label>}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}>
        {/* here we will do optional mapping on this options  because here if the options is empty then the website willl for sure crash hence we willl do optional 
        mapping using question mark that if the thinsg is there then do the mapping else dont  */}
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
        {/* here we using the option as key only because the option is unique in itself */}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
