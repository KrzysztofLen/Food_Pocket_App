// Import css/sass files here
import '../node_modules/milligram/dist/milligram.min.css';
import '../src/css/main.scss';

// Import './js/utility.js';
import { Chosen } from './js/components/handed-choices';
import { TabMenu } from "./js/components/menu";
import { SideNav } from "./js/components/sideNav";

import './js/plugins';
import './js/basic';
import './js/dictionary';
import './app';

const chosen = new Chosen(
	document.querySelector('body'),
	document.querySelector('.food-app__nav-side__container'),
	document.querySelectorAll('.btn'),
	document.querySelector('.cd-side-navigation-left')
);
console.log('%c Class: ', 'color: #F600C0', chosen);

const tabMenu = new TabMenu(
	document.querySelector('#tabs'),
	document.querySelectorAll('.pl-mobile-dictionary__nav__menu__list__link'),
	document.querySelectorAll('.c-tab'),
);

console.log('%c Class: ', 'color: #F600C0', tabMenu);

const sideNav = new SideNav(
	document.querySelector('#tabs'),
	document.querySelectorAll('.cd-side-navigation__nav__menu__list__link'),
	document.querySelectorAll('.c-tab'),
);

console.log('%c Class: ', 'color: #F600C0', sideNav);
