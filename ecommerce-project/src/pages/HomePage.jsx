import axios from 'axios'; //cleaner way to make requests to the backend
import {useEffect, useState} from 'react';
import { Header } from '../components/Header';
import './HomePage.css'

// Backend stores the data(normaly on a different computer) so the user's computer doesnt have to store all the
// products on their computer(It fetches only the products it needs to display)

// This also helps when adding an item to the cart, so when the user uses a different computer, the cart would
// still have the items inside

export function HomePage() {
    const [products, setProducts] = useState([]);

    useEffect(()=>{   //the <StrictMode> in main.jsx makes useEffect run twice
        axios.get('http://localhost:3000/api/products')      //this is an easier way instead of fetch .. .then response.json().then
        .then((response)=>{
            setProducts(response.data); 
        });
    }, []);
    

    return (
        <>
            <title>Ecommerce Project</title>

            <Header />

            <div className="home-page">
                <div className="products-grid">
                    {products.map((product) => {
                        return (
                            <div key={product.id} className="product-container">
                                <div className="product-image-container">
                                    <img className="product-image"
                                        src={product.image} />
                                </div>

                                <div className="product-name limit-text-to-2-lines">
                                    {product.name}
                                </div>

                                <div className="product-rating-container">
                                    <img className="product-rating-stars"
                                        src={`images/ratings/rating-${product.rating.stars * 10}.png`} />
                                    <div className="product-rating-count link-primary">
                                        {product.rating.count}
                                    </div>
                                </div>

                                <div className="product-price">
                                    ${(product.priceCents / 100).toFixed(2)}
                                </div>

                                <div className="product-quantity-container">
                                    <select>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                </div>

                                <div className="product-spacer"></div>

                                <div className="added-to-cart">
                                    <img src="images/icons/checkmark.png" />
                                    Added
                                </div>

                                <button className="add-to-cart-button button-primary">
                                    Add to Cart
                                </button>
                            </div>
                        );
                    })}
                   
                </div>
            </div>
        </>
    );
}