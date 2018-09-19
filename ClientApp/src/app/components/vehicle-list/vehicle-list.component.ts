import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../models/vehicle';
import { VehicleService } from '../../services/vehicle.service';
import { KeyValuePair } from '../../models/key-value-pair';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[];
  makes: KeyValuePair[];
  queryObj: any = {};
  columns = [
    { title: 'Id' },
    { title: 'Contact Name', key: 'contactName', isSortable: true },
    { title: 'Make', key: 'make', isSortable: true },
    { title: 'Model', key: 'model', isSortable: true },
    { },
  ];

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes()
      .subscribe(makes => this.makes = makes);
    this.populateVehicles();
  }

  private populateVehicles() {
    this.vehicleService.getVehicles(this.queryObj)
      .subscribe(vehicles => this.vehicles = vehicles);
  }

  onFilterChange() {
    this.populateVehicles();
  }

  resetFilter() {
    this.queryObj = {};
    this.onFilterChange();
  }

  sortBy(columnName) {
    if (this.queryObj.sortBy === columnName) {
      console.log(`flipping the sort of ${columnName} to ${!this.queryObj.isSortAscending}`);
      this.queryObj.isSortAscending = !this.queryObj.isSortAscending;
    } else {
      console.log(`sort by ${columnName}`);
      
      this.queryObj.sortBy = columnName;
      this.queryObj.isSortAscending = true;
    }

    this.populateVehicles();
  }
}
