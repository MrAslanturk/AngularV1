import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  name: string = "";
  email: string = "";
  password: string = "";
  confirm_password: string = "";
  disabledButton;

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alerCtrl: AlertController
  ) { }

  ionViewDidEnter(){
    this.disabledButton = false;
  }
  ngOnInit() { }

  async onSubmit() {
    if(this.name==""){
        this.presentToast("Ad Soyad boş bırakılamaz");
    }else if(this.email==""){
      this.presentToast("E-posta boş bırakılamaz");
    }else if(this.password==""){
      this.presentToast("Şifre boş bırakılamaz");
    }else if(this.confirm_password!=this.password){
      this.presentToast("Şifreler eşleşmemektedir!");
    }else{
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: "Lütfen bekleyiniz..",
      });
      loader.present();
      return new Promise(resolve => {
          let body = {
            aksi: 'proses_register',
            yor_name: this.name,
            email: this.email,
            password: this.password
          }
      });
    }
  }

  async presentToast(msg){
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 1500,
      position: "top"
    });
    toast.present();
  }
}
