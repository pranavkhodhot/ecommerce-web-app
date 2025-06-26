import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  fullName = '';
  email = '';
  phone = '';
  address = '';

  ngOnInit() {
    const savedCart = localStorage.getItem('cart');
    this.cartItems = savedCart ? JSON.parse(savedCart) : [];
  }

  get total() {
    return this.cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  submitOrder() {
    if (!this.fullName || !this.email || !this.phone || !this.address) {
      alert('Please fill in all fields');
      return;
    }

    fetch('http://localhost:3000/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cart: this.cartItems,
        fullName: this.fullName,
        email: this.email,
        phone: this.phone,
        address: this.address,
      })
    })
    .then(res => {
      if (!res.ok) throw new Error('Checkout failed');
      alert('Order placed successfully!');
      localStorage.removeItem('cart');
    })
    .catch(err => {
      console.error(err);
      alert('Failed to place order');
    });
  }
}
