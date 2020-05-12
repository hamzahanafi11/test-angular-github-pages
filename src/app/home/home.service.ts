import { ApiService } from './../@core/api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private _apiUrl = '/secure/user';

  constructor(private apiService: ApiService, private http: HttpClient) {}

  getAllUsers() {
    const url = environment.serverUrl + this._apiUrl;
    return this.apiService.get(url);
  }
}
