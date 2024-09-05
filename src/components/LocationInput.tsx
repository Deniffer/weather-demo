import React, { useState } from 'react';
import { Input } from './ui/input';
import { cn } from '../lib/utils';

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
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter city name or zip code"
          className={cn(
            "flex-grow rounded-r-none",
            "bg-white bg-opacity-20 backdrop-blur-lg",
            "text-white placeholder-gray-300",
            "border-white border-opacity-30",
            "focus:ring-white"
          )}
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