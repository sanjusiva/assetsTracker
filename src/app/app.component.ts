import { Component } from '@angular/core';
import { FormlyService } from './core/formly.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'AssetTracker';
  fieldConfig = [];
  options:any=[];

  constructor(private formlyService:FormlyService){
    this.formlyService.getRepairForm().subscribe((res:any)=> this.fieldConfig = res);
  }

  handleFormSubmission(event:any){
    console.log('parent--event',event);
  }
}
