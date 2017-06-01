import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { GithubUsersServise } from '../../providers/github-users-servise';
import { User } from '../../providers/User';
import { DetailPage } from '../detail-page/detail-page';

/**
 * Generated class for the ListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-list-page',
  templateUrl: 'list-page.html',
})
export class ListPage {
  users: User[];
  constructor(public navCtrl: NavController, private githubUsersSevise: GithubUsersServise) {
      githubUsersSevise.getUsers('https://api.github.com/users')
      .subscribe(users => {
        this.users = users;
      }, 
      err => console.log(err),
      () => {});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }
  goToDetailPage(user : User) {
    this.navCtrl.push(DetailPage, { user : user});
  }

}
