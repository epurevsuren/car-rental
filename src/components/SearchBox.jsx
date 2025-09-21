import { useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext';

const SearchBox = () => {
  const {
    cars,
    searchTerm,
    setSearchTerm,
    suggestions,
    filters,
    setFilters,
  } = useContext(AppContext);

  const uniqueBrands = useMemo(() => [...new Set(cars.map(car => car.brand))], [cars]);
  const uniqueTypes = useMemo(() => [...new Set(cars.map(car => car.carType))], [cars]);

  return (
    <div className="w-full max-w-6xl mx-auto mb-4">
      <div className="flex gap-2 items-start">
        {/* Search Input */}
        <div className="relative flex-grow">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by type, brand, model, or description"
            className="w-full border border-gray-300 p-2 rounded"
          />
          {searchTerm && suggestions.length > 0 && (
            <ul className="absolute bg-white border mt-1 w-full shadow rounded z-10 max-h-64 overflow-y-auto">
              {suggestions.map((s, i) => {
                const keyword = s.toLowerCase();
                const matchingCar = cars.find(car =>
                  car.brand.toLowerCase() === keyword
                );

                const hasBrandIcon = matchingCar !== undefined;
                const brandFile = matchingCar?.brand.toLowerCase();
                const brandExt = brandFile === 'toyota' ? 'jpeg' : 'png'; // dynamic if needed

                return (
                  <li
                    key={i}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => {
                      setSearchTerm(s);
                    }}
                  >
                    {/* Dynamic brand logo or default search icon */}
                    {hasBrandIcon ? (
                      <img
                        src={`/icons/${brandFile}.${brandExt}`}
                        alt={s}
                        className="w-5 h-5"
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    )}
                    <span className="text-gray-700 font-medium">{s}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Type Filter */}
        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="">All Types</option>
          {uniqueTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        {/* Brand Filter */}
        <select
          value={filters.brand}
          onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="">All Brands</option>
          {uniqueBrands.map((brand) => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchBox;
