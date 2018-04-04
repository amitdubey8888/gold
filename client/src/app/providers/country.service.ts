import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
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
