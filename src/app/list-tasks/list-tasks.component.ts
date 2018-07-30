import { Component, OnInit } from '@angular/core';
import { list } from '../../list';
import { ListServiceService } from 'src/app/list-service.service';
import { ActivatedRoute } from '@angular/router';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { Observable } from 'rxjs';
import { preserveWhitespacesDefault } from '@angular/compiler';

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

  constructor(private listService: ListServiceService, private route:ActivatedRoute){
  }

  removeFromList(item): void{
    var isConfirmed = confirm("Are you sure, you want to delete this?");
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
  ngOnInit(){
    this.listService.getDataFromUrl("http://localhost:8080").subscribe((data : list[]) => {
        this.listService.listObj = data;
        this.listService.updatePagedList(this.pageId,this.itemsPerPage);
    });
   }
}
