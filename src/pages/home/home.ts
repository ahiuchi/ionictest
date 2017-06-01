import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyPage } from '../my-page/my-page';
import { ListPage } from '../list-page/list-page';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToMyPage() {
    this.navCtrl.push(MyPage, { text : "Text from Home"});
  }
  goToListPage() {
    this.navCtrl.push(ListPage);
  }

}
