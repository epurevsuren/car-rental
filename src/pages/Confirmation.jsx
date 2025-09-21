import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

const checkCarAvailability = async (carId, startDate, rentalDays) => {
  try {
    const response = await fetch(`/api/orders`);
    const orders = await response.json();

    const requestedStart = new Date(startDate);
    const requestedEnd = new Date(requestedStart);
    requestedEnd.setDate(requestedEnd.getDate() + rentalDays);

    const isAvailable = !orders.some(order => {
      if (order.car.id !== carId) return false;

      const orderStart = new Date(order.rental.startDate);
      const orderEnd = new Date(orderStart);
      orderEnd.setDate(orderEnd.getDate() + order.rental.rentalPeriod);

      return (
        (requestedStart >= orderStart && requestedStart < orderEnd) ||
        (requestedEnd > orderStart && requestedEnd <= orderEnd) ||
        (requestedStart <= orderStart && requestedEnd >= orderEnd)
      );
    });

    return isAvailable;
  } catch (error) {
    console.error('Error checking availability:', error);
    return false;
  }
};

const Confirmation = () => {
  const [confirmed, setConfirmed] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('reservationData'));
    const car = JSON.parse(localStorage.getItem('selectedCar'));

    if (data && car) {
      processReservation(data, car);
    } else {
      setMessage('No reservation data found.');
    }
  }, []);

  const processReservation = async (data, car) => {
    try {
      const isAvailable = await checkCarAvailability(car.id, data.startDate, parseInt(data.rentalDays));

      if (!isAvailable) {
        setMessage('Reservation failed: The car is no longer available.');
        return;
      }

      const order = {
        customer: {
          name: data.name,
          phoneNumber: data.phone,
          email: data.email,
          driversLicenseNumber: data.license,
        },
        car: {
          id: car.id,
          brand: car.brand,
          carModel: car.carModel,
        },
        rental: {
          startDate: data.startDate,
          rentalPeriod: parseInt(data.rentalDays),
          totalPrice: parseInt(data.rentalDays) * car.pricePerDay,
          orderDate: new Date().toISOString().split('T')[0],
        },
      };

      const response = await fetch(`/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });

      if (!response.ok) throw new Error('Failed to save reservation');

      await fetch(`/api/cars/${car.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ available: false }),
      });

      localStorage.removeItem('reservationData');
      localStorage.removeItem('selectedCar');
      localStorage.removeItem('reservationForm'); // Clear saved form data
      setConfirmed(order);
      setMessage('Your reservation is confirmed. Thank you!');
    } catch (error) {
      console.error('Error processing reservation:', error);
      setMessage('Reservation failed. Please try again later.');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-center bg-white rounded shadow">
      <div className="mb-4">
        <Logo />
      </div>
      <p className="text-lg font-semibold text-blue-700">{message}</p>

      {confirmed && (
        <div className="mt-6 text-left text-gray-700 space-y-3">
          <div>
            <h3 className="font-semibold">Car</h3>
            <p>{confirmed.car.brand} {confirmed.car.carModel}</p>
          </div>
          <div>
            <h3 className="font-semibold">Customer</h3>
            <p>Name: {confirmed.customer.name}</p>
            <p>Email: {confirmed.customer.email}</p>
            <p>Phone: {confirmed.customer.phoneNumber}</p>
            <p>License: {confirmed.customer.driversLicenseNumber}</p>
          </div>
          <div>
            <h3 className="font-semibold">Rental Info</h3>
            <p>Start Date: {confirmed.rental.startDate}</p>
            <p>Days: {confirmed.rental.rentalPeriod}</p>
            <p>Total Price: ${confirmed.rental.totalPrice}</p>
            <p>Booked On: {confirmed.rental.orderDate}</p>
          </div>
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
