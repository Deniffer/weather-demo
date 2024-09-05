import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./ui/command";
import { getCityMatches } from "../services/weatherApi";

interface LocationInputProps {
  onLocationChange: (location: string) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({ onLocationChange }) => {
  const [inputValue, setInputValue] = useState("");
  const [matches, setMatches] = useState<Array<{ name: string; country: string; state?: string }>>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchMatches = async () => {
      if (inputValue.length >= 3) {
        const cityMatches = await getCityMatches(inputValue);
        setMatches(cityMatches);
        setOpen(true);
      } else {
        setMatches([]);
        setOpen(false);
      }
    };

    const debounceTimer = setTimeout(fetchMatches, 300);
    return () => clearTimeout(debounceTimer);
  }, [inputValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onLocationChange(inputValue.trim());
      setOpen(false);
    }
  };

  const handleSelectCity = (city: { name: string; country: string; state?: string }) => {
    const location = `${city.name}, ${city.state ? `${city.state}, ` : ''}${city.country}`;
    setInputValue(location);
    onLocationChange(location);
    setOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 relative">
      <div className="flex gap-8">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter city name or zip code"
              className="bg-white text-gray-900 placeholder-gray-500"
            />
          </PopoverTrigger>
          <PopoverContent className="p-0" align="start">
            <Command>
              <CommandInput placeholder="Search city..." />
              <CommandEmpty>No city found.</CommandEmpty>
              <CommandGroup>
                {matches.map((city, index) => (
                  <CommandItem
                    key={index}
                    onSelect={() => handleSelectCity(city)}
                  >
                    {city.name}, {city.state ? `${city.state}, ` : ''}{city.country}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <Button type="submit" size="lg">Search</Button>
      </div>
    </form>
  );
};

export default LocationInput;
