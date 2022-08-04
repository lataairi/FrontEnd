import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient, private toastr: ToastrService) { }
  UserUrl:string = "https://localhost:7012/api/UserController/";
  //Created object for get UserData
  listUser:User[]=[];
  //Created object for update and Post the UserData
  userData:User = new User();
  
  updateUser( user: User): Observable<User>
  {
    return this.http.put<User>(this.UserUrl, user);
  }

  getUser():Observable<User[]>
  {
    return this.http.get<User[]>(this.UserUrl);
  }

  getUserById(id: string): Observable<User> {    
    return this.http.get<User>(this.UserUrl + id);  
  } 

  createUser(user: User): Observable<User> {  
    return this.http.post<User>( this.UserUrl, user);  
  }  

  deleteUser(id:string):Observable<number>
  {
    return this.http.delete<number>(this.UserUrl + id);
  }

  ToasterSuccess(){
    this.toastr.success("Success !!", "Data saved successfully !!")
  }
  updateToaster(){
    this.toastr.success("Success !!", "Record updated !!")
  }
  toasterDeleteRecord(){
    this.toastr.success("Record deleted successfully !!", "Data deleted successfully !!")
  }
  errorToaster() {
    this.toastr.error("Record already exist !!","something went wrong");
  }
  
  SweetAlert(): Promise<any> {
    return Swal.fire({
      title: 'Are you sure want to delete?',
      text: 'You will not be able to recover this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      confirmButtonColor: '#ff0000',
    })
  };
} 

