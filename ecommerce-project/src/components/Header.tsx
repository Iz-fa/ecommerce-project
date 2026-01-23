import { NavLink, useNavigate, useSearchParams } from 'react-router'; //go to another page without reloading
import { useState } from 'react';
import CartIcon from '../assets/images/icons/cart-icon.png';
import SearchIcon from '../assets/images/icons/search-icon.png';
import LogoWhite from '../assets/images/logo-white.png';
import MobileLogoWhite from '../assets/images/mobile-logo-white.png';
import './Header.css';

// In CSS having a space like this .header .orders-link
// means to look inside the class .header (not necesssarily direct children)
// But having no space like .orders-link.active
// means both classes should be in the same classname

// This is a type alias = works like a variable, but for types
// in this type alias we gave it the value of an object 
// This object has an array of objects {}[] in it called cart
// we then set what properties each object has and gave them each their types
type HeaderProps = {
    cart: {
        productId: string;
        quantity: number;
        deliveryOptionId: string;
    }[];
};

export function Header({ cart }: HeaderProps) {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    // I need to use a different variable name since "search"
    // is already being used below.
    const searchText = searchParams.get('search');

    // || '' is a shortcut. It means if searchText does not exist
    // it will use a default value of ''.
    const [search, setSearch] = useState(searchText || '');

    const updateSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const searchBar = () => {
        navigate(`/?search=${search}`);
    };

    let totalQuantity = 0;

    cart.forEach((cartItem) => {
        totalQuantity += cartItem.quantity;
    });

    return (
        <div className="header">
            <div className="left-section">
                <NavLink to="/" className="header-link">
                    <img className="logo"
                        src={LogoWhite} />
                    <img className="mobile-logo"
                        src={MobileLogoWhite} />
                </NavLink>
            </div>

            <div className="middle-section">
                <input className="search-bar" type="text" placeholder="Search"
                    value={search} onChange={updateSearchInput}
                />

                <button className="search-button" onClick={searchBar} >
                    <img className="search-icon" src={SearchIcon} />
                </button>
            </div>

            <div className="right-section">
                <NavLink className="orders-link header-link" to="/orders">

                    <span className="orders-text">Orders</span>
                </NavLink>

                <NavLink className="cart-link header-link" to="/checkout">
                    <img className="cart-icon" src={CartIcon} />
                    <div className="cart-quantity">{totalQuantity}</div>
                    <div className="cart-text">Cart</div>
                </NavLink>
            </div>
        </div>

    );
}