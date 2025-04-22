'use client'

import Image from 'next/image';
import React, { useState } from 'react';
import { BsInstagram, BsSpotify, BsTwitter } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';

const PersonalLinks = () => {
  const links = [
    {
      title: "Class Schedule",
      url: "#",
      thumbnail: "https://via.placeholder.com/60",
    },
    {
      title: "Hurricane Relief ",
      url: "#",
      thumbnail: "https://via.placeholder.com/60",
    },
    {
      title: "House of the Dragon",
      url: "#",
      thumbnail: "https://via.placeholder.com/60",
    },
    {
      title: "Game of Thrones Podcast",
      url: "#",
      thumbnail: "https://via.placeholder.com/60",
    },
    {
      title: "Would You Rather ",
      url: "#",
      thumbnail: "https://via.placeholder.com/60",
    },
  ];

  const containerStyle: React.CSSProperties = {
    backgroundColor: '#FFB347', // orange
    minHeight: '100vh',
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
  };

  const profileImgStyle = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    border: '4px solid white',
    objectFit: 'cover',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
  };

  const linkBoxStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '400px',
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  };

  const linkStyle = {
    padding: '16px',
    borderRadius: '26px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // ✅ ADD THIS
    textDecoration: 'none',
    color: 'black',
    backgroundColor: 'white',
    textAlign: 'center',
    transition: 'transform 0.2s ease, background-color 0.2s ease',
  };
  

  // const thumbnailStyle = {
  //   width: '48px',
  //   height: '48px',
  //   borderRadius: '8px',
  //   objectFit: 'cover',
  //   marginRight: '16px',
  //   flexShrink: 0,
  // };

  const hoverStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    transform: 'scale(1.02)',
  };

  const social: React.CSSProperties = {
    color: "white",
    display: "flex",
    flexDirection: "row",
    gap: '24px',
    marginTop: "20px"
  };

  const [hovered, setHovered] = useState<number | null>(null);

const iconStyle = (index: number): React.CSSProperties => ({
    color: hovered === index ? 'gray' : 'white',
    cursor: 'pointer',
    transition: 'color 0.3s'
});

  return (
    <div style={containerStyle}>
      <Image src="/profile-pic.png" alt="Profile" style={profileImgStyle as React.CSSProperties} width={100} height={100}/>
      <h1 style={{ marginTop: 16, fontSize: 24, fontWeight: 'bold' }}>@johndoe</h1>
      <p style={{ marginTop: 4, color: '#f0f0f0', fontSize: 14 }}>
        Fitness Coach | Creator | Motivator
      </p>

      <div style={linkBoxStyle}>
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle as React.CSSProperties}
            onMouseEnter={e => Object.assign(e.currentTarget.style, hoverStyle)}
            onMouseLeave={e => Object.assign(e.currentTarget.style, linkStyle)}
          >
            {/* {link.thumbnail && (
              <img src={link.thumbnail} alt="" style={thumbnailStyle} />
            )} */}
            <span style={{ fontSize: 14, fontWeight: 500, textAlign: 'center' }}>{link.title}</span>
          </a>
        ))}
      </div>
      <div style={social}>
        <BsTwitter
          size={28}
          style={iconStyle(0)}
          onMouseEnter={() => setHovered(0)}
          onMouseLeave={() => setHovered(null)}
        />
        <FaFacebook
          size={28}
          style={iconStyle(1)}
          onMouseEnter={() => setHovered(1)}
          onMouseLeave={() => setHovered(null)}
        />
        <BsInstagram
          size={28}
          style={iconStyle(2)}
          onMouseEnter={() => setHovered(2)}
          onMouseLeave={() => setHovered(null)}
        />
        <BsSpotify
          size={28}
          style={iconStyle(3)}
          onMouseEnter={() => setHovered(3)}
          onMouseLeave={() => setHovered(null)}
        />
      </div>
    </div>
  );
};

export default PersonalLinks;
