import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
})
export class BrowseComponent implements OnInit {
  categories: any[] = [];
  selectedCategoryId: number | null = null;

  priceRanges = [
    { label: 'All Prices', min: null, max: null },
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: 'Above $200', min: 200, max: null },
  ];
  selectedPriceRange = this.priceRanges[0];

  allProducts: any[] = [];
  filteredProducts: any[] = [];

  searchTerm = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchAllProducts();
  }

  fetchCategories() {
    this.http
      .get<any[]>('http://localhost:3000/api/categories')
      .subscribe((data) => {
        this.categories = data;
      });
  }

  fetchAllProducts() {
    this.http
      .get<any[]>('http://localhost:3000/api/products')
      .subscribe((data) => {
        this.allProducts = data;
        this.applyFilters();
      });
  }

  onCategoryChange() {
    if (
      String(this.selectedCategoryId) === 'null' ||
      this.selectedCategoryId === null
    ) {
      this.selectedCategoryId = null;
      this.fetchAllProducts();
    } else {
      this.http
        .get<any[]>(
          `http://localhost:3000/api/products/category/${this.selectedCategoryId}`
        )
        .subscribe((data) => {
          this.allProducts = data;
          this.applyFilters();
        });
    }
  }

  applyFilters() {
    this.filteredProducts = this.allProducts.filter((product) => {
      const matchesPrice =
        (!this.selectedPriceRange.min ||
          product.price >= this.selectedPriceRange.min) &&
        (!this.selectedPriceRange.max ||
          product.price <= this.selectedPriceRange.max);
      const matchesSearch = product.product_name
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());
      return matchesPrice && matchesSearch;
    });
  }

  hasActiveFilters(): boolean {
    return (
      (String(this.selectedCategoryId) !== 'null' &&
        this.selectedCategoryId !== null &&
        this.selectedPriceRange.label !== 'All Prices') ||
      this.searchTerm.trim() !== ''
    );
  }

  getCategoryName(id: number): string {
    const category = this.categories.find((cat) => cat.category_id === id);
    return category ? category.category_name : 'Unknown';
  }

  clearCategory() {
    this.selectedCategoryId = null;
    this.fetchAllProducts();
  }

  clearPrice() {
    this.selectedPriceRange = this.priceRanges[0];
    this.applyFilters();
  }

  clearSearch() {
    this.searchTerm = '';
    this.applyFilters();
  }

  onSearchChange() {
    this.applyFilters();
  }

  onPriceChange() {
    this.applyFilters();
  }
}
