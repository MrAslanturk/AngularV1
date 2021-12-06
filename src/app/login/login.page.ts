import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public folder: string;
  public kelime:string;
  public ruyalar:any;
  public email:string;
  public password:string="";
  public userEmail:string;
  public userAd:string;
  public userSoyad:string;
  public user: any=[];
  public userId:string;


  constructor(private activatedRoute: ActivatedRoute,public toastController: ToastController,public http:HttpClient) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.userEmail = localStorage.getItem('userEmail');
    this.userAd = localStorage.getItem('userAd');
    this.userSoyad = localStorage.getItem('userSoyad');
  }

  //Uyari
  async uyari(mesaj,renk){
    const toast = await this.toastController.create({
      message: mesaj,
      duration: 2000,
      position: 'top',
      color: renk
    });
    toast.present();
  }

  login(){
    console.log("email:"+this.email+" password:"+this.password);
  
    // http ile kullanıcı bilgileri servise ileteilecek gelecek ollan sonuca göre işlem yapılacak
        this.http.get('https://microwebservice.net/ecodation/11eylul/mert/login.php?email='+this.email+'&password='+this.password).subscribe(data=>{  
              if(data==0){
                this.uyari('Başarısız Giriş Yaptınız','danger');
              }else{
                this.user =data[0];
                this.uyari('Başarılı Giriş Yaptınız','success');
              }

           localStorage.setItem('userEmail', this.user.email);
           localStorage.setItem('userAd', this.user.ad);
           localStorage.setItem('userSoyad', this.user.soyad);
           localStorage.setItem('userId', this.user.id);
  
           this.userEmail = localStorage.getItem('userEmail');
           this.userAd = localStorage.getItem('userAd');
           this.userSoyad = localStorage.getItem('userSoyad');
           this.userId = localStorage.getItem('userId');
  
        })
  
  }

  logOut(){
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userAd");
    localStorage.removeItem("userSoyad");

  this.userEmail = localStorage.getItem('userEmail');
  this.userAd = localStorage.getItem('userAd');
  this.userSoyad = localStorage.getItem('userSoyad');

  }
}



