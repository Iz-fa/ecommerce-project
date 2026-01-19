import axios from 'axios'; //cleaner way to make requests to the backend
import {useEffect, useState} from 'react';
import { Header } from '../../components/Header';
import {ProductsGrid} from './ProductsGrid';
import './HomePage.css'

// Backend stores the data(normaly on a different computer) so the user's computer doesnt have to store all the
// products on their computer(It fetches only the products it needs to display)

// This also helps when adding an item to the cart, so when the user uses a different computer, the cart would
// still have the items inside

export function HomePage({cart, loadCart}) {
    const [products, setProducts] = useState([]);
    
    
    useEffect(()=>{   
        //the <StrictMode> in main.jsx makes useEffect run twice

        //useEffect cannot return a promise(it only returns nothing or a cleanup function)
        //that is why we made a const being an async function and called that function

        const fetchHomeData = async ()=>{ 
            const response = await axios.get('/api/products');      
            setProducts(response.data); 
            
            //axios is an easier way instead of fetch .. .then response.json().then
        };

        fetchHomeData();
    }, []);
    

    return (        //The link bellow is the favicon(icon of the page)
        <>
            <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
            <title>Ecommerce Project</title>

            <Header cart ={cart}/>

            <div className="home-page">
                <ProductsGrid products = {products} loadCart = {loadCart}/>
            </div>
        </>
    );
}