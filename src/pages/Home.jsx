import Logo from '../components/Logo';
import SearchBox from '../components/SearchBox';
import CarGrid from '../components/CarGrid';
import ReservationIcon from '../components/ReservationIcon';

const Home = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Logo />
        <ReservationIcon />
      </div>
      <SearchBox />
      {/* <Filters /> ← remove or comment this out */}
      <CarGrid />
    </div>
  );
};

export default Home;
