import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './add-task/add-task.component';
import { ListTasksComponent } from 'src/app/list-tasks/list-tasks.component';
import { TestClientComponent } from './test-client/test-client.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path:'add',component:AddTaskComponent},
  {path: '',
  redirectTo: 'login',
  pathMatch: 'full'},
  {path: 'list', component:ListTasksComponent},
  {path:'list/:id', component: ListTasksComponent},
  {path:'client', component: TestClientComponent},
  {path:'login',component:LoginComponent},
  {path: '**', component:LoginComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[ RouterModule ]
})
export class AppRoutingModule { }
