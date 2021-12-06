import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public email:string;
  public password:string="";
  public user: any={};
  public userEmail:string;
  public userAd:string;
  public userSoyad:string;
  public kelime:string;
  public ruyalar:any;
  public userId:string;

  constructor(private activatedRoute: ActivatedRoute,public http:HttpClient) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }


  ruyaBul(){
      console.log("Kelime:"+this.kelime);
      this.http.get('https://microwebservice.net/ecodation/11eylul/mert/ruyaIndex.php?kelime_al='+this.kelime).subscribe(data=>{
      this.ruyalar=data;

      })
  }

  
  cikis(){
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userAd");
    localStorage.removeItem("userSoyad");
    localStorage.removeItem("userId");
  
  
    this.userEmail = localStorage.getItem('userEmail');
    this.userAd = localStorage.getItem('userAd');
    this.userSoyad = localStorage.getItem('userSoyad');
  
  
  }   
}
