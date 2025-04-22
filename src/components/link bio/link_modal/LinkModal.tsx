import React, { useState } from 'react';
import { BsFacebook, BsInstagram, BsSpotify, BsTiktok, BsTwitter, BsYoutube } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';

const LinkModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [url, setUrl] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setUrl(inputValue);

    // Validate URL using a regex
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*\/?$/;
    setIsValid(urlPattern.test(inputValue));
  };

  const handleAddClick = () => {
    if (isValid) {
      console.log('URL added:', url);
      setUrl(''); // Clear the input after adding
      setIsValid(false); // Reset the validation
      onClose(); // Close the modal
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
      <div className="bg-white w-full max-w-3xl p-5 rounded-lg shadow-lg mx-4 sm:mx-8 md:mx-12 lg:mx-16">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="p-2 text-red-500 hover:bg-red-500 hover:text-white rounded-full"
          >
            <FaTimes />
          </button>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-lg md:text-xl font-semibold pb-2">Enter URL</p>
          <div className="flex flex-col sm:flex-row gap-2 items-center w-full">
            <input
              type="text"
              placeholder="Enter URL"
              value={url}
              onChange={handleInputChange}
              className="bg-[#F6F7F5] h-[50px] w-full min-w-[250px] max-w-[500px] outline-none px-2 rounded-xl"
            />
            <button
              onClick={handleAddClick}
              disabled={!isValid}
              className={`px-6 sm:px-10 text-lg w-full sm:w-fit rounded-full py-2 ${
                isValid ? 'bg-blue-500 text-white cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Add
            </button>
          </div>
          <p className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif text-center py-5">
            Choose from these links
          </p>
          <div className="flex overflow-x-auto justify-start items-center w-full gap-6 sm:gap-10 h-[120px]">
            <div className="flex flex-col justify-center items-center min-w-[80px]">
              <BsYoutube className="text-red-600" size={40} />
              <p className="text-sm sm:text-base">YouTube</p>
            </div>
            <div className="flex flex-col justify-center items-center min-w-[80px]">
              <BsTwitter className="text-blue-600" size={40} />
              <p className="text-sm sm:text-base">Twitter</p>
            </div>
            <div className="flex flex-col justify-center items-center min-w-[80px]">
              <BsInstagram className="text-pink-600" size={40} />
              <p className="text-sm sm:text-base">Instagram</p>
            </div>
            <div className="flex flex-col justify-center items-center min-w-[80px]">
              <BsFacebook className="text-blue-700" size={40} />
              <p className="text-sm sm:text-base">Facebook</p>
            </div>
            <div className="flex flex-col justify-center items-center min-w-[80px]">
              <BsTiktok className="text-black" size={40} />
              <p className="text-sm sm:text-base">TikTok</p>
            </div>
            <div className="flex flex-col justify-center items-center min-w-[80px]">
              <BsSpotify className="text-green-600" size={40} />
              <p className="text-sm sm:text-base">Spotify</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkModal;