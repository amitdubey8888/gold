import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { HomeComponent } from './pages/home/home.component';
import { BuyComponent } from './pages/buy/buy.component';
import { SaleComponent } from './pages/sale/sale.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RunescapeComponent } from './pages/runescape/runescape.component';
import { FaqComponent } from './pages/faq/faq.component';
import { BulkorderComponent } from './pages/bulkorder/bulkorder.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'buy', component: BuyComponent },
  { path: 'sale', component: SaleComponent },
  { path: 'cart', component: CartComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'profile', component: ProfileComponent },
  { path: 'runescape', component: RunescapeComponent },
  { path: 'faq', component: FaqComponent},
  { path: 'bulkorder', component: BulkorderComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
