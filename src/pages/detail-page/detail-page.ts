import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers/User';
import { GithubUsersServise } from '../../providers/github-users-servise';

import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";

/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail-page',
  templateUrl: 'detail-page.html',
})
export class DetailPage {
  user:User;
  followers: User[];
  
  width: number;
  height: number;
  radius: number;

  arc: any;
  labelArc: any;
  pie: any;
  color: any;
  svg: any;
  
    constructor(public navCtrl: NavController, public navParams: NavParams, private githubUsersSevise: GithubUsersServise) {
    this.user = navParams.get("user");
    githubUsersSevise.getUsers(this.user.followers_url)
      .subscribe(followers => {
        this.followers = followers;
      }, 
      err => console.log(err),
      () => {});
    this.width = 100;
    this.height = 100;
    this.radius = Math.min(this.width, this.height) / 2;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
    this.initSvg();
    this.drawPie();
  }
  goToDetailPage(user : User) {
    this.navCtrl.push(DetailPage, { user : user});
  }

  initSvg() {
    this.color = d3Scale.scaleOrdinal()
        .range(["red", "blue", "green", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    this.arc = d3Shape.arc()
        .outerRadius(this.radius - 5)
        .innerRadius(0);
    this.labelArc = d3Shape.arc()
        .outerRadius(this.radius - 14)
        .innerRadius(this.radius - 14);
    this.pie = d3Shape.pie()
        .sort(null)
        .value((d: any) => d.population);
    this.svg = d3.select("#Chart"+this.user.id)
        .append("svg")
        .attr("width", '10%')
        .attr("height", '10%')
        .attr('viewBox','0 0 '+Math.min(this.width,this.height)+' '+Math.min(this.width,this.height))
        .append("g")
        .attr("transform", "translate(" + Math.min(this.width,this.height) / 2 + "," + Math.min(this.width,this.height) / 2 + ")");
  }

  drawPie() {
    const StatsPieChart: any[] = [
    {age: this.user.id, population: 1},
    {age: this.user.login, population: 1},
    {age: this.user.type, population: 1}];
    let g = this.svg.selectAll(".arc")
        .data(this.pie(StatsPieChart))
        .enter().append("g")
        .attr("class", "arc");
    g.append("path").attr("d", this.arc)
        .style("fill", (d: any) => this.color(d.data.age) );
    g.append("text").attr("transform", (d: any) => "translate(" + this.labelArc.centroid(d) + ")")
        .attr("dy", ".15em")
        .attr("font-size", "12px")
        .attr("fill", "white")
        .text((d: any) => d.data.age);
  }

}
