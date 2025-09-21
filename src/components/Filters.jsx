import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Filters = () => {
  const { filters, setFilters } = useContext(AppContext);

  return (
    <div className="flex space-x-4 justify-center mb-4">
      <select
        name="type"
        value={filters.type}
        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        className="border p-2 rounded"
      >
        <option value="">All Types</option>
        <option value="Sedan">Sedan</option>
        <option value="SUV">SUV</option>
        <option value="Coupe">Coupe</option>
      </select>
      <select
        name="brand"
        value={filters.brand}
        onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
        className="border p-2 rounded"
      >
        <option value="">All Brands</option>
        <option value="Toyota">Toyota</option>
        <option value="Honda">Honda</option>
        <option value="Ford">Ford</option>
      </select>
    </div>
  );
};

export default Filters;
