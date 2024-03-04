import { Component, OnInit,Input,AfterViewInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent extends FieldType<FieldTypeConfig> implements OnInit  {
  public  _model: any;
  public _options:any  ;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this._model = super.model;
    this._options = super.props.options;
  } 
  
}
