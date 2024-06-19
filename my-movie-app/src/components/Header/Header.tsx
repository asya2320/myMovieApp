import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
    return (
        <div className="header-cards__wrapper">
            <h1 className="header-cards__title">CinemaOnline</h1>
            <nav className="header-cards__nav">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <span className="header-cards__link">Главная страница</span>
                </Link>
                <Link to="/favourites" style={{ textDecoration: 'none' }}>
                    <span className="header-cards__link">Избранное</span>
                </Link>
            </nav>
        </div>
    );
};

export default Header;
