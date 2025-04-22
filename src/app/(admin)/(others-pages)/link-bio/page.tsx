'use client'

import MobileMockup from '@/components/device mockup/MobileMockup';
import LInks from '@/components/link bio/LInks';
import { EyeIcon } from '@/icons';
import React, { useState } from 'react';
import { IoMdArrowBack } from "react-icons/io";


const Page = () => {
  const [showMockup, setShowMockup] = useState(false);

  return (
    <div className="flex flex-wrap md:flex-nowrap gap-10 justify-between">
      {/* Left Section */}
      <div className={`${showMockup ? 'hidden md:block' : 'block'} w-full lg:w-auto`}>
        <div className="flex md:hidden gap-2 items-center border-[1px] rounded-2xl bg-white px-4 py-1 justify-end w-fit max-w-[200px] mb-2">
          <button
            onClick={() => setShowMockup(true)}
            className="flex items-center gap-2 text-gray-700 "
          >
            <EyeIcon /> View
          </button>
        </div>
        <LInks />
      </div>

      {/* Right Section (Mockup) */}
      <div className={`${showMockup ? 'block' : 'hidden md:block'} w-full lg:w-auto`}>
        <div>
          <button
            onClick={() => setShowMockup(false)}
            className="flex items-center gap-2 text-gray-700 md:hidden"
          >
            <IoMdArrowBack /> Back
          </button>
        </div>
        <MobileMockup />
      </div>
    </div>
  );
};

export default Page;