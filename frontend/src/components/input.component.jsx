import React from 'react';
import {useState} from "react";

const InputBox = ({name, type, icon, id, value, placeholder, disable=false}) => {

  const [passwordVisibility, setpasswordVisibility] = useState(false);

  return (
    <div className='relative w-[100%] mb-4 '>
      <input
      name={name}
      // type={type == "password" ? passwordVisibility ? "text" : "password" : type}
      type={
        type === "password"
          ? passwordVisibility
            ? "text"
            : "password"
          : type === "email"
          ? "email"
          : type
      }
      placeholder={placeholder}
      defaultValue={value}
      id={id}
      disabled={disable}
      className="input-box"
      />
      <i className={"fi " + icon +  " input-icon"}></i>

      {
        type=="password" ?
        <i class={"fi fi-rr-eye" + ( !passwordVisibility ?"-crossed" :" ") + " input-icon left-[auto] right-4 cursor-pointer"}
        onClick={()=>setpasswordVisibility((val)=> !val)}></i>
        :" "
      }
    </div>
  )
}

export default InputBox; 