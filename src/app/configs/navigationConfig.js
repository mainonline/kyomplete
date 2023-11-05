const navigationConfig = [
  {
    id: 'dashboard',
    title: 'Главная',
    type: 'item',
    url: '/dashboard',
  },
  {
    id: 'orders',
    title: 'Отчеты',
    type: 'item',
    url: '/orders',
  },
  {
    id: 'apartments',
    title: 'Квартиры',
    type: 'item',
    url: '/apartments',
  },
  {
    id: 'manager',
    title: 'Менеджеры',
    type: 'item',
    url: '/managers',
  },
  {
    id: 'complexes',
    title: 'Объекты',
    type: 'item',
    url: '/complex',
  },
  {
    id: 'editor',
    title: 'Редак. сайта',
    type: 'item',
    url: '/editor',
    disabled: true,
  },
  {
    id: 'notifications',
    title: 'Уведомления',
    type: 'item',
    url: '/notifications',
  },
];

export default navigationConfig;
