import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import IProduct from '../shared/interfaces/product';
import { ProductService } from '../services/product.service';
import { ResourceCollection } from '@lagoshny/ngx-hateoas-client';

@Component({
  selector: 'product-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  public products: IProduct[] | null = null;
  constructor(private reosurceService: ProductService) { }
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.reosurceService.getCollection().subscribe({
      next: (collection: ResourceCollection<IProduct>) => {
        const products: Array<IProduct> = collection.resources;
        console.log(collection);

        console.log(products);
        this.products = products;
      },
      error: (error: HttpErrorResponse) => { alert(error.message); }
    });
  }

}
