import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../property.service';
import { Property } from '../property';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  properties: Property[] = [];

  constructor(private propertyService: PropertyService) { }

  ngOnInit() {
    this.getProperties();
  }

  getProperties(): void{
    this.propertyService.getProperties().subscribe(
      properties => this.properties = properties.slice()
    );
  }

}
