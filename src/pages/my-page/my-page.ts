import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the MyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-my-page',
  templateUrl: 'my-page.html',
})
export class MyPage {
  text:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.text = navParams.get("text");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPage');
  }
  goToHomePage() {
    this.navCtrl.push(HomePage);
  }

}
