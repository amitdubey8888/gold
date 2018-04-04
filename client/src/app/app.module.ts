import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DropdownModule } from "ng2-dropdown";
import { LoadersCssModule } from 'angular2-loaders-css';

/* Services */
import { CommonService } from './providers/common.service';
import { ApiService } from './providers/api.service';
import { UserService } from './providers/user.service';
import { CountryService } from './providers/country.service';
/* Guards */
import {AuthGuard} from './guards/auth.guard';

/* Routings */
import { AppRoutingModule } from './app.routing';

/* Pages */
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BuyComponent } from './pages/buy/buy.component';
import { HeaderComponent } from './pages/header/header.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { FooterComponent } from './pages/footer/footer.component';
import { DescriptionComponent } from './pages/description/description.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SaleComponent } from './pages/sale/sale.component';
import { RunescapeComponent } from './pages/runescape/runescape.component';
import { FaqComponent } from './pages/faq/faq.component';
import { BulkorderComponent } from './pages/bulkorder/bulkorder.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BuyComponent,
    HeaderComponent,
    CartComponent,
    CheckoutComponent,
    FooterComponent,
    DescriptionComponent,
    ProfileComponent,
    SaleComponent,
    RunescapeComponent,
    FaqComponent,
    BulkorderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,    
    FormsModule, 
    DropdownModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LoadersCssModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [
    CommonService,
    ApiService,
    UserService,
    AuthGuard,
    CountryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
