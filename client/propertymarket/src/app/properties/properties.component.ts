import { Component, OnInit } from '@angular/core';

import {Property} from '../property';
import {PropertyService} from '../property.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {
  properties: Property[];

  constructor(private propertyService: PropertyService) { }

  ngOnInit() {
    this.getProperties();
  }

  getProperties(): void{
    this.propertyService.getProperties().subscribe(
      properties => this.properties = properties
    )
  }

  add(suburb: string, rooms: number, price: number): void{

      suburb = suburb.trim();

      if (!suburb) {return; }
      if (!rooms) {return; }
      if (!price) {return; }
      this.propertyService.addProperty({suburb, rooms, price} as Property).subscribe(
        property => {
          this.properties.push(property);
        }
      );


  }

  delete(property: Property): void{
    this.properties = this.properties.filter(p => p !== property);
    this.propertyService.deleteProperty(property).subscribe();

  }

}
