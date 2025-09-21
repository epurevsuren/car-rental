import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const CarCard = ({ car }) => {
  const navigate = useNavigate();
  const { setSelectedCar } = useContext(AppContext);

const handleRent = async () => {
    try {
      const confirmedOrders = JSON.parse(localStorage.getItem('confirmedOrders') || '[]');
      const reservedVINs = confirmedOrders.map(order => order.car.vin);

      // Validate availability from localStorage
      if (reservedVINs.includes(car.vin) || !car.available) {
        alert('Sorry, this car is no longer available. Please choose another one.');
        return;
      }

      setSelectedCar(car);
      localStorage.setItem('selectedCar', JSON.stringify(car));
      navigate('/reservation');
    } catch (err) {
      console.error('Availability check failed:', err);
      alert('Could not verify availability. Please try again.');
    }
  };


  return (
    <div className="border rounded-2xl p-4 shadow-md bg-white hover:shadow-lg transition-all duration-300">
      <img
        src={car.image}
        alt={car.carModel}
        className="w-full h-96 object-cover rounded-lg mb-3"
      />
      <h2 className="text-xl font-semibold">{car.brand} {car.carModel}</h2>
      <p className="text-sm text-gray-500">{car.yearOfManufacture} • {car.mileage} • {car.fuelType}</p>
      <p className="text-green-600 font-bold text-lg">${car.pricePerDay}/day</p>
      <p className="text-sm text-gray-600">{car.description}</p>
      <button
        onClick={handleRent}
        disabled={!car.available}
        className={`mt-3 w-full py-2 px-4 rounded-lg text-white font-medium ${
          car.available ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Rent
      </button>
    </div>

  );
};

export default CarCard;
