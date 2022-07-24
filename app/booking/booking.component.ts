
import { HttpClient } from '@angular/common/http';
import { booking } from '../models/booking';
import { Component, OnInit } from '@angular/core';
import { bookingUrl } from '../services/Api';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent  {
  BookingData: booking = new booking();
  modelText:string="";
  modelHeader:string="";
  showSpinner:boolean=false;
  
  constructor(private _booking: BookingService,private _router:Router,public httpc:HttpClient) { }
 

  bookingModel: booking = new booking();
  bookingModels: Array<booking> = new Array<booking>();
   Addbooking() {
    console.log(this.bookingModel);
    
    var bookingto={
      id:Number(this.bookingModel.id),  
      name:this.bookingModel.name,
      email:this.bookingModel.email,
      gender:this.bookingModel.gender,
      age:Number(this.bookingModel.age),
      meal:this.bookingModel.meal,
      fromPlace:this.bookingModel.fromPlace,
      toPlace:this.bookingModel.toPlace,
      startDateTime:this.bookingModel.startDateTime,
      endDateTime:this.bookingModel.endDateTime,
      seatNo:Number(this.bookingModel.seatNo),

      

    }
    this.httpc.post(bookingUrl,bookingto).subscribe(res=>this.PostSuccess(res),res=>this.PostError(res));
    this.bookingModel = new booking();
  }
  PostSuccess(res:any){
    console.log(res);
    
  }
  PostError(res:any){
    console.log(res);
  }
  EditBooking(input: booking) {
    this.bookingModel = input;
  }
  DeleteBooking(input: booking) {
    var index=this.bookingModels.indexOf(input);
    this.bookingModels.splice(index,1);
  }
  getBookings(){
    console.log("Hi");
    this.httpc.get(bookingUrl).subscribe(res=>this.GetSuccess(res),res=>this.GetError(res));
  }
  
  GetSuccess(input:any){
    this.bookingModels=input;
  }
  GetError(input:any){
    console.log(input);
  }
  DisplayModalPopup(modelHeader:string,modelText:string){
    this.modelHeader=modelHeader;
    this.modelText=modelText;
    document.getElementById("btnLaunchModel")?.click();
  }
  ShowSpinner(){
    this.showSpinner=true;
  }
  HideSpinner(){
    this.showSpinner=false;
  }
  Booking() {

    if(this.BookingData.name==''|| this.BookingData.email==''||this.BookingData.gender==''|| 
    this.BookingData.meal==''||this.BookingData.fromPlace==''||this.BookingData.toPlace==''||this.BookingData.startDateTime==''
    ||this.BookingData.endDateTime==''){
      this.DisplayModalPopup("Error","Please enter the all details.");
      return;
    }
    this.ShowSpinner();
    var userDataObject={
      name:this.BookingData.name,
      email:this.BookingData.email,
      gender:this.BookingData.gender,
      meal:this.BookingData.meal,
      fromPlace:this.BookingData.fromPlace,
      toPlace:this.BookingData.toPlace,
      startDateTime:this.BookingData.startDateTime,
      endDateTime:this.BookingData.endDateTime,
    
    
    }

  }
    // this._booking.Booking(userDataObject).subscribe(res => {
    //   this.HideSpinner();localStorage.setItem('token',res.token);
    //    this._router.navigate([''])
    //  },
    //    err => console.log(err));
      // this.httpc.post(bookingUrl,userDataObject).subscribe(res=>this.PostSuccess(res),res=>this.PostError(res));
      // this.bookingModel = new booking();
    }
    
   
   

