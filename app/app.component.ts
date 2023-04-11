import { Component } from '@angular/core';
import { DataExportService } from 'src/DataExport.service';
import { HttpClient } from '@angular/common/http'; 
import { AppServiceService } from './app-service.service';
import _ from 'lodash';

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dataexport';
  revenueList: any;
  tempDate: any;
  revenueList2: any;
  //unknown: any;
  sortedList:any=[];

  displayedColumns: string[] = ['clientCode', 'clientName', 'beneCode', 'beneName'];
  dataSource: any =[];


  constructor(public dataExportService :DataExportService ,public appservice : AppServiceService ){
   
  }
  data :any
   ngOnInit(){


 this.appservice.getData().subscribe((res)=>{
  this.data = res
  this.dataSource = res

 //this.SortData(res)
 //this.removeDuplicate(this.data , 'clientCode')

 //this.exporttoExcel(this.sortedList)
   
})


   }

isSorted = false
SortData(data){
 
  this.isSorted = true
var result = this.groupBy(data, function(item)
{
  return item.clientCode;
});


 
 result.forEach((obj)=>{
  
      var test =  this.groupBy(obj, function(item)
      {
        return item.beneCode;
      })
      test = test.flat(1)
      this.sortedList.push(test)
 })




 this.sortedList = this.sortedList.flat(1)
 this.dataSource =this.sortedList


    return 0
    }
    
    
    isDuplicateRemoved = false

removeDuplicates(){
  this.removeDuplicate(this.sortedList, 'clientCode')
  this.removeDuplicate(this.sortedList, 'clientName')
  this.removeDuplicate(this.sortedList, 'beneCode')
  this.removeDuplicate(this.sortedList, 'beneName')
  this.isDuplicateRemoved = true
}

// propertyVal = {}
//propertyValues: any = []
exportToPDF(data){

  // for (let i = 0; i < data.length; i++) {
    
  //   Object.assign(this.propertyVal, Object.values(data[i]));
  // }

  //console.log('data',data)
  //console.log(typeof(data),'  typeof data')
  let propertyNames = Object.keys(data[0]);
 // let propertyValues = [[]];

 let propertyValues: any = []

  data.forEach( (obj) => { propertyValues.push(Object.values(obj) ) });

  console.log('header',propertyNames);
  console.log('values', propertyValues);
  

  

const head = [['ID', 'Country', 'Index', 'Capital']]
const data1 = [
    [1, 'Finland', 7.632, 'Helsinki'],
    [2, 'Norway', 7.594, 'Oslo'],
    [3, 'Denmark', 7.555, 'Copenhagen'],
    [4, 'Iceland', 7.495, 'Reykjavík'],
    [5, 'Switzerland', 7.487, 'Bern'],
    [9, 'Sweden', 7.314, 'Stockholm'],
    [73, 'Belarus', 5.483, 'Minsk'],
]

var doc = new jsPDF('landscape');


autoTable(doc, {
  head: [propertyNames],
  body: propertyValues,
});
doc.save('angular-demo.pdf');
}



groupBy( array , f )
{
  var groups = {};
  array.forEach( function( o )
  {
    var group = JSON.stringify( f(o) );
    groups[group] = groups[group] || [];
    groups[group].push( o );  
  });
  return Object.keys(groups).map( function( group )
  {
    return groups[group]; 
  })
}

exporttoExcel(data){  
  this.dataExportService.exporttoXL(data, 'ExcelExport.xlsx')
}

//unique :any[] = [];

removeDuplicate(sortedData , key){
  
  
  let uniqueVal = [''];
  
  let len = sortedData.length;

  for (let i = 0; i < len; i++)
  { 
    //Emptying matched string 
    if(sortedData[i][key] ==  uniqueVal[uniqueVal.length - 1] ) {
      sortedData[i][key] = '';
    }    
    //Pushing Unique value into array
    if(!uniqueVal.includes(sortedData[i][key])){
      uniqueVal.push(sortedData[i][key]);
    }

    
  }

  console.log(sortedData)

}


}

