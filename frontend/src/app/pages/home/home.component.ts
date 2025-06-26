import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.services';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/products';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, RouterModule], // ✅ register here
})
export class HomeComponent implements OnInit {
  heroImageUrl = './assets/hero-banner2.jpg';
  products: Product[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getFeaturedProducts().subscribe({
      next: (data) => {
        // Convert price from string to number for each product
        this.products = data.map((product) => ({
          ...product,
          price: parseFloat(product.price as unknown as string),
        }));
      },
      error: (err) => console.error('Error fetching products:', err),
    });
  }
}