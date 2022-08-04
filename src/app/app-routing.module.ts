import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './component/user/user.component';
// import { EditUserComponent } from './component/edit-user/edit-user.component';
const routes: Routes = [

  { path: 'user', 
  component: UserComponent },
  
  {
    path: '**',    
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
