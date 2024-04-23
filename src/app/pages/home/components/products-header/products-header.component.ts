import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: "./products-header.component.html" ,
  styles: [
  ]
})
export class ProductsHeaderComponent implements OnInit {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();

  sortByMenu: any =  true;
  menu: any = true;
  desc = 'desc';
  itemsShowCount  = 12;

  constructor() { }

  ngOnInit(): void {
  }

  onDescUpdated(newDesc: string): void {
    this.desc = newDesc;
    this.sortChange.emit(newDesc);
  }

  onItemsUpDated(count: number): void{
    this.itemsShowCount = count;
    this.itemsCountChange.emit(count);
  }

  onColumnsUpDated(colsNum: number): void{
    this.columnsCountChange.emit(colsNum);
  }

}
