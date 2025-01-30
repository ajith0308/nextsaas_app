import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { ProductPopupComponent } from "../product-popup/product-popup.component";
import { CartItem } from '../cart/cart.component';
import { CartService } from '../cart.service';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ProductPopupComponent, FormsModule],
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss'] // ✅ Fixed `styleUrls` (plural)
})
export class LandingpageComponent implements OnInit { // ✅ Implement OnInit

  products: Product[] = [];
  selectedProduct: Product | null = null;
  cartItems: CartItem[] = [];
  filteredProducts: Product[] = []; // ✅ Ensure filteredProducts is initialized
  searchTerm: string = '';

  constructor(private cartService: CartService, private productService: ProductService) { 
    this.cartService.cartItems$.subscribe(items => this.cartItems = items);
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.filterProducts(); // ✅ Ensure initial product filtering
    });
  }

  openProductPopup(product: Product) {
    this.selectedProduct = product;
  }

  closeProductPopup() {
    this.selectedProduct = null;
  }

  addToCart(product: Product) { // ✅ Use correct Product type
    this.cartService.addToCart(product);
    this.closeProductPopup(); // Close the popup after adding
  }

  filterProducts() {
    if (!this.searchTerm.trim()) { // ✅ Avoid filtering on empty spaces
      this.filteredProducts = [...this.products]; // Show all products
    } else {
      const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.description.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
  }

  receiveSearchTerm(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.filterProducts();
  }
}
