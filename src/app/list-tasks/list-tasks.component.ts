import { Component, OnInit } from '@angular/core';
import { list } from '../../list';
import { ListServiceService } from 'src/app/list-service.service';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.css']
})
export class ListTasksComponent implements OnInit {

  title = 'To-Do-App';
  listContent: string;
  listBody: string;
  listItem: list;
  listObj:list[];
  count = 0;
  num = 1;
  isEven = false;
  editableID;
  inputType="hidden";
  newTitle;
  newBody;
  editableItemTitle;
  editableItemBody;
  pageId = 1;
  itemsPerPage = 3;
  initialIndex;
  userList: list[];

  constructor(private listService: ListServiceService, private route:ActivatedRoute, private userService: UserServiceService){
  }

  removeFromList(item): void{
    if(this.userService.getLoggedInUser().isAdmin)
      var isConfirmed = confirm("Are you sure, you want to delete this?");
    else
      var isConfirmed = confirm("Are you sure, you want to mark this as complete?");
    if(isConfirmed){
      this.listService.remove(item,this.pageId,this.itemsPerPage);
    } 
    while(this.listService.listObjPaged.length == 0){
      this.pageId--;  
      this.listService.updatePagedList(this.pageId,this.itemsPerPage); 
    } 
  }
  editSelectedItem(item): void{
    this.listService.assignEditableItem(item);
    this.newTitle = item.content; 
    this.newBody = item.body;
  }
  cancelEdit(): void{
    this.editableID = -1;
  }
  toggle():void{
    this.num++;
    this.isEven = (this.num % 2 == 0)
  }
  nextPage(input): void{
      this.pageId++;
      this.listService.updatePagedList(this.pageId,this.itemsPerPage);
  }
  prevPage(input): void{
    if(this.pageId > 1)
      this.pageId--;
      this.listService.updatePagedList(this.pageId,this.itemsPerPage);
  }
  itemsChange(){
    if(this.itemsPerPage <= 0)
     this.itemsPerPage = 1;
    if(this.itemsPerPage > 10)
      this.itemsPerPage = 10
    this.listService.updatePagedList(this.pageId,this.itemsPerPage); 
    while(this.listService.listObjPaged.length == 0){
      this.pageId--;  
      this.listService.updatePagedList(this.pageId,this.itemsPerPage); 
    }
  }
  canView(item:list){
    let loggedInUser = this.userService.getLoggedInUser();
    if(loggedInUser.isAdmin)
     return true;

    let allowed = false;
    item.assignedTo.forEach(assignedUser=>{
      if(assignedUser == loggedInUser.username)
        allowed = true;
    });
    return allowed;
  }
  noTasksDisplay():boolean{
    if(this.userService.loggedInUser.isAdmin){
      if(this.listService.listObj.length==0)
        return true;
    }
    else{
      if(this.listService.userListObj.length==0)
        return true;
    }
    return false;
  }
  ngOnInit(){
    // this.listService.getDataFromUrl("http://localhost:8080").subscribe((data : list[]) => {
    //     this.listService.listObj = data;
    //     this.listService.updatePagedList(this.pageId,this.itemsPerPage);
    // });
   this.userList = [];
   this.listService.listObjPaged = [];
   this.pageId = 1;
   this.listService.listObj.forEach(listItem => {
      if(listItem.assignedTo != undefined){
        if(listItem.assignedTo.indexOf(this.userService.getLoggedInUser().username) != -1){
          this.userList.push(listItem);
        }
      }
   });
   this.listService.userListObj = this.userList;
   this.listService.updatePagedList(this.pageId,this.itemsPerPage);
  }
}
