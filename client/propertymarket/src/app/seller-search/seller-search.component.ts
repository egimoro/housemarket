import { Component, OnInit } from '@angular/core';

import { from, Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Seller } from '../seller';
import  { SellerService } from '../seller.service'


@Component({
  selector: 'app-seller-search',
  templateUrl: './seller-search.component.html',
  styleUrls: ['./seller-search.component.scss']
})
export class SellerSearchComponent implements OnInit {

  sellers$: Observable<Seller[]>;
  private searchTerms = new Subject<string>();

  constructor(private sellerService: SellerService) { }

  search(term: string): void{
    this.searchTerms.next(term);
  }

  ngOnInit(): void {

    this.sellers$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),

      switchMap((term: string) => this.sellerService.searchSellers(term)),
    )
  }

}
