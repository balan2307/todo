import React from "react";
import { forwardRef } from "react";

const Input= function ({label,type ,setInput ,setBlur,value}) {
  return (
    <div>
      <p className="font-semibold">{label}</p>
      <input onChange={(e)=>setInput(type,e.target.value)} 
       value={value}
      onBlur={()=>setBlur(type)} className="border w-[100%] focus:outline-0 px-2 py-1" type={type}></input>
    </div>
  );
}

export default Input;
