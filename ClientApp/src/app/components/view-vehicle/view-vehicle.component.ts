import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { PhotoService } from '../../services/photo.service';
import { ProgressService } from '../../services/progress.service';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {
  vehicle: any;
  vehicleId: number;
  photos: any[];
  @ViewChild('fileInput') fileInput: ElementRef;
  progress: any;

  constructor(
    private router: Router,
    private vehicleService: VehicleService,
    private photoService: PhotoService,
    route: ActivatedRoute,
    private spinnerService: Ng4LoadingSpinnerService,
    private progressService: ProgressService) {
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

    this.photoService.getPhotos(this.vehicleId)
        .subscribe(photos => this.photos = photos);
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

    this.progressService.uploadProgress
      .subscribe(progress => {
        console.log(progress);
        this.progress = progress;
      },
      null,
      () => this.progress = null);

    this.photoService.upload(this.vehicleId, nativeElement.files[0])
      .subscribe(photo => this.photos.push(photo));
  }
}
