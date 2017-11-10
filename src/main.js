// Import css/sass files here
import '../node_modules/milligram/dist/milligram.min.css';
import '../src/css/main.scss';

// Import './js/utility.js';
import { Chosen } from './js/components/handed-choices';
import './js/plugins';
import './js/basic';
import './js/menu';
import './js/dictionary';
import './app';

const chosen = new Chosen(
	document.querySelector('body'),
	document.querySelector('.pl-md__side-chosen-container'),
	document.querySelector('.pl-md__left-handed'),
	document.querySelector('.pl-md__right-handed')
);
console.log('%c Class: ', 'color: #2F195F', chosen);
