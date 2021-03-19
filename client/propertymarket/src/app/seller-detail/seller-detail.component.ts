import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location} from '@angular/common';

import { Seller } from '../seller';
import { SellerService } from '../seller.service';

@Component({
  selector: 'app-seller-detail',
  templateUrl: './seller-detail.component.html',
  styleUrls: ['./seller-detail.component.scss']
})
export class SellerDetailComponent implements OnInit {
  seller: Seller;

  constructor(
    private route: ActivatedRoute,
    private sellerService: SellerService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getSeller();
  }

  getSeller(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.sellerService.getSeller(id).subscribe(
      seller => this.seller = seller
    );
  }

  goBack(): void{
    this.location.back();
  }

  save(): void{
    this.sellerService.updateSeller(this.seller).subscribe(
      () => this.goBack()
    );
  }  

}
