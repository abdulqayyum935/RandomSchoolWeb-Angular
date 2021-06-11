import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {

  constructor(private router: Router,
    private storageService: StorageService,
    private http: HttpClient
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.storageService.isLoggedIn()) {
      this.router.navigate(['login'])
      return false;
    }

    if (this.storageService.isTokenExpired() && this.storageService.getRefreshToken() !== null) {
      console.log('refreshing token')
      let token: string = this.storageService.getToken() || '';
      let refreshToken: string = this.storageService.getRefreshToken() || '';
      const credentials = JSON.stringify({ token, refreshToken: refreshToken });
      try {
        this.http.post<{token:string,refreshToken:string}>("http://localhost:21977/api/Auth/refreshToken", credentials, {
          headers: new HttpHeaders({
            "Content-Type": "application/json"
          })//,observe: 'response'
        }).subscribe(response => {
          console.log('token updated')
          this.storageService.setRefreshToken(response.refreshToken)
          this.storageService.setToken(response.token)
          return true;
        })
      }
      catch(ex) {
                return false;
              }

      }


      return true;
      // return new Promise((resolve, reject) => {

      //   if (!this.storageService.isLoggedIn()) {
      //     this.router.navigate(['/login'])
      //     //return false;
      //     resolve(false)
      //   }
      //   let response: boolean = false;
      //   if (this.storageService.isTokenExpired() && this.storageService.getRefreshToken() !== null) {
      //     response = await this.tryRefreshingTokens()
      //   };
      //   resolve(response);

      // });




      // if(route.data?.role===undefined){ //|| route.data?.role ==='students'){
      //   return true; 
      // }
      // if(route.data?.role.toLocaleLowerCase()===this.storageService.getUserRole().toLocaleLowerCase()){
      //   return true;
      // }
      //this.router.navigate(['/unauthorize'])
      //return false;


      // If token refresh is successful, set new tokens in local storage.



      //return result;
      // return result;
      //     return true;

    }
    canActivateChild(
      childRoute: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return true;
      }
  canDeactivate(
        component: unknown,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState ?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
          return true;
        }
  canLoad(
          route: Route,
          segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
            return true;
          }
  private async tryRefreshingTokens(): Promise < boolean > {

            let token: string = this.storageService.getToken() || '';
            let refreshToken: string = this.storageService.getRefreshToken() || '';


            const credentials = JSON.stringify({ token, refreshToken: refreshToken });
            let isRefreshSuccess: boolean;
            try {
              const response = await this.http.post("http://localhost:21977/api/Auth/refreshToken", credentials, {
                headers: new HttpHeaders({
                  "Content-Type": "application/json"
                }),
                observe: 'response'
              }).toPromise();
              // If token refresh is successful, set new tokens in local storage.
              const newToken = (<any>response).body.token;
              const newRefreshToken = (<any>response).body.refreshToken;

              console.log('response body', response.body)
      this.storageService.setRefreshToken(newRefreshToken)
      this.storageService.setToken(newToken)


      isRefreshSuccess = true;
            }
    catch(ex) {
              isRefreshSuccess = false;
            }
    return isRefreshSuccess;
          }

}
