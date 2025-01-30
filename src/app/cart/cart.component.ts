import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";
import { ICreateOrderRequest, IPayPalConfig, NgxPayPalModule } from 'ngx-paypal';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, NgxPayPalModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  public payPalConfig?: IPayPalConfig;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
      this.initPayPalConfig(); // Initialize PayPal config with updated total
    });
  }

  removeCartItem(id: number) {
    this.cartService.removeCartItem(id);
    this.calculateTotal();
    this.initPayPalConfig();
  }

  updateQuantity(item: CartItem, event: any) {
    const quantity = parseInt(event.target.value, 10);
    this.cartService.updateQuantity(item.id, quantity);
    this.calculateTotal();
    this.initPayPalConfig();
  }

  incrementQuantity(item: CartItem) {
    this.cartService.updateQuantity(item.id, item.quantity + 1);
    this.calculateTotal();
    this.initPayPalConfig();
  }

  decrementQuantity(item: CartItem) {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.id, item.quantity - 1);
      this.calculateTotal();
      this.initPayPalConfig();
    }
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  private initPayPalConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'AZfTUf7M2bFKr6TC4yteGfZLxjYfpXYagUABVFQRvhQgW0phhbLbYnA3NdUmshXsj1nLhmR1crKQV8Wx',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: this.totalPrice.toFixed(2), // Use dynamic cart total
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: this.totalPrice.toFixed(2)
                }
              }
            },
            items: this.cartItems.map(item => ({
              name: item.name,
              quantity: item.quantity.toString(),
              unit_amount: {
                currency_code: 'USD',
                value: item.price.toFixed(2),
              }
            }))
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        layout: 'vertical',
        color: 'blue',
        label: 'paypal'
      },
      onApprove: (data, actions) => {
        actions.order.capture().then((details: any) => {
          console.log('Transaction completed successfully:', details);
          alert('Payment successful!');
          this.cartService.clearCart(); // Clear cart after successful payment
        });
      },
      onClientAuthorization: (data) => {
        console.log('Client authorization successful:', data);
      },
      onCancel: (data) => {
        console.log('Transaction canceled:', data);
      },
      onError: (err) => {
        console.log('Error during payment:', err);
      },
      onClick: () => {
        console.log('PayPal button clicked');
      }
    };
  }
}
