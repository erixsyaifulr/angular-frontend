import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService } from '../service/data.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  form : FormGroup;
  data:any;
  token:any;

  constructor(private formBuilder: FormBuilder,private toastr: ToastrService, private dataService : DataService,
    private router :Router) { }

  loginForm(){
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {
    this.loginForm();
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    this.submitted=false;
    if(this.form.invalid){
      return;
    }

    this.dataService.login(this.form.value).subscribe(res => {
      this.data = res;
      if(this.data.status === 1){
      //  console.log(res);
          this.token = this.data.data.token;
          localStorage.setItem('token', this.token);
          this.router.navigate(['/']);
          this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
            timeOut:4000,
            progressBar:true
          })
      }else{
        this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
          timeOut:4000,
          progressBar:true
        })
      }
    })

  }



}
