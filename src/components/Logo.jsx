import { Link } from 'react-router-dom';

const Logo = () => (
  <Link to="/" className="flex items-center gap-2">
    <img src="/vite.svg" alt="Logo" className="h-8" />
    <span className="text-xl font-bold text-blue-600">Car Rental System</span>
  </Link>
);

export default Logo;
