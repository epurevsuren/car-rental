import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [filters, setFilters] = useState({ type: '', brand: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const API_BASE = '/api';

  // Fetch cars and mark reserved ones unavailable
  useEffect(() => {
    fetch(`${API_BASE}/cars`)
      .then(res => res.json())
      .then(data => {
        const confirmedOrders = JSON.parse(localStorage.getItem('confirmedOrders') || '[]');
        const reservedVINs = confirmedOrders.map(order => order.car.vin);
        const updatedCars = data.map(car =>
          reservedVINs.includes(car.vin)
            ? { ...car, available: false }
            : car
        );
        setCars(updatedCars);
      })
      .catch(err => console.error('Failed to fetch cars:', err));
  }, []);

  // Fetch orders from backend
  useEffect(() => {
    fetch(`${API_BASE}/orders`)
      .then(res => res.json())
      .then(setOrders)
      .catch(err => console.error('Failed to fetch orders:', err));
  }, []);

  // Generate search suggestions from cars data
  useEffect(() => {
    const keywords = cars.flatMap(car => [
      car.brand,
      `${car.brand} ${car.carModel}`,
      car.carType,
      car.description,
    ]);
    const unique = [...new Set(keywords.map(k => k.toLowerCase()))];
    setSuggestions(
      unique.filter(k => k.includes(searchTerm.toLowerCase())).slice(0, 5)
    );
  }, [searchTerm, cars]);

  return (
    <AppContext.Provider value={{
      cars,
      setCars,
      orders,
      setOrders,
      selectedCar,
      setSelectedCar,
      filters,
      setFilters,
      searchTerm,
      setSearchTerm,
      suggestions
    }}>
      {children}
    </AppContext.Provider>
  );
};
