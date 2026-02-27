import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <div className="survey-logo">
      <Link to="/">
        <h1 className="app-title">
          <span className="blind">LOGO TEST</span>
        </h1>
      </Link>
    </div>
  );
};

export default Logo;
