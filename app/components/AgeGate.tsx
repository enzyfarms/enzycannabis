"use client"

import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AgeGate = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const ageConfirmed = Cookies.get('ageConfirmed');
    if (ageConfirmed !== 'true') {
      setIsVisible(true);
    }
  }, []);

  const handleConfirm = () => {
    Cookies.set('ageConfirmed', 'true', { expires: 7 }); // Cookie expires in 7 days
    setIsVisible(false);
  };

  const handleReject = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black flex justify-center items-center z-50">
      <div className="p-4 rounded-lg text-center">
        <h2 className="text-zinc-100">Are you over 21 years of age?</h2>
        <div className="flex justify-center gap-4 mt-4">
          <button
            className="px-6 py-2 border border-purple-700 text-purple-500 rounded hover:bg-purple-700 hover:text-zinc-100 transition duration-300"
            style={{ minWidth: '120px' }}
            onClick={handleConfirm}
          >
            Yes
          </button>
          <button
            className="px-6 py-2 border border-orange-700 text-orange-700 rounded hover:bg-orange-700 hover:text-zinc-100 transition duration-300"
            style={{ minWidth: '120px' }}
            onClick={handleReject}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );  
};

export default AgeGate;
