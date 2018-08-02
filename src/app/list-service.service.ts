import { Injectable } from '@angular/core';
import { list } from '../list';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { UserServiceService } from './user-service.service'

@Injectable({
  providedIn: 'root'
})
export class ListServiceService {

  listObj: list[];
  listObjPaged: list[];
  userListObj: list[];
  lastPage: number;
  editableItem: list;
  constructor(private httpClient: HttpClient,private userService: UserServiceService) {
    this.listObj = new Array<list>();
    this.listObjPaged = new Array<list>();
    this.userListObj = new Array<list>();
  }
  add(item, pageNo, itemsPerPage): void {
    this.listObj.unshift(item);
    this.updatePagedList(pageNo, itemsPerPage);
  }
  remove(item, pageNo, itemsPerPage) {
    var index: number = this.listObj.indexOf(item);
    this.listObj.splice(index, 1);
    if(!this.userService.loggedInUser.isAdmin)
      this.userListObj.splice(index,1);
    this.updatePagedList(pageNo, itemsPerPage);
  }
  updatePagedList(pageNo, itemsPerPage): void {
    this.listObjPaged = [];
    let initialIndex = (pageNo - 1) * itemsPerPage;
    let finalIndex = initialIndex + itemsPerPage - 1;
    let obj:list[] = this.userService.getLoggedInUser().isAdmin?this.listObj:this.userListObj;
    console.log(obj);
    if (finalIndex >= obj.length - 1)
        finalIndex = obj.length - 1;
      for (let i = initialIndex; i <= finalIndex; i++)
        this.listObjPaged.push(obj[i]);
      let rem = (obj.length % itemsPerPage);
      if (rem == 0)
        this.lastPage = Math.floor(obj.length / itemsPerPage);
      else
        this.lastPage = Math.floor(obj.length / itemsPerPage) + 1;
  }
  assignEditableItem(item): void {
    this.editableItem = item;
  }
  getDataFromUrl(url: string) {
    return this.httpClient.get(url);
  }
  sendDataToServer(url: string) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<list>(url, list, options);
  }
}
