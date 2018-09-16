import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: any[];
  models: any[];
  features: any[];
  vehicle: any = {
    features: [],
    contact : {}
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService) {
      route.params.subscribe(p => this.vehicle.id = +p['id']);
  }

  ngOnInit() {
    const sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures(),
    ];

    if (this.vehicle.id) {
      sources.push(this.vehicleService.getVehicle(this.vehicle.id));
    }

    Observable.forkJoin(sources).subscribe(data => {
      this.makes = data[0];
      this.features = data[1];
      if (this.vehicle.id) {
        this.vehicle = data[2];
      }
    }, err => {
      // tslint:disable-next-line:triple-equals
      if (err.status == 404) {
        this.router.navigate(['home']);
      }
    });

    // if (this.vehicle.id) {
    //   this.vehicleService.getVehicle(this.vehicle.id)
    //   .subscribe(v => this.vehicle = v, err => {
    //     // tslint:disable-next-line:triple-equals
    //     if (err.status == 404) {
    //       console.log(`Vehicle not found: ${this.vehicle.id}`);
    //       this.router.navigate(['home']);
    //     }
    //   });
    // }

    // this.vehicleService.getMakes().subscribe(makes => this.makes = makes);
    // this.vehicleService.getFeatures().subscribe(features => this.features = features);
  }

  onMakeChange() {
    // tslint:disable-next-line:triple-equals
    const selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
    delete this.vehicle.modelId;
  }

  onFeatureToggle(featureId, $event) {
    if ($event.target.checked) {
      this.vehicle.features.push(featureId);
    } else {
      const index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }

  submit() {
    this.vehicleService.create(this.vehicle)
      .subscribe(x => console.log(x));
  }
}
