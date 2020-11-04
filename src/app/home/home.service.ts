import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  api = "http://localhost:3000/emp";
  constructor(private http:HttpClient) { } 
  getData(){
    return this.http.get(this.api)
  }
  postData(data){
    return this.http.post(this.api,data)
  }
}
