import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {
  api1="http://localhost:3000/emp/";
  constructor(private http:HttpClient) { }
  putValues(data,id){
   return this.http.put(this.api1+id,data)
  }
  getData(){
    return this.http.get(this.api1)
  }
}
