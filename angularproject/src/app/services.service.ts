import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


import { map } from 'rxjs/operators';





@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  

  constructor(private http : HttpClient) { }
  getText(){return this.http.get<any>('http://127.0.0.1:5000/');}
  postFile(fileToUpload: File) {
    const endpoint = 'http://127.0.0.1:5000/uploader';
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post<any>(endpoint, formData, )}
  audio_browser(blb: any)
  {
    const fd=new FormData();
    fd.append("file",blb, "test.wav");
 
    return this.http.post<any>("http://127.0.0.1:5000/uploader", fd, )
    
    
  ;}
  getintentsample(a:String){
    

    return this.http.post<string>('http://127.0.0.1:5000/intent',a);}
    getSentiment(){return this.http.get<any>('http://127.0.0.1:5000/emotion');}
    postFileSentiment(fileToUpload: File) {
      const endpoint = 'http://127.0.0.1:5000/uploadersentiment';
      const formData: FormData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      return this.http.post<any>(endpoint, formData, )}
      audio_browsersentiment(blb: any)
  {
    const fd=new FormData();
    fd.append("file",blb, "test.wav");
 
    return this.http.post<any>("http://127.0.0.1:5000/uploadersentiment", fd, )
    
    
  ;}
  
}