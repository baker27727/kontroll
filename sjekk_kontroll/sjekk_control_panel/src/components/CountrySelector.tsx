import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import countriesData from '../constants/countries';

export interface Country {
  id: number;
  alpha2: string;
  alpha3: string;
  name: string;
  rank?: number;
}

const countries: Country[] = countriesData.sort((a, b) => (b.rank ?? 0) - (a.rank ?? 0));

interface CountrySelectorProps {
  onSelect: (country: Country) => void;
}

export default function CountrySelector({ onSelect } : CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(
    countries.find((country) => country.alpha2 === 'no')
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const filtered = countries.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [searchTerm]);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearchTerm('');
    onSelect(country);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full mx-auto font-sans">
      <div className="relative" ref={dropdownRef}>
        <button
          type="button" // Explicitly set button type to "button"
          onClick={toggleDropdown}
          className="w-full p-2 text-left bg-white border border-gray-300 rounded outline-none transition-all duration-300 ease-in-out"
        >
          {selectedCountry ? (
            <div className="flex items-center">
              <img
                src={`/assets/flags/${selectedCountry.alpha2}.png`}
                alt={`${selectedCountry.name} flag`}
                className="w-6 h-4 mr-3 object-cover"
              />
              <span>{selectedCountry.name}</span>
            </div>
          ) : (
            <span className="text-gray-500">Select a country</span>
          )}
          <ChevronDown
            size={20}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        {isOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded shadow overflow-hidden transition-all duration-300 ease-in-out">
            <div className="p-2 border-b border-gray-200">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search countries..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none"
                />
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto custom-scroll">
              {filteredCountries.map((country) => (
                <button
                  key={country.id}
                  type="button" // Explicitly set button type to "button"
                  onClick={() => handleCountrySelect(country)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition-colors duration-200 flex items-center"
                >
                  <img
                    src={`/assets/flags/${country.alpha2}.png`}
                    alt={`${country.name} flag`}
                    className="w-6 h-4 mr-3 object-cover"
                  />
                  <span>{country.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}