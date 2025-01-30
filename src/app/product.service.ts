import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs'; // Import of and Observable

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [ // Hardcoded product data (for now)
    {
      id: 1,
      name: 'Product 1',
      description: 'This is the first product.',
      price: 19.99,
      imageUrl: '1.jpeg',
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'A great second product!',
      price: 29.99,
      imageUrl: '2.jpeg',
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'The third product in our line.',
      price: 39.99,
      imageUrl: '3.jpeg',
    },
    {
      id: 4,
      name: 'Product 4',
      description: 'Another fantastic product.',
      price: 49.99,
      imageUrl: '4.jpeg',
    },
    {
      id: 5,
      name: 'Product 5',
      description: 'The last product for now.',
      price: 59.99,
      imageUrl: '5.jpeg',
    },
  ];

  constructor() { }

  getProducts(): Observable<Product[]> {
    return of(this.products); // Returns an Observable of products
  }
}