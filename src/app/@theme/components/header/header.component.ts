import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { map, takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { RippleService } from '../../../@core/utils/ripple.service';

import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isClicked = false;
  

  private destroy$: Subject<void> = new Subject<void>();
  public readonly materialTheme$: Observable<boolean>;
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
    {
      value: 'material-light',
      name: 'Material Light',
    },
    {
      value: 'material-dark',
      name: 'Material Dark',
    },
  ];

  currentTheme = 'default';

  userMenu = [ { title: 'Log out' },
    {
      title: 'Login',
      link: '/auth/login',
    },
    {
      title: 'Register',
      link: '/auth/register',
    },
    {
      title: 'Request Password',
      link: '/auth/request-password',
    },
    {
      title: 'Reset Password',
      link: '/auth/reset-password',
    },
  ];

  public constructor(
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private breakpointService: NbMediaBreakpointsService,
    private rippleService: RippleService,
    private sidebarService: NbSidebarService,
    private authService: NbAuthService
  ) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if(token.isValid()){
          this.user = token.getPayload();
        }
      });

    this.materialTheme$ = this.themeService.onThemeChange()
      .pipe(map(theme => {
        const themeName: string = theme?.name || '';
        return themeName.startsWith('material');
      }));
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.alan);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => {
        this.currentTheme = themeName;
        this.rippleService.toggle(themeName?.startsWith('material'));
    });
  }

  screenWidth: number = screen.width;
  onResize() {
      this.screenWidth = screen.width;
  }
  showMenu() { // Вызывает раскрытие меню
      this.sidebarService.toggle(true, 'menu-sidebar');
  }


  selectedItem_1 = 'company';
  selectedItem_2 = '1-day';

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }


  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
  // CalendarLayout(event)
  // {
  //   document.querySelector('#wholePage').classList.add('pageTurnCalendar');
  //   document.querySelector('#content-start').insertAdjacentHTML('afterbegin', `

  //   <nb-layout>
  //   <div id="calendar" style="width: 100%; height: 100px; background-color: black">
  //       <nb-calendar-range-showcase></nb-calendar-range-showcase>
  //   </div>
  // </nb-layout>
  //   `)
  // }
  // <nb-calendar [date]="date" (dateChange)="handleDateChange($event)"></nb-calendar>
}
