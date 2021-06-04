import { HttpHeaders } from "@angular/common/http";
import { StorageService } from "src/app/services/storage.service";

export const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  export const httpOptionsWithToken = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':`Bearer ${localStorage.getItem('token')}`
    })
  };
  