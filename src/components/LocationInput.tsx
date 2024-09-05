import React, { useState, useEffect, useRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { getCityMatches } from "../services/weatherApi";

interface LocationInputProps {
  onLocationChange: (location: string) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({ onLocationChange }) => {
  const [inputValue, setInputValue] = useState("");
  const [matches, setMatches] = useState<Array<{ name: string; country: string; state?: string }>>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      if (inputValue.length >= 3) {
        const cityMatches = await getCityMatches(inputValue);
        setMatches(cityMatches);
        setShowDropdown(true);
      } else {
        setMatches([]);
        setShowDropdown(false);
      }
    };

    const debounceTimer = setTimeout(fetchMatches, 300);
    return () => clearTimeout(debounceTimer);
  }, [inputValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onLocationChange(inputValue.trim());
      setShowDropdown(false);
    }
  };

  const handleSelectCity = (city: { name: string; country: string; state?: string }) => {
    const location = `${city.name}, ${city.state ? `${city.state}, ` : ''}${city.country}`;
    setInputValue(location);
    onLocationChange(location);
    setShowDropdown(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 relative">
      <div className="flex gap-8">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter city name or zip code"
        />
        <Button type="submit" size="lg">Search</Button>
      </div>
      {showDropdown && matches.length > 0 && (
        <div ref={dropdownRef} className="absolute z-10 w-full bg-white mt-1 rounded-md shadow-lg">
          {matches.map((city, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectCity(city)}
            >
              {city.name}, {city.state ? `${city.state}, ` : ''}{city.country}
            </div>
          ))}
        </div>
      )}
    </form>
  );
};

export default LocationInput;
