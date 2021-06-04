import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  public progress!: number;
  public message!: string;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient) { }
  url: string = 'http://localhost:21977/'
  profilePic: string =''// 'Resources/Images/bd371306-176f-45f2-aeb3-4fb91de99a50.png'

  ngOnInit(): void {
  }

  public uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post('http://localhost:21977/upload', formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {

          this.progress = Math.round((event.loaded / (event.total || 0)) * 100);
        }
        else if (event.type === HttpEventType.Response) {
         
        //  let pbody=event.body?.message;
         
          let body=JSON.stringify(event.body);
          let parsed=JSON.parse(body); 
          this.profilePic=parsed?.message
         
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      });
  }

}
