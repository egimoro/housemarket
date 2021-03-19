import { Component, OnInit } from '@angular/core';

import {Seller} from '../seller';
import { SellerService } from '../seller.service';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.scss']
})
export class SellersComponent implements OnInit {

  sellers: Seller[];

  constructor(private sellerService: SellerService) { }

  ngOnInit() {
    this.getSellers();
  }

  getSellers(): void{
    this.sellerService.getSellers().subscribe(
      sellers => this.sellers = sellers
    );
  }

  add(name: string, contact: string): void{
    name = name.trim();
    contact = contact.trim();

    if (!name) {return; }
    if (!contact) { return;}
    this.sellerService.addSeller({name, contact} as Seller).subscribe(
      seller => {
        this.sellers.push(seller);
      }
    );
  }

  delete(seller: Seller): void{
    this.sellers = this.sellers.filter(s => s !== seller);
    this.sellerService.deleteSeller(seller).subscribe();
  }

}
