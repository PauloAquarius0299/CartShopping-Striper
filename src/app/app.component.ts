import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Cart } from './models/cart.model';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit{
  cart: Cart = {items: []};

  constructor(private CartService: CartService) {}

  ngOnInit() {
      this.CartService.cart.subscribe((_cart) => {
        this.cart = _cart
      });
  }
}
