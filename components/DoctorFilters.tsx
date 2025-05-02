'use client';

import { useState } from 'react';

// Filter interface
export interface DoctorFilters {
    modeOfConsult: string[];
    experience: string[];
    fees: string[];
    city: string[];
}

// Custom checkbox component
const FilterCheckbox = ({
    id,
    label,
    checked,
    onChange
}: {
    id: string;
    label: string;
    checked: boolean;
    onChange: () => void
}) => {
    return (
        <div className="flex items-center mb-2">
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500"
            />
            <label htmlFor={id} className="ml-2 text-sm font-medium text-gray-700">
                {label}
            </label>
        </div>
    );
};

interface FiltersProps {
    filters: DoctorFilters;
    setFilters: React.Dispatch<React.SetStateAction<DoctorFilters>>;
    applyFilters: () => void;
}

export default function DoctorFilters({ filters, setFilters }: FiltersProps) {
    // Clear all filters
    const clearAllFilters = () => {
        setFilters({
            modeOfConsult: [],
            experience: [],
            fees: [],
            city: []
        });
    };

    // Toggle filter options
    const toggleFilter = (category: keyof DoctorFilters, value: string) => {
        setFilters(prev => {
            // Check if the value is already in the array
            if (prev[category].includes(value)) {
                // If it is, remove it
                return {
                    ...prev,
                    [category]: prev[category].filter(item => item !== value)
                };
            } else {
                // If it's not, add it
                return {
                    ...prev,
                    [category]: [...prev[category], value]
                };
            }
        });
    };

    const [showAllCities, setShowAllCities] = useState(false);

    const allCities = [
        'Hyderabad', 'Bangalore', 'Mumbai', 'Ahmedabad', 'Lucknow',
        'Chandigarh', 'Nagpur', 'Jaipur', 'Bhopal', 'Visakhapatnam',
        'Thiruvananthapuram', 'Indore'
    ];

    const visibleCities = showAllCities ? allCities : allCities.slice(0, 5);

    return (
        <div className="p-4 border rounded-lg shadow-sm bg-white">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button
                    onClick={clearAllFilters}
                    className="text-sm text-teal-600 hover:text-teal-800"
                >
                    Clear All
                </button>
            </div>

            {/* Mode of Consult */}
            <div className="mb-4">
                <h3 className="font-medium mb-2 text-gray-800">Mode of Consult</h3>
                <FilterCheckbox
                    id="hospital-visit"
                    label="Hospital Visit"
                    checked={filters.modeOfConsult.includes('Hospital Visit')}
                    onChange={() => toggleFilter('modeOfConsult', 'Hospital Visit')}
                />
                <FilterCheckbox
                    id="online-consult"
                    label="Online Consult"
                    checked={filters.modeOfConsult.includes('Online Consult')}
                    onChange={() => toggleFilter('modeOfConsult', 'Online Consult')}
                />
            </div>

            {/* Experience */}
            <div className="mb-4">
                <h3 className="font-medium mb-2 text-gray-800">Experience (In Years)</h3>
                <FilterCheckbox
                    id="exp-0-5"
                    label="0-5"
                    checked={filters.experience.includes('0-5')}
                    onChange={() => toggleFilter('experience', '0-5')}
                />
                <FilterCheckbox
                    id="exp-6-10"
                    label="6-10"
                    checked={filters.experience.includes('6-10')}
                    onChange={() => toggleFilter('experience', '6-10')}
                />
                <FilterCheckbox
                    id="exp-11-16"
                    label="11-16"
                    checked={filters.experience.includes('11-16')}
                    onChange={() => toggleFilter('experience', '11-16')}
                />
                <FilterCheckbox
                    id="exp-17-plus"
                    label="17+"
                    checked={filters.experience.includes('17+')}
                    onChange={() => toggleFilter('experience', '17+')}
                />
            </div>

            {/* Fees */}
            <div className="mb-4">
                <h3 className="font-medium mb-2 text-gray-800">Fees (In Rupees)</h3>
                <FilterCheckbox
                    id="fees-100-500"
                    label="100-500"
                    checked={filters.fees.includes('100-500')}
                    onChange={() => toggleFilter('fees', '100-500')}
                />
                <FilterCheckbox
                    id="fees-500-1000"
                    label="500-1000"
                    checked={filters.fees.includes('500-1000')}
                    onChange={() => toggleFilter('fees', '500-1000')}
                />
                <FilterCheckbox
                    id="fees-1000-plus"
                    label="1000+"
                    checked={filters.fees.includes('1000+')}
                    onChange={() => toggleFilter('fees', '1000+')}
                />
            </div>

            {/* City */}
            {/* <div className="mb-4">
                <h3 className="font-medium mb-2 text-gray-800">City</h3>
                <FilterCheckbox
                    id="city-hyderabad"
                    label="Hyderabad"
                    checked={filters.city.includes('Hyderabad')}
                    onChange={() => toggleFilter('city', 'Hyderabad')}
                />
                <FilterCheckbox
                    id="city-bangalore"
                    label="Bangalore"
                    checked={filters.city.includes('Bangalore')}
                    onChange={() => toggleFilter('city', 'Bangalore')}
                />
                <FilterCheckbox
                    id="city-mumbai"
                    label="Mumbai"
                    checked={filters.city.includes('Mumbai')}
                    onChange={() => toggleFilter('city', 'Mumbai')}
                />
                <FilterCheckbox
                    id="city-ahmedabad"
                    label="Ahmedabad"
                    checked={filters.city.includes('Ahmedabad')}
                    onChange={() => toggleFilter('city', 'Ahmedabad')}
                />
                <FilterCheckbox
                    id="city-lucknow"
                    label="Lucknow"
                    checked={filters.city.includes('Lucknow')}
                    onChange={() => toggleFilter('city', 'Lucknow')}
                />
                <FilterCheckbox
                    id="city-hyderabad"
                    label="Hyderabad"
                    checked={filters.city.includes('Hyderabad')}
                    onChange={() => toggleFilter('city', 'Hyderabad')}
                />
                <FilterCheckbox
                    id="city-chandigarh"
                    label="Chandigarh"
                    checked={filters.city.includes('Chandigarh')}
                    onChange={() => toggleFilter('city', 'Chandigarh')}
                />
                <FilterCheckbox
                    id="city-nagpur"
                    label="Nagpur"
                    checked={filters.city.includes('Nagpur')}
                    onChange={() => toggleFilter('city', 'Nagpur')}
                />
                <FilterCheckbox
                    id="city-jaipur"
                    label="Jaipur"
                    checked={filters.city.includes('Jaipur')}
                    onChange={() => toggleFilter('city', 'Jaipur')}
                />
                <FilterCheckbox
                    id="city-bhopal"
                    label="Bhopal"
                    checked={filters.city.includes('Bhopal')}
                    onChange={() => toggleFilter('city', 'Bhopal')}
                />
                <FilterCheckbox
                    id="city-visakhapatnam"
                    label="Visakhapatnam"
                    checked={filters.city.includes('Visakhapatnam')}
                    onChange={() => toggleFilter('city', 'Visakhapatnam')}
                />
                <FilterCheckbox
                    id="city-thiruvananthapuram"
                    label="Thiruvananthapuram"
                    checked={filters.city.includes('Thiruvananthapuram')}
                    onChange={() => toggleFilter('city', 'Thiruvananthapuram')}
                />
                <FilterCheckbox
                    id="city-indore"
                    label="Indore"
                    checked={filters.city.includes('Indore')}
                    onChange={() => toggleFilter('city', 'Indore')}
                />
            </div> */}

            <div className="mb-4">
                <h3 className="font-medium mb-2 text-gray-800">City</h3>
                {visibleCities.map((city) => (
                    <FilterCheckbox
                        key={city}
                        id={`city-${city.toLowerCase()}`}
                        label={city}
                        checked={filters.city.includes(city)}
                        onChange={() => toggleFilter('city', city)}
                    />
                ))}
                <button
                    type="button"
                    onClick={() => setShowAllCities(!showAllCities)}
                    className="mt-2 text-sm text-teal-600 hover:underline"
                >
                    {showAllCities ? 'Show Less' : 'Show More'}
                </button>
            </div>
            {/* Apply Filters Button */}
            {/* <button
                onClick={applyFilters}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md transition duration-200"
            >
                Apply Filters
            </button> */}
        </div>
    );
} 