import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent {

  products: Product[] = [];

  selectedProduct: Product | null = null;
  cartItems: CartItem[] = [];
  filteredProducts: Product[] = []; // Array for filtered products
  searchTerm: string = '';
  constructor(private cartService: CartService, private productService: ProductService) { // Inject the service
    this.cartService.cartItems$.subscribe(items => this.cartItems = items);
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.filterProducts(); // Initial filtering (shows all products)
    });
  }


  openProductPopup(product: Product) {
    this.selectedProduct = product;
  }

  closeProductPopup() {
    this.selectedProduct = null;
  }
  addToCart(product: any) { //Product
    this.cartService.addToCart(product);
    this.closeProductPopup(); // Close the popup after adding
  }



  filterProducts() {
    if (!this.searchTerm) { // If search term is empty
      this.filteredProducts = [...this.products]; // Show all products
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
  receiveSearchTerm(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.filterProducts();
  }
}
