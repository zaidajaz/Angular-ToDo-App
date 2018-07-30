import { Injectable } from '@angular/core';
import { list } from '../list';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListServiceService {

  listObj: list[];
  listObjPaged: list[];
  lastPage: number;
  editableItem: list;
  constructor(private httpClient: HttpClient) {
    this.listObj = new Array<list>();
    this.listObjPaged = new Array<list>();
  }
  add(item, pageNo, itemsPerPage): void {
    this.listObj.unshift(item);
    this.updatePagedList(pageNo, itemsPerPage);
  }
  remove(item, pageNo, itemsPerPage) {
    var index: number = this.listObj.indexOf(item);
    this.listObj.splice(index, 1);
    this.updatePagedList(pageNo, itemsPerPage);
  }
  updatePagedList(pageNo, itemsPerPage): void {
    this.listObjPaged = [];
    let initialIndex = (pageNo - 1) * itemsPerPage;
    let finalIndex = initialIndex + itemsPerPage - 1;
    if (finalIndex >= this.listObj.length - 1)
      finalIndex = this.listObj.length - 1;
    for (let i = initialIndex; i <= finalIndex; i++)
      this.listObjPaged.push(this.listObj[i]);
    let rem = (this.listObj.length % itemsPerPage);
    if (rem == 0)
      this.lastPage = Math.floor(this.listObj.length / itemsPerPage);
    else
      this.lastPage = Math.floor(this.listObj.length / itemsPerPage) + 1;
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
