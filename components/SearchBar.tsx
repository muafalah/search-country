"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import {
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "./ui/input";

const SearchBar = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [dataCountries, setDataCountries] = useState([]);
  const [dataNotFound, setDataNotFound] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      setDataNotFound(false);
      if (inputValue.length > 0) {
        try {
          const res = await axios.get(
            `https://restcountries.com/v3.1/name/${inputValue}`
          );
          setDataCountries(res.data);
        } catch (error) {
          setDataCountries([]);
          setDataNotFound(true);
        }
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue]);

  return (
    <CommandPrimitive>
      <div className="relative flex items-center">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type any country name"
          className="w-[250px] md:w-[500px] h-[50px]"
        />
        <button className="absolute right-3">
          <Search color="grey" size={20} />
        </button>
      </div>
      <div className="mt-2 relative">
        {inputValue.length > 0 && (
          <div className="absolute top-0 z-10 w-full rounded-xl bg-stone-50 outline-none animate-in fade-in-0 zoom-in-95">
            <CommandList className="ring-1 ring-slate-200 rounded-lg">
              {dataCountries.length > 0 && (
                <CommandGroup>
                  {dataCountries.slice(0, 5).map((country: any, index) => (
                    <CommandItem
                      key={index}
                      value={country.name.official}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                      onSelect={() =>
                        router.push(
                          `/country?name=${country.name.official}&currency=${
                            Object.keys(country.currencies)[0]
                          }&callingCode=${country.idd.root.substring(1)}${
                            country.idd.suffixes[0]
                          }`
                        )
                      }
                      className="flex items-center gap-2 w-full pl-8 cursor-pointer"
                    >
                      {country.name.common}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              {dataNotFound && dataCountries.length === 0 && (
                <CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-sm text-red-500">
                  Data not found
                </CommandPrimitive.Empty>
              )}
            </CommandList>
          </div>
        )}
      </div>
    </CommandPrimitive>
  );
};

export default SearchBar;
