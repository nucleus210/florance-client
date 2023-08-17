import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/shared/environments/environment';

@Component({
  selector: 'app-checkout-component',
  templateUrl: './checkout-component.component.html',
  styleUrls: ['./checkout-component.component.css']
})
export class CheckoutComponentComponent implements OnInit {
  ngOnInit(): void {
    
  }

 // We load  Stripe
 stripePromise = loadStripe(environment.stripe);
 constructor(private http: HttpClient) {}

 async pay(): Promise<void> {
   // here we create a payment object
   const payment = {
     name: 'Iphone',
     currency: 'usd',
     // amount on cents *10 => to be on dollar
     amount: 99900,
     quantity: '1',
     cancelUrl: 'http://localhost:4200/cancel',
     successUrl: 'http://localhost:4200/success',
   };

   const stripe = await this.stripePromise;

   // this is a normal http calls for a backend api
   this.http
     .post(`${environment.serverUrl}/payment`, payment)
     .subscribe((data: any) => {
       // I use stripe to redirect To Checkout page of Stripe platform
      //  stripe.redirectToCheckout({
      //    sessionId: data.id,
      //  });
     });
 }
}
function loadStripe(stripe: string) {
  throw new Error('Function not implemented.');
}
