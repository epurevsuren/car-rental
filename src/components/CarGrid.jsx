import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import CarCard from './CarCard';

const CarGrid = () => {
  const { cars, filters, searchTerm } = useContext(AppContext);

  const filteredCars = cars.filter(car => {
    const matchesType = filters.type ? car.carType === filters.type : true;
    const matchesBrand = filters.brand ? car.brand === filters.brand : true;
    const matchesSearch = searchTerm
      ? `${car.carType} ${car.brand} ${car.carModel} ${car.description}`.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesType && matchesBrand && matchesSearch;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {filteredCars.map(car => (
        <CarCard key={car.vin} car={car} />
      ))}
    </div>
  );
};

export default CarGrid;
