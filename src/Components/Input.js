import React from "react";


const Input = function ({
  label,
  type,
  setInput,
  setBlur,
  value,
  styles,
  placeholder,
}) {
  return (
    <div className="w-[100%]">
      <p className="font-semibold">{label}</p>

      <input
        onChange={(e) =>
          setBlur ? setInput(type, e.target.value) : setInput(e.target.value)
        }
        value={value}
        onBlur={() => setBlur && setBlur(type)}
        placeholder={placeholder ? placeholder : ""}
        className={`${styles ? styles : ""} border  focus:outline-0 px-2 py-1`}
        type={type}
      ></input>
    </div>
  );
};

export default Input;
