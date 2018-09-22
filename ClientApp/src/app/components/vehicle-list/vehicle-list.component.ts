import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../models/vehicle';
import { VehicleService } from '../../services/vehicle.service';
import { KeyValuePair } from '../../models/key-value-pair';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  private readonly PAGE_SIZE = 3;
  queryResult: any = {};
  makes: KeyValuePair[];
  queryObj: any = {
    pageSize: this.PAGE_SIZE
  };
  columns = [
    { title: 'Id' },
    { title: 'Contact Name', key: 'contactName', isSortable: true },
    { title: 'Make', key: 'make', isSortable: true },
    { title: 'Model', key: 'model', isSortable: true },
    { },
  ];

  constructor(private vehicleService: VehicleService,
    private spinnerService: Ng4LoadingSpinnerService) {
      spinnerService.show();
     }

  ngOnInit() {
    this.vehicleService.getMakes()
      .subscribe(makes => this.makes = makes);
    this.populateVehicles();
  }

  private populateVehicles() {
    this.vehicleService.getVehicles(this.queryObj)
      .subscribe(result => {
        this.queryResult = result;
        this.spinnerService.hide();
      });
  }

  onFilterChange() {
    this.queryObj.page = 1;
    this.populateVehicles();
  }

  resetFilter() {
    this.queryObj = {
      page: 1,
      pageSize: this.PAGE_SIZE
    };
    this.onFilterChange();
  }

  sortBy(columnName) {
    if (this.queryObj.sortBy === columnName) {
      this.queryObj.isSortAscending = !this.queryObj.isSortAscending;
    } else {
      this.queryObj.sortBy = columnName;
      this.queryObj.isSortAscending = true;
    }

    this.populateVehicles();
  }

  onPageChanged(page) {
    this.queryObj.page = page;
    this.populateVehicles();
  }
}
