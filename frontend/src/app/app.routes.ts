import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProductComponent } from './pages/product/product.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';



export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'product/:id', component: ProductComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'browse', component: BrowseComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'orders/:id', component: OrderDetailsComponent },


];
