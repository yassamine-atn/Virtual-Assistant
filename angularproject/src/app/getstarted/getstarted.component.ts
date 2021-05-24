import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
declare var $: any;
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';

import 'core-js';



@Component({
  selector: 'app-getstarted',
  templateUrl: './getstarted.component.html',
  styleUrls: ['./getstarted.component.css']
})
export class GetstartedComponent implements OnInit {
  title = 'micRecorder';
//Lets declare Record OBJ
record;
//Will use this flag for toggeling recording
recording = false;
//URL of Blob
url;
error;
text :any;
fileToUpload:File = null  ; 
urlstring:string ; 
fileaudioUpload:File=null;
b :any ; 
intenttext:any;
finalurl;
sentimenttext : any ; 



 constructor(private sc:ServicesService,private domSanitizer: DomSanitizer) { }
 //remove any illegal caracter from the data
 sanitize(url: string) {
  return this.domSanitizer.bypassSecurityTrustUrl(url);
  }
  /**
  * Start recording.
  */
  initiateRecording() {
  this.recording = true;
  let mediaConstraints = {
  video: false,
  audio: true
  };
  navigator.mediaDevices.getUserMedia(mediaConstraints).then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }
  /**
  * Will be called automatically.
  */
  successCallback(stream) {
  var options = {
  mimeType: "audio/wav",
  numberOfAudioChannels: 1,
  
  };
  //Start Actuall Recording
  var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
  this.record = new StereoAudioRecorder(stream, options);
  this.record.record();
  }
  /**
  * Stop recording.
  */
  stopRecording() {
  this.recording = false;
  this.record.stop(); 
  this.record.stop(this.processRecording.bind(this));
 
}


  /**
  * processRecording Do what ever you want with blob
  * @param  {any} blob Blog
  */
  processRecording(blob) {
  this.url = URL.createObjectURL(blob);
  this.b=blob
  console.log("blob",typeof(this.b));
  console.log("url", typeof(this.b));
  console.log(" url is :", this.url);
  
 

  
   }
   public blobToFile = (theBlob: Blob, fileName:string): File => {       
    return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type })
}
  /**
  * Process Error.
  */
  errorCallback(error) {
  this.error = 'Can not play audio in your browser';
  }

  ngOnInit(): void {
    
  }
  getTextSample(){this.sc.getText().subscribe(data=>this.text=(data));
   
  console.log(this.text)
  this.sc.getintentsample(this.text).subscribe(data=>this.intenttext=data)
this.sc.getSentiment().subscribe(data=>this.sentimenttext=(data))
}
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);

    console.log(this.fileToUpload);
}
uploadFileToActivity() {
  this.sc.postFile(this.fileToUpload).subscribe(data => 
    this.text=JSON.stringify(data));
    
    console.log(this.text)
    this.sc.getintentsample(this.text).subscribe(data=>this.intenttext=data)
this.sc.postFileSentiment(this.fileToUpload).subscribe(data=>this.sentimenttext=(data))

    };
    uploadaudio(){
     

      this.sc.audio_browser(this.b).subscribe(data=>this.text=data);
      console.log(this.b)
      this.sc.getintentsample(this.text).subscribe(data=>this.intenttext=data)
this.sc.audio_browsersentiment(this.b).subscribe(data=>this.sentimenttext=(data))
    }
    
}