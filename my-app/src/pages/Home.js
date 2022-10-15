import logo from '../logo.svg';
import "../styles/Home.css";
import "../styles/Panels.css";

const Home = () => {
  return (
    <div className="flex-parent-element">
      <div className='flex-child-element'>
        <h1 className="home-title">
          Home
        </h1>
        <h2 className="home-header">
          Test
        </h2>
      </div>
      <div className='flex-child-element'>
        <img src={logo} className="logo" alt="logo" />
      </div>
    </div>
  );
};

export default Home;
