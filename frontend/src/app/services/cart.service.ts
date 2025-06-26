import { Injectable } from '@angular/core';
import { Product } from '../models/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartKey = 'cart';

  getCart(): CartItem[] {
    return JSON.parse(localStorage.getItem(this.cartKey) || '[]');
  }

  saveCart(cart: CartItem[]) {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  addToCart(product: Product, quantity: number = 1) {
    const cart = this.getCart();
    const index = cart.findIndex(item => item.product.product_id === product.product_id);

    if (index > -1) {
      cart[index].quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }

    this.saveCart(cart);
  }

  updateQuantity(productId: number, change: number) {
    const cart = this.getCart();
    const index = cart.findIndex(item => item.product.product_id === productId);

    if (index > -1) {
      cart[index].quantity += change;
      if (cart[index].quantity <= 0) {
        cart.splice(index, 1); // remove item
      }
      this.saveCart(cart);
    }
  }

  clearCart() {
    localStorage.removeItem(this.cartKey);
  }
}
