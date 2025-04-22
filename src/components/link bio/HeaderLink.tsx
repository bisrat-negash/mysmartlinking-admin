'use client'

import React, { useState } from 'react';
import { BsPersonCircle } from "react-icons/bs";


const HeaderLink = () => {
  const [toggle, setToggle] = useState(false);

  const toggleSwitch = () => {
    setToggle((prev) => !prev);
  };

  return (
    <div className='bg-white w-full py-2 mt-5 px-10 flex justify-between items-center rounded-lg font-bold md:w-[50vw] xl:w-[70vw] max-w-[700px]'>
      <p className='flex items-center gap-2'><BsPersonCircle />Header</p>
      <div
        onClick={toggleSwitch}
        className={`w-10 h-5 flex items-center rounded-full cursor-pointer ${
          toggle ? 'bg-green-500' : 'bg-gray-300'
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow-md transform duration-300 ${
            toggle ? 'translate-x-5' : 'translate-x-0'
          }`}
        ></div>
      </div>
    </div>
  );
};

export default HeaderLink;