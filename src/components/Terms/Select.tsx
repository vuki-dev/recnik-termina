import { useState } from "react";
import style from "./Select.module.css";
import { SelectProps } from "types/types";

export default function Select({ options, defOption, ...props }: SelectProps) {
  return (
    <div className={style.customSelect}>
      <select {...props}>
        {defOption && (
          <option value={defOption.value}>{defOption.label}</option>
        )}
        {options.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
