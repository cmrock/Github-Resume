import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../user.service';
import * as _ from "lodash";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    this.getRepositories();
    this.getOwnerFullName();
  }

  fullUserName: string;
  allLanguages = [];

  // get username parameter from url snapshot
  username = this.route.snapshot.params.username;
  /*
   * @description
   * Function to get owner's full name
   * */
  getOwnerFullName() {

    // calling getOwnerFullName service by passing username

    this.userService.getOwnerFullName(this.username)
      .subscribe(user => {
        this.fullUserName = user;
      })
  }
  /*
  * @description
  * Function to get all the repositories by username
  * */
  getRepositories() {
    let allLangNamesInArray = [];
    this.allLanguages = [];

    // calling getReposByUserName service by passing username

    this.userService.getReposByUserName(this.username)
      .subscribe(repos => {
        /*
        * Function to get all the languages from all repositories
        * */
        this.getAllLanguages(this.username, repos).then((result) => {
          let allLangsOfRepo: any = result;
          if (allLangsOfRepo && allLangsOfRepo.length > 0) {
            allLangsOfRepo.forEach((val, key) => {
              allLangNamesInArray = allLangNamesInArray.concat(Object.keys(val));
            });
            this.allLanguages = _.uniq(allLangNamesInArray);
          }
        });
      });
  }

  /*
  * @params {username, repositories}
  * @description
  * Function to return languages from each repositories individually
  * */
  getAllLanguages(username, repositories) {
    let arryOfLang = [];
    let promise = new Promise((resolve, reject) => {
      repositories.map(val => {

        // calling getLanguagesByRepoName service by passing username and repository

        this.userService.getLanguagesByRepoName(username, val)
          .subscribe(lang => {
            arryOfLang.push(lang);
            if(arryOfLang.length === repositories.length){
              resolve(arryOfLang);
            }
          });
      });
    })
    return promise;
  }
}
