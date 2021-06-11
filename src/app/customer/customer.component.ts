import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseInt } from 'src/interfaces/response.interface';
import { CustomerService } from '../services/customer.service';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
//response!:Observable<ResponseInt>;
p: number = 1;
totalRecords:number=0;
collection!:any[];
  constructor(private customerService:CustomerService) { }

  dtOptions: DataTables.Settings = {};

  

  ngOnInit(): void {
      this.renderData();
      this.dtOptions={
        paging:false,
        info:false
      }
  }

  renderData(pageNumber:number=1){
    this.customerService.getCustomers(pageNumber).subscribe(r=>{
      this.collection=r.data;
      this.totalRecords=r.totalRecords
    })
  }

  changePage(pageNumber:number){
    this.renderData(pageNumber)
    this.p=pageNumber;
  }
 
}
