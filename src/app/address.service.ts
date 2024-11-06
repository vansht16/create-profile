import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = 'http://localhost:3000/api/profiles'; // Use the new /profiles endpoint

  constructor(private http: HttpClient) {}

  // Method to save a new profile (address)
  saveAddress(profile: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, profile);
  }

  // Method to fetch profiles (addresses)
  getAddresses(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
