import { AfterContentInit } from '@angular/core';
import { ServerService, User } from './../../server.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NbSidebarService } from '@nebular/theme';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  IsChangeUsersLayOut:boolean = false;
  // сайд-панель юзеров переход на телефон
  ChangeUsersLayOut(){
    this.IsChangeUsersLayOut = !this.IsChangeUsersLayOut;
  }

  users: any;

  isTabletScreen;
  isSmallScreen;
  isXSmallScreen;
  isMediumScreen;

  ngOnInit(){

    this.breakpointObserver
    .observe(Breakpoints.Small)
    .subscribe((resp) => (this.isSmallScreen = resp.matches));
    this.breakpointObserver
    .observe(Breakpoints.Medium)
    .subscribe((resp) => (this.isMediumScreen = resp.matches));
  this.breakpointObserver
    .observe(Breakpoints.Tablet)
    .subscribe((resp) => (this.isTabletScreen = resp.matches));
  this.breakpointObserver
    .observe(Breakpoints.XSmall)
    .subscribe((resp) => (this.isXSmallScreen = resp.matches));
  }

  menu: {title: string, url: string, routerLink: string, active: boolean}[] = [
    {title: 'Загрузки',  url: '../../../assets/images/user-actions/31996.svg', routerLink: '/pages/users/downloads',   active: false},
    {title: 'Скриншоты', url: '../../../assets/images/user-actions/31997.svg', routerLink: '/pages/users/screenshots', active: false},
    {title: 'Видео',     url: '../../../assets/images/user-actions/32001.svg', routerLink: '/pages/users/videos',      active: false},
    {title: 'Пароли',    url: '../../../assets/images/user-actions/12.svg', routerLink: '/pages/users/passwords',   active: false},
    {title: 'Кейлоггер', url: '../../../assets/images/user-actions/31995.svg', routerLink: '/pages/users/keylog',      active: false},
    {title: 'Документы', url: '../../../assets/images/user-actions/31998.svg', routerLink: '/pages/users/documents',   active: false},
    {title: 'Proxy',     url: '../../../assets/images/user-actions/31999.svg', routerLink: '/pages/users/proxy',       active: false},
    {title: 'Терминал',  url: '../../../assets/images/user-actions/32000.svg', routerLink: '/pages/users/terminal',    active: false},
  ];
  adaptTitle: string[] = [
    'downloads',
    'screenshots',
    'videos',
    'passwords',
    'keylog',
    'documents',
    'proxy',
    'terminal'
  ];

  firstTime: boolean = true;
  public MAINUSER:string;

  screenWidth: number = screen.width;
  screenHeight: number = screen.height;
  onResize() {
    this.screenWidth = screen.width;
    this.screenHeight = screen.height;
  }

  constructor(public server: ServerService,
    public router: Router,
    private breakpointObserver:BreakpointObserver,
    private sidebarService: NbSidebarService) {
      server.getAllUsers();
      let sectionStr = location.href.split('/')[location.href.split('/').length - 1]; 

      for (let i = 0; i < this.adaptTitle.length; i++) {
        if (sectionStr == this.adaptTitle[i]) {
          this.menu[i].active = true;
          break;
        }
      }
    }

  GetUserToRoute(uuid:string,user:User){
    if (this.firstTime && uuid == this.server.allusers[0].uuid) {
      return;
    }
    this.firstTime = false;
    this.MAINUSER = uuid;
    this.server.editUuid(uuid);
    this.server.editUser(user);
    this.router.navigate(['/pages/users/default']);
    this.menu.forEach(element => {
      element.active = false;
    });
  }

  sectionClick(section)
  {
    if (section.active) {
      this.server.editUuid(this.MAINUSER);
      this.router.navigate(['/pages/users/default']);
      section.active = false;
      return;
    }
    this.menu.forEach(element => {
      element.active = false;
    });
    section.active = true;
  }

  filterUsers() {
    this.users = this.server.allusers.filter(user => (user.full_name + user.role).toLowerCase().match("^.*" + (document.querySelector('#searchUsers') as HTMLInputElement).value.toLowerCase() + ".*$"));
  }
  filterUsersBySpecialty(selected) {

    if (selected == 'любая')
      this.users = this.server.allusers;
    else
      this.users = this.server.allusers.filter(user => user.role == selected);


  }
}
