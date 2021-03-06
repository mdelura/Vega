import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { PhotoService } from '../../services/photo.service';
import { ProgressService } from '../../services/progress.service';
import { ToastrService } from 'ngx-toastr';
import { BrowserXhr } from '@angular/http';
import { CustomBrowserXhrService } from '../../services/custom-browser-xhr.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css'],
  providers: [
    { provide: BrowserXhr, useClass: CustomBrowserXhrService },
    ProgressService
  ]
})
export class ViewVehicleComponent implements OnInit {
  vehicle: any;
  vehicleId: number;
  photos: any[];
  @ViewChild('fileInput') fileInput: ElementRef;
  progress: any;

  constructor(
    private zone: NgZone,
    private router: Router,
    private vehicleService: VehicleService,
    private photoService: PhotoService,
    route: ActivatedRoute,
    private spinnerService: Ng4LoadingSpinnerService,
    private progressService: ProgressService,
    private auth: AuthService,
    private toastrService: ToastrService) {
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
    this.progressService.startTracking()
    .subscribe(progress => {
      console.log(progress);
      this.zone.run(() => this.progress = progress);
    },
    null,
    () => this.progress = null);

    const nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    const file = nativeElement.files[0];
    nativeElement.value = '';
    this.photoService.upload(this.vehicleId, file)
      .subscribe(photo => this.photos.push(photo),
      err => this.toastrService.error(err.text(), 'Error', { timeOut: 5000 }));
  }
}
