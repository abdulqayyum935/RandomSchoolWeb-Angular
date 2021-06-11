import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Register } from 'src/interfaces/register.interface';
import { AuthService } from '../services/auth.service';
import { ExternalLoginService } from '../services/external-login.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string = ''
  loginForm!: FormGroup

  constructor(private authService: AuthService,
    private router: Router,
    private storage: StorageService,
    private externalAuth:ExternalLoginService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('testing@gmail.com'),
      password: new FormControl('1234')
    });
    
  }
  loginWithFacebook(){
    this.externalAuth.signInWithFacebook().then(res=>{
      this.authService.verifyFacebookLogin({idToken:res.authToken,provider:res.provider}).subscribe(r=>{
        this.authService.sendAuthStateChangeNotification(true)
        this.authService.sentUserNameChangeNotification(r.userName)
        
        this.storage.setToken(r.token)
        this.storage.saveUserName(r.userName);
        this.storage.setRefreshToken(r.refreshToken)
  
        this.router.navigateByUrl('/students')
       })
    })
  }
  login() {
    this.authService.login(this.loginForm.value)
      .pipe(catchError(this.handleError.bind(this))).subscribe(r => {
        this.authService.sendAuthStateChangeNotification(true)
        this.authService.sentUserNameChangeNotification(r.userName)
        this.storage.setToken(r.token)
        this.storage.saveUserName(r.userName);
        this.storage.setRefreshToken(r.refreshToken)

        this.router.navigateByUrl('/students')
      })
  }
  handleError(error: HttpErrorResponse) {
    if (error.status == 401) {
      this.errorMessage = "true"
    }

    return throwError(
      'Something bad happened; please try again later.');
  }

  public loginWithGoogle = () => {
    //this.showError = false;
    this.externalAuth.signInWithGoogle()
    .then(res => {
     /*
     res.idToken
     res.provider*/
     this.authService.verifyExternalLogin({provider:res.provider,idToken:res.idToken}).subscribe(r=>{
      this.authService.sendAuthStateChangeNotification(true)
      this.authService.sentUserNameChangeNotification(r.userName)
      this.storage.setToken(r.token)
      this.storage.saveUserName(r.userName);
      this.storage.setRefreshToken(r.refreshToken)

      this.router.navigateByUrl('/students')
     })

    }, error => console.log(error))
  }

}
