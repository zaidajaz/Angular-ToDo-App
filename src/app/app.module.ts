import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HeaderComponent } from './header/header.component';
import { ModalComponent } from './modal/modal.component';
import { AppRoutingModule } from './/app-routing.module';
import { AddTaskComponent } from './add-task/add-task.component';
import { ListTasksComponent } from './list-tasks/list-tasks.component';
import { ListServiceService } from 'src/app/list-service.service';
import { TestClientComponent } from './test-client/test-client.component';

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { BannedUserDirective } from './banned-user.directive'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ModalComponent,
    AddTaskComponent,
    ListTasksComponent,
    TestClientComponent,
    LoginComponent,
    BannedUserDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ListServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
