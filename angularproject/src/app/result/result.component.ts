import { Component, OnInit,Input, Output } from '@angular/core';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  @Output() 
 @Input() sampletext : string ; 
 @Input() sampleintent : any ;
 @Input() sentimentaudio : any ;  
  constructor(private sc:ServicesService) { }


  ngOnInit(): void {
    
     
  }
  
  

}
