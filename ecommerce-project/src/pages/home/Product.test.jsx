// This is an Integration test

import { it, expect, describe, vi } from 'vitest'; //vi lets us create a mock
import { render, screen } from '@testing-library/react'; //render: renders a component in a fake webpage(for testing), screen: lets us check the fake webpage
import { Product } from './Product';

describe('Product component', () => {
    it('displays the product details correctly', () => {
        const product = {
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
        const loadCart = vi.fn(); 

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
});

