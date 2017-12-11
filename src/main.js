// Import css/sass files here
import '../node_modules/milligram/dist/milligram.min.css';
import '../src/css/main.scss';

// Import './js/utility.js';
import { Chosen } from './js/components/handed-choices';
import { TabMenu } from "./js/components/menu";
import { SideNav } from "./js/components/sideNav";
import { ProductCard } from "./js/components/product-card";

import './js/plugins';
import './js/basic';
import './app';
import './js/components/form';

const chosen = new Chosen(
	document.querySelector('body'),
	document.querySelector('.food-app__nav-side__container'),
	document.querySelectorAll('.btn'),
	document.querySelector('.cd-side-navigation-left')
);

const tabMenu = new TabMenu(
	document.querySelector('#tabs'),
	document.querySelectorAll('.mobile-nav__link'),
	document.querySelectorAll('.c-tab'),
);

const sideNav = new SideNav(
	document.querySelector('#tabs'),
	document.querySelectorAll('.cd-side-navigation__nav__menu__list__link'),
	document.querySelectorAll('.c-tab'),
);

const productCard = new ProductCard(
	document.querySelector('#store__list'),
	'https://english-56ed3.firebaseio.com/english.json'
);

console.log('%c Class: ', 'color: #F600C0', sideNav);
console.log('%c Class: ', 'color: #F600C0', chosen);
console.log('%c Class: ', 'color: #F600C0', tabMenu);
console.log('%c Class: ', 'color: #F600C0', productCard);
