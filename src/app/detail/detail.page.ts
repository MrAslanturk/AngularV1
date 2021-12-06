import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  public detay:any=[];
  public adi:any=[];
  public userId:any;
  public ruyaNo:any;
  public gorenler:any;
  
  constructor(private activatedRoute: ActivatedRoute,public http:HttpClient) { }

  ngOnInit() {
    
    this.adi = this.activatedRoute.snapshot.paramMap.get('adi');
    this.detay = this.activatedRoute.snapshot.paramMap.get('aciklama');

    this.userId = localStorage.getItem('userId');
    this.ruyaNo = this.activatedRoute.snapshot.paramMap.get('id');

    //http database kayıt
    this.http.get('https://microwebservice.net/ecodation/11eylul/mert/ruya_gor.php?ruya_id='+this.ruyaNo+'&user_id='+this.userId).subscribe(data=>{
      console.log("Başarı ile gönderildi");
      this.gorenler=data;
    })
  }

}
