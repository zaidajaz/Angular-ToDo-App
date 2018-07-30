import { Component, OnInit } from '@angular/core';
import { ListServiceService } from '../list-service.service'
import { list } from '../../list';

@Component({
  selector: 'app-test-client',
  templateUrl: './test-client.component.html',
  styleUrls: ['./test-client.component.css']
})
export class TestClientComponent implements OnInit {

  data: list[];

  constructor(private listService: ListServiceService) { }

  ngOnInit() {

  }

}
