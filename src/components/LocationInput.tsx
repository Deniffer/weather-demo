import React, { useState, useMemo, useCallback } from "react";
import Fuse from "fuse.js";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandItem } from "./ui/command";
import { usStates } from "../usStates";

interface LocationInputProps {
  onLocationChange: (location: string) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({ onLocationChange }) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  // 创建 Fuse 实例
  const fuse = useMemo(() => {
    const locations = usStates.flatMap((state) =>
      state.cities.map((city) => `${city}, ${state.name}`)
    );
    console.log("locations:", locations);
    return new Fuse(locations, {
      threshold: 1,
      distance: 100,
      minMatchCharLength: 2,
    });
  }, []);

  // 使用 Fuse 进行搜索
  const getMatches = useCallback(
    (query: string) => {
      if (query.length < 2) return [];
      const searchResults = fuse.search(query);
      console.log("searchResults:", searchResults);
      return searchResults.slice(0, 10).map((result) => result.item);
    },
    [fuse]
  );

  const [matches, setMatches] = useState<string[]>([]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    const newMatches = getMatches(value);
    console.log("newMatches:", newMatches);
    setMatches(newMatches);
    setOpen(value.length >= 2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onLocationChange(inputValue.trim());
      setOpen(false);
    }
  };

  const handleSelectCity = (location: string) => {
    setInputValue(location);
    onLocationChange(location);
    setOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 relative">
      <div className="flex gap-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Enter US city or state"
              className="bg-white text-gray-900 placeholder-gray-500"
            />
          </PopoverTrigger>
          <PopoverContent className="p-0 w-[300px]" align="start">
            <Command>
              <CommandEmpty>No location found.</CommandEmpty>
              <CommandGroup>
                {/* {matches.map((location, index) => (
                  <CommandItem
                    key={index}
                    onSelect={() => handleSelectCity(location)}
                  >
                    {location}
                  </CommandItem>
                ))} */}
                {matches}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <Button type="submit" size="lg">
          Search
        </Button>
      </div>
    </form>
  );
};

export default LocationInput;
