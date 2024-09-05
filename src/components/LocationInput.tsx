import React, { useState } from 'react';

interface LocationInputProps {
  onLocationChange: (location: string) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({ onLocationChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onLocationChange(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter city name or zip code"
          className="flex-grow px-4 py-2 bg-white bg-opacity-20 backdrop-blur-lg text-white placeholder-gray-300 border border-white border-opacity-30 rounded-l focus:outline-none focus:ring-2 focus:ring-white"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-r transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default LocationInput;