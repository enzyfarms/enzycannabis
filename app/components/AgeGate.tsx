"use client"

import React, { useState, useEffect } from 'react';

const AgeGate = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const ageConfirmed = localStorage.getItem('ageConfirmed');
    if (ageConfirmed !== 'true') {
      setIsVisible(true);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem('ageConfirmed', 'true');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg text-center">
        <h2 className="text-lg mb-4">Age Confirmation</h2>
        <p>Are you over 21 years old?</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
          onClick={handleConfirm}
        >
          Yes, I am over 21
        </button>
      </div>
    </div>
  );
};

export default AgeGate;
