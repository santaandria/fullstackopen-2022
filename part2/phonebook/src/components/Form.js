import React from "react";

const FormGroup = ({ label, onChange, value }) => {
  return (
    <div>
      {label}:{" "}
      <input value={value} name={label.toLowerCase()} onChange={onChange} />
    </div>
  );
};

const Form = ({ onSubmit, onChange, fieldObject }) => {
  return (
    <form onSubmit={onSubmit}>
      <FormGroup label="Name" onChange={onChange} value={fieldObject.name} />
      <FormGroup
        label="Number"
        onChange={onChange}
        value={fieldObject.number}
      />
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default Form;
