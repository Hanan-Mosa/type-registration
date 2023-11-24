import React from "react";
import styles from "./select.module.scss";

const Select = (props) => {
  const { children, register, name, label, errors } = props;
  return (
    <label className={styles.select}>
      <span>{label}</span>
      <select {...register(name, { required: true })}>
        <option value="">--Select an option--</option>
        {children}
      </select>
      {errors[name] && <p>{errors[name].type}</p>}
    </label>
  );
};

export default Select;
