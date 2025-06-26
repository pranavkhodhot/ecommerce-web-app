import { Component } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [CommonModule, RouterModule]
})
export class NavbarComponent {
  cartOpen = false;
  navOpen = false;
  constructor(public cartService: CartService) {}

  toggleCart() {
    this.cartOpen = !this.cartOpen;
  }

  get cartItems(): CartItem[] {
    return this.cartService.getCart();
  }

  get totalItems(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  get TotalPrice(): string {
    const total = this.cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    return total.toFixed(2);
}

  increase(item: CartItem) {
    this.cartService.updateQuantity(item.product.product_id, 1);
  }

  decrease(item: CartItem) {
    this.cartService.updateQuantity(item.product.product_id, -1);
  }
}
