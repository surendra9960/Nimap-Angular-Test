import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MeanStack';
  api = "http://localhost:3000/emp";
  data:any
  contactForm
  constructor(private formBuilder: FormBuilder,private http:HttpClient,private router : Router){}
  ngOnInit(){
    this.contactForm=this.formBuilder.group({
      id:["",Validators.required],
      first_name:["",[Validators.maxLength(20),Validators.pattern("[a-z/A-Z]*")]],
      last_name:["",[Validators.maxLength(20),Validators.pattern("[a-z/A-Z]*")]],
      email:["",[Validators.required,Validators.email]],
      phone_no:["",[Validators.required,Validators.pattern("[0-9]*"),
      Validators.minLength(10),Validators.maxLength(10)]],
      age:["20",Validators.required],
      state:[null,Validators.required],
      address:["",Validators.required],
      address_one:["",Validators.required],
      address_two:["",Validators.required],
      country:["",Validators.required],
      image_path:["",[Validators.required]],
      is_sub:["false",[Validators.required]]
    })
    // this.getData();
  }
  img='./../assets/upload-img.jpg';
  state:any = [{id:1,"state":"MH"},
  {id:2,"state":"GO"},
  {id:3,"state":"AP"},
  {id:4,"state":"MP"}];
  country:any = [
    {id:1,"country":"IN"},
  {id:2,"country":"US"},
  {id:3,"country":"CA"},
  {id:4,"country":"FR"}
  ];



  getData(){
    this.http.get(this.api).subscribe(
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

  imagePreview 
  error = ""
  upload(event){
    this.imagePreview
    window.URL = window.URL || window.webkitURL;
    let reader = new FileReader();
     if (event.target.files && event.target.files.length > 0) {
       let file = event.target.files[0];

       const img = new Image();
       img.src = window.URL.createObjectURL( file );

       reader.readAsDataURL(file);
       reader.onload = () => {
        this.imagePreview = reader.result ;
         const width = img.naturalWidth;
         const height = img.naturalHeight;
         window.URL.revokeObjectURL( img.src );
         // console.log(width+"width",height)
         if( height == 310 && width == 325 ) {
            this.img = this.imagePreview
         this.setValue(this.imagePreview)
         }
         else{
           this.error = "wrong img size"
           this.imagePreview = reader.result ;
            this.img = this.imagePreview
         this.setValue(this.imagePreview)
          //alert(this.error)
         }

         console.log(this.error,this.imagePreview)
        
     }
    }  
 } 

 setValue(img_path){
  this.contactForm.controls.image_path.setValue(img_path)
  console.log(img_path)
  //this.postData()
 }
 postData(){
  this.http.post(this.api,this.contactForm.value).subscribe(
    (res)=>{
      console.log(res)
      this.router.navigate(['edit']);

    }
  )
} 
}


export interface Post {
  first_name: string,
    last_name: string,
    email: string,
    phone_no: number,
    age: number,
    state: number,
    country: number,
    address_id: number,
    address_one: string,
    address_two: string,
    image_path:any
  }