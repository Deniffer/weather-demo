import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

interface LocationInputProps {
  onLocationChange: (location: string) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({ onLocationChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onLocationChange(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-8">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter city name or zip code"
        />
        <Button type="submit" size="lg">Search</Button>
      </div>
    </form>
  );
};

export default LocationInput;
