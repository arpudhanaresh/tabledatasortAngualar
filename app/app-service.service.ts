import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AppServiceService {

constructor(private http: HttpClient) { 

   
}
// url = "http://127.0.0.1:8000/"
url = "https://apisortarpudha.herokuapp.com/"
getData(){

    return this.http.get(this.url); 
        
}
}
