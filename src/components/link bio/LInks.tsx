/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useRef, useEffect } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { RxDragHandleDots2 } from "react-icons/rx";
import { FaYoutubeSquare, FaInstagram, FaTiktok, FaFacebookSquare, FaTwitterSquare } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { RiLetterSpacing2 } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import HeaderLink from './HeaderLink';
import LinkModal from './link_modal/LinkModal';

const ITEM_TYPE = 'SOCIAL_MEDIA';

const initialSocialMediaData = [
  {
    id: 1,
    name: "YouTube",
    icon: <FaYoutubeSquare className="text-red-500 rounded-lg" size={30} />,
    bgColor: "bg-white",
  },
  {
    id: 2,
    name: "Instagram",
    icon: <FaInstagram className="text-pink-500 rounded-lg" size={30} />,
    bgColor: "bg-white",
  },
  {
    id: 3,
    name: "TikTok",
    icon: <FaTiktok className="text-black rounded-lg" size={30} />,
    bgColor: "bg-white",
  },
  {
    id: 4,
    name: "Facebook",
    icon: <FaFacebookSquare className="text-blue-600 rounded-lg" size={30} />,
    bgColor: "bg-white",
  },
  {
    id: 5,
    name: "Twitter",
    icon: <FaTwitterSquare className="text-blue-400 rounded-lg" size={30} />,
    bgColor: "bg-white",
  },
];

const LInks = () => {
  const [socialMediaData, setSocialMediaData] = useState(initialSocialMediaData);
  const [toggles, setToggles] = useState<{ [key: number]: boolean }>({});
  const [modals, setModals] = useState<{ [key: number]: boolean }>({});
  const dotsRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const [showAdd, setShowAdd]=useState<boolean>(false);

  // Close the modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.keys(dotsRefs.current).forEach((key) => {
        const ref = dotsRefs.current[Number(key)];
        if (ref && !ref.contains(event.target as Node)) {
          setModals((prev) => ({ ...prev, [key]: false }));
        }
      });
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleSwitch = (id: number) => {
    setToggles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleModal = (id: number) => {
    setModals((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const updatedData = [...socialMediaData];
    const [draggedItem] = updatedData.splice(dragIndex, 1);
    updatedData.splice(hoverIndex, 0, draggedItem);
    setSocialMediaData(updatedData);
  };

  const onClose=()=>{
    setShowAdd(false);
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div className='md:w-[50vw] xl:w-[70vw] max-w-[700px]'>
          <button
            onClick={() => setShowAdd(true)}
            className="bg-gray-800 font-semibold w-full rounded py-3 lg:w-[500px] xl:w-[70vw] max-w-[700px] text-white"
          >
            +Add Block
          </button>
        </div>

        <div>
            <HeaderLink />
        </div>

        <div>
          <LinkModal isOpen={showAdd} onClose={onClose}/>
        </div>

        <div>
          {socialMediaData.map((social, index) => (
            <DraggableCard
              key={social.id}
              index={index}
              social={social}
              moveCard={moveCard}
              toggleSwitch={toggleSwitch}
              toggleModal={toggleModal}
              toggles={toggles}
              modals={modals}
              dotsRefs={dotsRefs}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

const DraggableCard = ({ social, index, moveCard, toggleSwitch, toggleModal, toggles, modals, dotsRefs }: any) => {
  const [, ref] = useDrop({
    accept: ITEM_TYPE,
    hover: (item: any) => {
      if (item.index !== index) {
        moveCard(item.index, index);
        item.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { id: social.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;

  return (
   <>
   
    <div
      ref={(node) => {
        drag(ref(node));
      }}
      style={{ opacity }}
      className={`flex gap-4 ${social.bgColor} rounded-2xl py-4 px-8 md:w-[50vw] xl:w-[70vw] max-w-[700px] mt-5 justify-between items-center w-full`}
    >
      <div className="flex gap-4">
        <RxDragHandleDots2 className="font-bold" size={30} />
        {social.icon}
        <p className="font-bold text-lg">{social.name}</p>
      </div>
      <div className="flex items-center gap-4 relative">
        {/* Toggle Switch */}
        <div
          onClick={() => toggleSwitch(social.id)}
          className={`w-10 h-5 flex items-center rounded-full cursor-pointer ${
            toggles[social.id] ? 'bg-green-500' : 'bg-gray-300'
          }`}
        >
          <div
            className={`w-4 h-4 bg-white rounded-full shadow-md transform duration-300 ${
              toggles[social.id] ? 'translate-x-5' : 'translate-x-0'
            }`}
          ></div>
        </div>

        {/* Dots Menu */}
        <div
          ref={(el) => {
            dotsRefs.current[social.id] = el;
          }}
          className="relative"
        >
          <BsThreeDots
            className="cursor-pointer"
            onClick={() => toggleModal(social.id)}
          />
          {modals[social.id] && (
            <div className="bg-white w-fit px-10 py-4 flex flex-col gap-2 absolute right-0 top-6 shadow-lg rounded-lg z-10">
              <p className="flex gap-3 justify-start items-center hover:text-blue-600 text-gray-800 cursor-pointer">
                <MdModeEdit /> Edit
              </p>
              <p className="flex gap-3 justify-start items-center hover:text-blue-600 text-gray-800 cursor-pointer">
                <RiLetterSpacing2 /> Rename
              </p>
              <div className="w-full h-[1px] px-4 bg-gray-600"></div>
              <p className="flex gap-3 justify-start items-center hover:text-red-600 text-red-500 cursor-pointer">
                <MdDelete /> Delete
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default LInks;