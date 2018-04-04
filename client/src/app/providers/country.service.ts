import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CountryService {
    constructor (private http: Http) {}
    getComments(id: any): Observable<Comment[]> {
        return this.http.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + id)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}

// <input type="text" name="pincode" class="form-control" (keyup)="onKey($event)" [ngModel]="pincode">
// <input type="text" name="state" class="form-control" value="{{state}}" [ngModel]="state">
// <input type="text" name="country" class="form-control" value="{{country}}" [ngModel]="country">

// onKey(event: any) {
//     this.countryService.getComments(event.target.value)
//     .subscribe(
//       country_name => this.country_name = country_name,
//         err => {
//             console.log(err);
//       });
//     // this.state = this.country_name.results[0].address_components[1].long_name;
//     // this.country = this.country_name.results[0].address_components[2].long_name;
// }