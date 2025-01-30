import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CartItem } from './cart/cart.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(product: any) { //product:Product
    const currentCart = this.cartItemsSubject.value;
    const existingItem = currentCart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      currentCart.push({ ...product, quantity: 1 });
    }

    this.cartItemsSubject.next([...currentCart]); // Important: Create a new array
  }

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  clearCart() {
    this.cartItemsSubject.next([]);
  }

  removeCartItem(id: number) {
    const currentCart = this.cartItemsSubject.value;
    const updatedCart = currentCart.filter(item => item.id !== id);
    this.cartItemsSubject.next(updatedCart);
  }

  updateQuantity(id: number, quantity: number) {
    const currentCart = this.cartItemsSubject.value;
    const itemIndex = currentCart.findIndex(item => item.id === id);
    if (itemIndex !== -1 && quantity > 0) {
      currentCart[itemIndex].quantity = quantity;
      this.cartItemsSubject.next([...currentCart]);
    } else if (quantity <= 0) {
      this.removeCartItem(id);
    }
  }
}
