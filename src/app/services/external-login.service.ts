import { Injectable } from '@angular/core';
import { FacebookLoginProvider, SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

@Injectable({
  providedIn: 'root'
})
export class ExternalLoginService {

  constructor(private externalAuthService:SocialAuthService) { }

  public signInWithGoogle(){
    return this.externalAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  public signInWithFacebook(){
    return this.externalAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  public signOut(){
    return this.externalAuthService.signOut();
  }
}
