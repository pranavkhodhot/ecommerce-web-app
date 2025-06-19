import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/products';
import { ProductService } from '../../services/product.services';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule, RouterModule, NgFor],
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Error fetching products:', err)
    });
  }
}
