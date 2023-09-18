import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL:string = "http://localhost:1323"; 

  constructor(private http:HttpClient) { }

  //API GET ALL USERS
  getUser(){
    return this.http.get(`${this.URL}/users`).pipe(map((resp)=>resp));
  }
  
  //API GET ALL USERS WITH DEPARTMENT
  getUsersDpt(){
    return this.http.get(`${this.URL}/userDepartment`).pipe(map((resp)=>resp));
  }

  //API CREATE USER
  createUser(payload:any){
    return this.http.post(`${this.URL}/user`,payload).pipe(map((resp)=>resp));  
  }
  
  //GET USER BY NUMBER ID
  getUserByNumId(payload:any){
    return this.http.get(`${this.URL}/userByNumId/${payload}`).pipe(map((resp)=>resp));  
  }
  
  //API EDIT USER
  UpdateUser(id:number,payload:any){
    return this.http.put(`${this.URL}/user/${id}`,payload).pipe(map((resp)=>resp));  
  }

  //API DELETE USER
  deleteUserByid(payload:any){
    return this.http.delete(`${this.URL}/user/${payload}`).pipe(map((resp)=>resp));  
  }



  //API GET ALL CITIES
  getCities(){
    return this.http.get(`${this.URL}/city`).pipe(map((resp)=>{resp}));
  }

  //API GET ALL DEPARTMENTS
  getDepartments(){
    return this.http.get(`${this.URL}/departments`).pipe(map((resp)=> resp ));
  }

  //GET CITIES BY DEPARTMENT ID
  getCityPorDptoId (dptoId:number){
    return this.http.get(`${this.URL}/cityDpto/${dptoId}`).pipe(map((resp)=> resp ));
  }

}
