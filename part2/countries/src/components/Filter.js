import React from "react";

const Filter = ({ label, inputValue, onChange }) => {
  return (
    <div>
      {label}: <input value={inputValue} onChange={onChange} />
    </div>
  );
};

export default Filter;
