import React, {
  forwardRef,
  InputHTMLAttributes,
  useMemo,
  useState,
} from "react";
import { Input } from "../ui/input";
import cities from "@/lib/cities-list";

interface LocationInputProps extends InputHTMLAttributes<HTMLInputElement> {
  // Add any additional props you need here
  onLocationSelected: (location: string) => void;
}

export default forwardRef<HTMLInputElement, LocationInputProps>(
  function LocationInput({ onLocationSelected, ...props }, ref) {
    const [locationSearch, setLocationSearch] = useState("");
    const [focus, setFocus] = useState(false);

    const filteredCities = useMemo(() => {
      if (locationSearch.trim().length > 0) {
        const searchWord = locationSearch.split("");
        const city = cities
          .map((city) => `${city.name}-${city.country}-${city.subcountry}`)
          .filter(
            (city) =>
              city
                .toLocaleLowerCase()
                .startsWith(searchWord[0].toLocaleLowerCase()) &&
              searchWord.every((word) =>
                city.toLocaleLowerCase().includes(word.toLocaleLowerCase()),
              ),
          )
          .slice(0, 6);

        return city;
      }
    }, [locationSearch]);

    return (
      <div className="relative">
        <Input
          maxLength={100}
          value={locationSearch}
          onChange={(e) =>
            e.target.value.length < 100 && setLocationSearch(e.target.value)
          }
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          placeholder="Search For Location"
          type="search"
          ref={ref}
          {...props}
        />
        {focus && locationSearch.trim() && (
          <div className="absolute left-0 top-[102%] z-40 w-full rounded-md border bg-background p-2 shadow-md">
            <p className="text-sm text-muted-foreground">
              Start typing to search for a location
            </p>
            {filteredCities?.length == 0 && (
              <p className="text-sm text-muted-foreground">No results found</p>
            )}
            {filteredCities?.map((city) => (
              <button
                className="w-full p-1.5 text-left text-sm text-secondary-foreground hover:bg-secondary/50"
                type="button"
                key={city}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setLocationSearch("");
                  onLocationSelected(city);
                }}
              >
                {city}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  },
);
