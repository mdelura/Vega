import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {
  vehicle: any;
  vehicleId: number;
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private router: Router,
    private vehicleService: VehicleService,
    private photoService: PhotoService,
    route: ActivatedRoute,
    private spinnerService: Ng4LoadingSpinnerService) {
      spinnerService.show();
      route.params.subscribe(p => {
        this.vehicleId = +p['id'];
        if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
          router.navigate(['/vehicles']);
          return;
        }
    });
  }

  ngOnInit() {
    this.vehicleService.getVehicle(this.vehicleId)
      .subscribe(
        v => {
          this.vehicle = v;
          this.spinnerService.hide();
        },
        err => {
          if (err.status == 404) {
            this.router.navigate(['/vehicles']);
            return;
          }
        }
      );
  }

  delete() {
    if (confirm('Are you sure?')) {
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(x => {
          this.router.navigate(['/vehicles']);
        });
    }
  }

  uploadPhoto() {
    const nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    this.photoService.upload(this.vehicleId, nativeElement.files[0])
      .subscribe(x => console.log(x));
  }
}
