import React, { ChangeEvent } from "react";
import { ValidationRule, UseFormMethods } from "react-hook-form";

interface Props extends Partial<Pick<UseFormMethods, "register" | "errors">> {
  rules?: ValidationRule;
  label: String;
  type: String;
  id: String;
  handleChange: (e: ChangeEvent) => void;
}

function Input({
  label,
  type,
  id,
  handleChange,
  rules = {},
  register,
  errors = {},
}: Props) {
  return (
    <div className="form-group">
      <label>
        {label}
        <input
          className="form-control"
          {...register("businessName", { required: true, minLength: 3 })}
          onChange={handleChange}
        />
      </label>
      {errors.businessName && (
        <div>Business Name is required to be at least 3 characters long</div>
      )}
    </div>
  );
}

export default Input;
