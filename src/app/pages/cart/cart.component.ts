import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart.model'; 
import { Cart } from 'src/app/models/cart.model';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  cart: Cart = {items: [{
    product: 'https://via.placeholder.com/150',
    name: 'Nike',
    price: 150,
    quantity: 1,
    id: 1,
  },
  {
    product: 'https://via.placeholder.com/150',
    name: 'Nike',
    price: 150,
    quantity: 1,
    id: 2,
  }
]};

  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = ['product', 'name', 'price', 'quantity', 'total', 'action'];

  constructor(private cartService: CartService, private http: HttpClient) { }

  ngOnInit(): void {
    this.dataSource = this.cart.items;
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    }) 
  }
  getTotal(items: Array<CartItem>): number {
    return items.
    map((item) => item.price * item.quantity)
    .reduce((prev, current) => prev + current, 0)
  }

  onAddQuantity(item: CartItem): void{
    this.cartService.addToCart(item);
  }
  onRemoveFromCart(item: CartItem): void{
    this.cartService.removeFromCart(item);
  }
  onRemoveQuantity(item: CartItem): void{
    this.cartService.removeQuantity(item);
  }

  onCheckout(): void {
    this.http
      .post('http://localhost:4242/checkout', {
        items: this.cart.items,
      })
      .subscribe(async (res: any) => {
        let stripe = await loadStripe('pk_test_51P8nwcHb3SVNs9Qa5BHvADkrdEIz6iowsdWBbjLeMS0OfXa9SRKzdMqfWc2OKMaIX8jazf2UtqZs4JN79FcSHp4O00UuDWOX8L');
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });
  }

  onClearCart(): void{
    this.cartService.clearCart();
  }

}
