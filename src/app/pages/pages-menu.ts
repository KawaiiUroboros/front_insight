import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Главная страница',
    icon: 'grid-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Сервисы',
    group: true,
  },
  {
    title: 'Пользователи',
    icon: 'person-outline',
    children: [
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
    ],
  },
  {
    title: 'Инфографика',
    icon: 'bar-chart-outline',
    link: '/pages/files',
  },
  {
    title: 'Взаимодействие',
    icon: 'people-outline',
  },
  {
    title: 'Файлы',
    icon: 'folder-outline',
  },
  {
    title: 'Активность',
    icon: 'activity-outline',
  },
  {
    title: 'USB носители',
    icon: 'hard-drive-outline',
  },
  {
    title: 'Приложения',
    icon: 'layers-outline',
  },
  {
    title: 'Утечки и угрозы',
    icon: 'shield-off-outline',
  },
  {
    title: 'Система и сеть',
    icon: 'globe-outline',
  },
  {
    title: 'Календарь',
    icon: 'calendar-outline',
  },
  // Нужно вниз последний блок с настройками
  {
    title: 'Настройки',
    icon: 'settings-2-outline',
  },
];
