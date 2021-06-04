import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmPasswordValidation } from '../custom-validation/confirm-password.validation';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit(): void {

    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email], this.remoteValidationForEmail.bind(this)),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('')
    }, ConfirmPasswordValidation.match);
  }
  register() {
    // console.log(this.registerForm.value)
    this.authService.register(this.registerForm.value).subscribe(r => {
      this.router.navigate(['/login'])
    })
  }

  get name() { return this.registerForm.get('name') }
  get email() { return this.registerForm.get('email') }
  get password() { return this.registerForm.get('password') }
  get confirmPassword() { return this.registerForm.get('confirmPassword') }


  remoteValidationForEmail(c: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve, reject) => {
      this.authService.checkEmailAvailability(c.value).subscribe(r=>{
        if(r.message){
          c.setErrors({'emailAvailable':'yes'})
          resolve(r)
        }else{
          c.setErrors(null)
          resolve(null)
        }   
      })
     
    });
  }

}
