import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Property } from '../property';
import {PropertyService} from '../property.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {

  property: Property;

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getProperty();
  }

  getProperty(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.propertyService.getProperty(id).subscribe(
      property => this.property = property
    )
  }

  goback(): void{
    this.location.back();
  }

  save(): void {
    this.propertyService.updateProperty(this.property).subscribe(
      () => this.goback()
    );
  }

}
