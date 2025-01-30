import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartService } from '../cart.service';
import { CartItem } from '../cart/cart.component';
interface Product {
  name: string;
  imageUrl: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-product-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-popup.component.html',
  styleUrl: './product-popup.component.scss'
})
export class ProductPopupComponent {
  @Input() product: Product | null = null;
  @Output() closePopup = new EventEmitter<void>();
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) { // Inject the service
    this.cartService.cartItems$.subscribe(items => this.cartItems = items);
  }
  handleClose() {
    this.closePopup.emit();
  }
  addToCart(product: any) { //Product
    this.cartService.addToCart(product);
    this.closePopup.emit();
  }
}
