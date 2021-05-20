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

  constructor(private employeeService: EmployeeService,
    private router: Router) { }

  ngOnInit(): void {
    this.reloadData();
    this.token = localStorage.getItem('token');
    this.userData = jwt_decode(this.token);
    this.email = this.userData.semail;
    
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  reloadData(): void {
    this.employeeService.getEmployees()
      .subscribe((response) => {
        this.employees = response;
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
