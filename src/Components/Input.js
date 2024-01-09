import React from "react";
import { forwardRef } from "react";

const Input= function ({label,type ,setInput ,setBlur,value}) {
  return (
    <div>
      <p className="font-semibold">{label}</p>

      {
        type!="textarea" ? (
          <input onChange={(e)=> setBlur ? setInput(type,e.target.value) : setInput(e.target.value) } 
          value={value}
         onBlur={()=>setBlur && setBlur(type)} className="border w-[100%] focus:outline-0 px-2 py-1" type={type}></input>

        ) : (<textarea className="w-[100%]  focus:outline-0 border" rows="4"></textarea>)
      }
    

      
    </div>
  );
}

export default Input;
