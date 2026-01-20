// This is an Integration test

import { it, expect, describe, vi, beforeEach } from 'vitest'; //vi lets us create a mock (a fake function that doesnt do anything)
import { render, screen } from '@testing-library/react'; //render: renders a component in a fake webpage(for testing), screen: lets us check the fake webpage
import userEvent from '@testing-library/user-event'; // userEvent lets us simulate events(like clicking a button)
import axios from 'axios';
import { Product } from './Product';

vi.mock('axios'); //mocking the entire axios package lets us use a fake version of axios

describe('Product component', () => {
    let product;
    let loadCart;

    //This is a test hook, there are others like afterEach,beforeAll,afterAll
    //It means before each test run the code inside it
    beforeEach(()=>{
        product = {
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
                stars: 4.5,
                count: 87
            },
            priceCents: 1090,
            keywords: ["socks", "sports", "apparel"]
        };

        // This creates a mock (a fake function that doesnt do anything)
        // because we cant use the real loadCart() since it contacts the backend
        loadCart= vi.fn();
    });

    it('displays the product details correctly', () => {
        render(<Product product={product} loadCart ={loadCart} />);

        expect(
            screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
        ).toBeInTheDocument();

        expect(
            screen.getByText('$10.90')
        ).toBeInTheDocument();

        expect(
            screen.getByTestId('product-image')
        ).toHaveAttribute('src', 'images/products/athletic-cotton-socks-6-pairs.jpg');

        expect(
            screen.getByTestId('product-rating-stars')
        ).toHaveAttribute('src','images/ratings/rating-45.png');

        expect(
            screen.getByText('87')
        ).toBeInTheDocument();
    });

    it('adds a product to the cart', async ()=>{
        render(<Product product={product} loadCart ={loadCart} />);

        const user = userEvent.setup();

        const addToCartButton = screen.getByTestId('add-to-cart-button');
        await user.click(addToCartButton);

        //even though mocks dont do anything, we can still make sure we called them and gave them the correct values
        expect(axios.post).toHaveBeenCalledWith(
            '/api/cart-items',
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1
            }
        );

        expect(loadCart).toHaveBeenCalled();

    });
});

