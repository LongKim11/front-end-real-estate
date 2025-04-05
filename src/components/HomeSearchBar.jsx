import React, { useState } from 'react';

export const HomeSearchBar = () => {
    const [query, setQuery] = useState({
        type: 'buy',
        location: '',
        minPrice: 0,
        maxPrice: 0
    });

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', query);
        // Here you would typically handle the search logic or API call
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setQuery({ ...query, [name]: value });
    };

    const handleTabChange = (type) => {
        setQuery({ ...query, type });
    };

    return (
        <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-lg border bg-white shadow-lg">
            {/* Tabs */}
            <div className="flex border-b">
                <button
                    className={`px-8 py-3 text-sm font-medium transition-colors duration-200 ${
                        query.type === 'buy'
                            ? 'bg-black text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => handleTabChange('buy')}
                >
                    Buy
                </button>
                <button
                    className={`px-8 py-3 text-sm font-medium transition-colors duration-200 ${
                        query.type === 'rent'
                            ? 'bg-black text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => handleTabChange('rent')}
                >
                    Rent
                </button>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row">
                <div className="flex flex-1 flex-col bg-gray-100 md:flex-row">
                    {/* Location Input */}
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="City, Location"
                            className="w-full bg-transparent px-4 py-3 outline-none"
                            value={query.location}
                            name="location"
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Min Price Input */}
                    <div className="flex-1 border-b border-gray-200 md:border-r md:border-b-0">
                        <input
                            type="number"
                            placeholder="Min Price"
                            className="w-full bg-transparent px-4 py-3 outline-none"
                            min={0}
                            max={1000000}
                            value={query.minPrice}
                            name="minPrice"
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Max Price Input */}
                    <div className="flex-1">
                        <input
                            type="number"
                            placeholder="Max Price"
                            className="w-full bg-transparent px-4 py-3 outline-none"
                            min={0}
                            max={1000000}
                            value={query.maxPrice}
                            name="maxPrice"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                {/* Search Button */}
                <button
                    type="submit"
                    className="flex items-center justify-center bg-amber-400 p-3 text-white transition-colors duration-200 hover:bg-amber-500 md:p-4"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </button>
            </form>
        </div>
    );
};
