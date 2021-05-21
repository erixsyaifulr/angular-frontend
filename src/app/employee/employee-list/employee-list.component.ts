import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[];
  token : any;
  userData:any;
  email:any;
  page :any = 1;
  limit : any = 5;
  skip:any;
  totalCount:any;
  first_name:any;
  selectedValue: any;
  searchValue: any = null;

  constructor(private employeeService: EmployeeService,
    private router: Router) { }

  ngOnInit(): void {
    this.reloadData();
    this.token = localStorage.getItem('token');
    this.userData = jwt_decode(this.token);
    this.email = this.userData.semail;
    
  }

  search($event){
    if(this.first_name == ""){
      this.ngOnInit();
    }else{
      if(this.page == 1){
        this.skip=0;
      }
      else{
        this.skip=(this.page - 1) * this.limit;
      }
  
      var requestObj = {
        'limit' : this.limit,
        'skip' : this.skip,
        'name' :this.searchValue
      }
  
      this.employeeService.getsearch(requestObj)
        .subscribe((response:any) => {
          this.employees = response.data;
          this.totalCount = response.totalRecord;
        });
    }
  }

  changelimit($event){
    this.selectedValue = $event.target.options[$event.target.options.selectedIndex].text;
    this.limit = this.selectedValue;
    this.reloadData();
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/landing']);
  }

  reloadData(): void {
    if(this.page == 1){
      this.skip=0;
    }
    else{
      this.skip=(this.page - 1) * this.limit;
    }

    var requestObj = {
      'limit' : this.limit,
      'skip' : this.skip
    }

    // console.log(requestObj);

    this.employeeService.getEmployees(requestObj)
      .subscribe((response:any) => {
        this.employees = response.data;
        this.totalCount = response.totalRecord;
      });
  }

  employeeDetails(id: number) {
    this.router.navigate(['details', id]);
  }

  confirmBox(id: number){
    Swal.fire({
      title: 'Apakah anda yakin akan menghapus data ini ?',
      text: 'Kamu akan kehilangan data tersebut!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.employeeService.deleteEmployee(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
          Swal.fire(
            'Berhasil !',
            'Data tersebut berhasil dihapus.',
            'success'
          )
        },
        error => console.log(error));
        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Data tersebut tidak jadi dihapus :)',
          'error'
        )
      }
    })
  }
 
  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
 
  updateEmployee(id: number) {
    this.router.navigate(['update', id]);
  }

}
