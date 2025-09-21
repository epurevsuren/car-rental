import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
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

const Reservation = () => {
  const [selectedCar, setSelectedCar] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    const car = JSON.parse(localStorage.getItem('selectedCar'));
    if (car) {
      setSelectedCar(car);
    }

    const savedForm = JSON.parse(localStorage.getItem('reservationForm') || '{}');
    Object.keys(savedForm).forEach(key => {
      setValue(key, savedForm[key]);
    });
  }, [setValue]);

  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem('reservationForm', JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data) => {
    const isAvailable = await checkCarAvailability(
      selectedCar.id,
      data.startDate,
      parseInt(data.rentalDays)
    );

    if (!isAvailable) {
      alert('This car is no longer available for the selected period. Please choose another car.');
      return;
    }

    localStorage.setItem('reservationData', JSON.stringify(data));
    localStorage.removeItem('reservationForm');
    window.location.href = '/confirmation';
  };

  if (!selectedCar) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        <div className="mb-4">
          <Logo />
        </div>
        Please select a car from the homepage.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
      <div className="mb-4">
        <Logo />
      </div>
      <h2 className="text-2xl font-bold mb-2">{selectedCar.brand} {selectedCar.carModel}</h2>
      <p className="text-gray-700 mb-4">{selectedCar.description}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <input
          {...register('name', { required: 'Name is required' })}
          placeholder="Name"
          className="w-full border p-2 rounded"
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}

        <input
          {...register('phone', {
            required: 'Phone number is required',
            pattern: {
              value: /^[\d+\-\s()]{7,20}$/,
              message: 'Invalid phone number format',
            },
          })}
          placeholder="Phone"
          className="w-full border p-2 rounded"
        />
        {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}

        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email address',
            },
          })}
          placeholder="Email"
          className="w-full border p-2 rounded"
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}

        <input
          {...register('license', { required: "Driver's license number is required" })}
          placeholder="Driver's License Number"
          className="w-full border p-2 rounded"
        />
        {errors.license && <p className="text-sm text-red-500">{errors.license.message}</p>}

        <input
          type="date"
          {...register('startDate', { required: 'Start date is required' })}
          className="w-full border p-2 rounded"
        />
        {errors.startDate && <p className="text-sm text-red-500">{errors.startDate.message}</p>}

        <input
          type="number"
          {...register('rentalDays', {
            required: 'Rental period is required',
            min: { value: 1, message: 'Minimum rental period is 1 day' },
          })}
          placeholder="Rental Days"
          className="w-full border p-2 rounded"
        />
        {errors.rentalDays && <p className="text-sm text-red-500">{errors.rentalDays.message}</p>}

        <div className="flex justify-between mt-4">
          <button
            type="submit"
            disabled={!isValid}
            className={`px-4 py-2 rounded text-white ${
              isValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 rounded bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Reservation;
