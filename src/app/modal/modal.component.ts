import { Component, OnInit, Input } from '@angular/core';
import { list } from '../../list';
import { ListServiceService } from '../list-service.service';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  modalTitle = 'Add New Task';
  listContent: string;
  listBody: string;
  listItem: list;
  listObj: list[]
  count: number = 0;
  @Input() newTitle: string;
  @Input() newBody: string;
  @Input() pageNo;
  @Input() itemsPerPage;

  constructor(private listService: ListServiceService, private userService: UserServiceService) { }

  ngOnInit() {
  }
  addItemToList() : void{
    if(this.userService.getLoggedInUser().isAdmin){
      let condition = false;
      condition = this.listContent == undefined || this.listContent=="" || this.listBody==undefined || this.listBody=="";
      if(condition){
        alert("Please, Enter Some Value");
      }
      else{
        this.listItem = new list();
        this.listItem.id = this.count++;
        this.listItem.content = this.listContent;
        this.listItem.body = this.listBody;
        this.listService.add(this.listItem,this.pageNo,this.itemsPerPage);
        this.listService.sendDataToServer("http://localhost:8080");
        this.listContent = "";
        this.listBody = "";
      }
    }
    else{
      alert('You are not admin')
    }
  }
  saveEdit(): void{
    if(this.newTitle!=undefined && this.newTitle!="" && this.newBody!=undefined && this.newTitle!=""){
      var index: number = this.listService.listObj.indexOf(this.listService.editableItem);
      this.listService.listObj[index].content = this.newTitle;
      this.listService.listObj[index].body = this.newBody;
      this.listService.updatePagedList(this.pageNo,this.itemsPerPage);
    }
    else{
      alert("Please, Enter Some Value");
    }
  }
}