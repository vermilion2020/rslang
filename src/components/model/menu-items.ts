import { MenuItem } from "./types";

export const menuItems: MenuItem[] = [
  {name: 'Учебник', href: 'textbook', auth: false},
  {name: 'Словарь', href: 'dictionary', auth: false},
  {name: 'Спринт', href: 'sprint', auth: false},
  {name: 'Аудиовызов', href: 'audio', auth: false},
  {name: 'Статистика', href: 'stats', auth: true},
];