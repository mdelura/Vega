import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SaveVehicle } from '../models/save-vehicle';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';

@Injectable()
export class VehicleService {
  private readonly vehiclesEndpoint = '/api/vehicles';

  constructor(private http: Http, private authHttp: AuthHttp) { }

  getVehicle(id) {
    return this.http.get(`${this.vehiclesEndpoint}/${id}`)
      .map(res => res.json());
  }

  getMakes() {
    return this.http.get('/api/makes')
      .map(res => res.json());
  }

  getFeatures() {
    return this.http.get('api/features')
      .map(res => res.json());
  }

  create(vehicle) {
    return this.authHttp.post(this.vehiclesEndpoint, vehicle)
      .map(res => res.json());
  }

  update(vehicle: SaveVehicle) {
    return this.authHttp.put(`${this.vehiclesEndpoint}/${vehicle.id}`, vehicle)
      .map(res => res.json());
  }

  delete(id) {
    return this.authHttp.delete(`${this.vehiclesEndpoint}/${id}`)
      .map(res => res.json());
  }

  getVehicles(queryObj) {
    return this.http.get(`${this.vehiclesEndpoint}?${this.toQueryString(queryObj)}`)
      .map(res => res.json());
  }

  toQueryString(obj) {
    const parts = [];
    // tslint:disable-next-line:forin
    for (const property in obj) {
      const value = obj[property];
      if (value != null && value != undefined)
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
    }

    return parts.join('&');
  }
}
