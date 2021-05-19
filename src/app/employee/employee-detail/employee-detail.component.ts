import { Employee } from '../employee';
import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  id: number;
  employee: Employee;

  constructor( private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employee = new Employee();
 
    this.id = this.route.snapshot.params.id;
 
    this.employeeService.getEmployee(this.id)
      .subscribe(data => {
        this.employee = data;
      }, error => console.log(error));
  }

  list() {
    this.router.navigate(['employees']);
  }

}
