import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter, tap } from 'rxjs/operators';
import { FormlyCfg } from '../model';

@Injectable({
  providedIn: 'root'
})
export class FormlyService { 
  uniqueArr: any[] = [];  
  constructor(private http: HttpClient) { }

  public getRepairForm(){
    return this.http.get('https://run.mocky.io/v3/a3a655b3-e443-4551-a30c-cefbfe4b94ee')
    .pipe(map((res:any)=>{  
     const mappedRes= this.mapFields(res);               
      return mappedRes;
    })
    );
    ;
  }

  private mapFields(formFields:any){
    const formCfg:FormlyCfg[] = [];    
    formFields.map((field:any)=>{    
      if("dependentRow" in field){               ;
        this.uniqueArr.push(field);
    }
    //else{        
//      formCfg.push(...this.basicMap(field));
  //  }
    });
    this.alignCfg(this.uniqueArr, formCfg, formFields);
    return formCfg;
  }

private alignCfg(field:any,formCfg:any,formFields:any){
  let a = [{fieldGroupClassName: 'row',
        fieldGroup:[...this.basicMap(field,formFields)]}
        ];
        formCfg.push(...a);        
}

  // private basicMap(field:any,api=[],isAlign=false){
  //   let cfg = [];
  //       if(isAlign){
  //           api.reduce((prev:any,curr:any,cuIndex)=>{              
  //             if( curr.key === curr.dependentRow || (prev != undefined && curr.dependentRow === prev.dependentRow)){                  
  //                    const mapCfg ={
  //     type : curr.type,
  //     key : curr.key,
  //     ...(curr.className ? {className:curr.className}: {}),
  //     props : {
  //       label:curr.label,
  //       ...(curr.required? {required: curr.required}: {}),
  //       ...(curr.options?{options:curr.options}:{})
  //     }};
  //     cfg.push(mapCfg);
  //     api.splice(cuIndex,1);      
  //               }else{
  //                 return;
  //               }
  //           },api);
  //       }else{          
  //            const mapCfg ={
  //     type : field.type,
  //     key : field.key,
  //     ...(field.className ? {className:field.className}: {}),
  //     props : {
  //       label:field.label,
  //       ...(field.required? {required: field.required}: {}),
  //       ...(field.options?{options:field.options}:{})
  //     }};
  //     cfg.push(mapCfg);
  //       }
  //     return cfg;
  // }

  private basicMap(field: any, api = []) {
    let cfg: { props:{ }}[] = [];
      api.reduce((prev: any, curr: any, cuIndex) => {        
          const mapCfg = {
            type: curr.type,
            key: curr.key,
            defaultValue:curr.defaultValue,
            ...(curr.className ? { className: curr.className } : {}),
            props: {
              label: curr.label,
              type: curr.propKey,
              minLength: curr.minLength,
              description:curr.description,
              pattern: curr.pattern,
              ...(curr.required ? { required: curr.required } : {}),
              ...(curr.options ? { options: curr.options } : {}),
            },
          
          };

          cfg.push(mapCfg);
          
      }, api);
    return cfg;
  }
}
