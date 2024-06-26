import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import {StoreService} from 'src/app/services/store.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-filters',
  templateUrl: "./filters.component.html" 
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>();
  categories: Array<string> | undefined;
  categoriesSubscription: Subscription | undefined

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.categoriesSubscription = this.storeService
    .getAllCategories()
    .subscribe((response: Array<string>) => {
      this.categories = response;
    });
  }

  onShowCategory(category: string): void {
    this.showCategory.next(category);
  }

  ngOnDestroy(): void{
    if(this.categoriesSubscription){
      this.categoriesSubscription.unsubscribe();
    }
  }

}
