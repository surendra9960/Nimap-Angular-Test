import { HttpClient } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  title = 'MeanStack';
  
  data:any
  contactForm:any
  
  isvalid:boolean=false;
  constructor(private ser:HomeService,private formBuilder: FormBuilder,private http:HttpClient,private router : Router){}
  ngOnInit(){
    this.contactForm=this.formBuilder.group({
      
      fileToUpload:["",Validators.required],
      first_name:["",[Validators.maxLength(20),Validators.pattern("[a-z/A-Z]*")]],
      last_name:["",[Validators.maxLength(20),Validators.pattern("[a-z/A-Z]*")]],
      email:["",[Validators.required,Validators.email]],
      phone_no:["",[Validators.required,Validators.pattern("[0-9]*"),
      Validators.minLength(10),Validators.maxLength(10)]],
      age:["20",Validators.required],
      state:["",Validators.required],
      address:["",Validators.required],
      address_one:["",Validators.required],
      address_two:["",Validators.required],
      address_one1:["",Validators.required],
      address_two1:["",Validators.required],
      country:["",Validators.required],
      image_path:["",[Validators.required]],
      is_sub:["",[Validators.required]]
    })
    
  
  }
  img='./../assets/upload-img.jpg';
  state:any = [{id:1,"state":"Maharashtra"},
  {id:2,"state":"Goa"},
  {id:3,"state":"Andhra Pradesh"},
  {id:4,"state":"Madhya Pradesh"}];
  country:any = [
    {id:1,"country":"India"},
  {id:2,"country":"USA"},
  {id:3,"country":"Chaina"},
  {id:4,"country":"France"}
  ];



  getdata(){
    this.ser.getData().subscribe(
      (res)=>{
        this.data = res
        this.data.splice(0,this.data.length - 1)
        let image_path = this.data[0].image_path.split(",")
        this.imagePreview = image_path
        console.log(image_path)
        console.log(this.data[0])
        this.contactForm.patchValue({ ...this.data[0]})
        this.contactForm.controls.image_path.setValue(image_path.join(","))
        console.log(this.contactForm.controls.image_path.value)
      }
    )
  }

  imagePreview :any
  error = ""

upload(event){
  let reader= new FileReader();
  if(event.target.files && event.target.files.length>0){
    let file = event.target.files[0];
    
    const img = new Image();
    img.src = window.URL.createObjectURL( file );
    reader.readAsDataURL(file);
    reader.onload = () =>{
      setTimeout(()=>{
        let width = img.naturalWidth;
      let height = img.naturalHeight;
      
      window.URL.revokeObjectURL( img.src );
      if( width !==310 && height !== 325) {  
        this.isvalid=false;
        this.error = "Photo size should be 310 x 325 size"
        alert(this.error);
     }
     else{
      this.imagePreview = reader.result;
      this.img = this.imagePreview;
      this.isvalid=true;
      this.setValue(this.imagePreview)
     

     }

      },1000)
      
      
     
    }
  }
}
 setValue(img_path){
  this.contactForm.controls.image_path.setValue(img_path)
 
 }
 postData(){
  this.ser.postData(this.contactForm.value).subscribe(
    (res)=>{
      console.log(res)
      this.router.navigate(['edit']);

    }
  )
} 

}