import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, Validators } from '@angular/forms';  
import { Observable } from 'rxjs'; 
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
}) 
export class UserComponent implements OnInit {
  firstName:any;
  user = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city:"",
    phone:""
  };
  p:number=1;
  dataSaved = false; 
  userForm: any; 
  Users:any;
  //Users!: Observable<User[]>;  
    userIdUpdate = 'null';  

  constructor(private formbulider: FormBuilder,private userService:UserService) { }
  ngOnInit() {  
    this.userForm = this.formbulider.group({  
      FirstName: ['', [Validators.required]], 
      LastName: ['', [Validators.required]],  
      Email: ['', [Validators.required]],  
      City: ['', [Validators.required]],  
      Address: ['', [Validators.required]],  
      Phone: ['', [Validators.required]],  
    });  
    this.loadUsers();  
  }  
  //Searching
  search()
  {
    debugger
    if(this.firstName == "")
    {
      this.ngOnInit();
    }
    else{
      this.user = this.Users.filter((val:any)=>{
        return val.firstName.toLocaleLowerCase().match(this.firstName.toLocaleLowerCase(this.Users.firstName));
      })
    }
  }

  // sort()
  // {
  //   if()
  //   {

  //   }
  // }
//Get the users
  loadUsers() {  
    this.Users = this.userService.getUser().subscribe((response: any) => {
      this.Users= response;
    });  
  }  
  resetUserForm(userForm:FormGroup) {
    userForm.reset();
}
//save users when create and update user
  saveUser(dismissModal: HTMLButtonElement) {  
    debugger
    this.dataSaved = false;  
    const user = this.userForm.value;  
    this.createUser(user);  
    dismissModal.click();
    //this.userForm.reset();
  }  

  editUser(Id: string) {  
    this.userService.getUserById(Id).subscribe(user=> {  
      this.user = user; 
      this.dataSaved = false;  
      this.userIdUpdate = user.id;  
    //   this.userForm.controls['FirstName'].setValue(user.firstName);  
    //  this.userForm.controls['LastName'].setValue(user.lastName);  
    //   this.userForm.controls['Email'].setValue(user.email);  
    //   this.userForm.controls['Phone'].setValue(user.phone);  
    //   this.userForm.controls['City'].setValue(user.city);  
    //   this.userForm.controls['Address'].setValue(user.address);  
    });  
  
  }

  createUser(user: User) {  
    if (this.userIdUpdate == 'null') {  
      this.userService.createUser(user).subscribe(  
        () => {  
          this.dataSaved = true;  
          this.userService.ToasterSuccess(); 
          this.loadUsers();  
          this.userIdUpdate = 'null';   
        },
        ((error: any) => {
          this.dataSaved = false;
            this.userService.errorToaster();
        })  
      );  
    } else {  
      user.id = this.userIdUpdate;  
      this.userService.updateUser(user).subscribe(() => {  
        this.dataSaved = true;  
        this.userService.updateToaster(); 
        this.loadUsers();  
        this.userIdUpdate = 'null'; 
      },
      ((error: any) => {
        this.dataSaved = false;
          this.userService.errorToaster();
      })
      );  
    }  
  }   
  deleteUser(Id: string) {  
    this.userService.SweetAlert().then((user) => {
      if (user.value) {
    this.userService.deleteUser(Id).subscribe(() => {  
      this.dataSaved = true;   
      this.userService.toasterDeleteRecord();
      this.loadUsers();  
    },
    ((error: any) => {
      this.dataSaved = false;
        this.userService.errorToaster();
    })
    );  
  } 
}); 
}   
}