(function () {
	'use strict';

	/**
	 * The Tabs component.
	 * @description
	 */

	const tabs = (options) => {
		console.log(options);

		const el = document.querySelector(options.el),
			tabNavigationLinks = el.querySelectorAll(options.tabNavigationLinks),
			tabContentContainers = el.querySelectorAll(options.tabContentContainers);
		let activeIndex = 0;
		let initCalled = false;

		console.log(el);
		console.log(tabNavigationLinks);
		console.log(tabContentContainers);

		/**
		 * addActive
		 * @description Add active class to the current tab.
		 */

		function addActive() {
			for (let i = 0; i < tabNavigationLinks.length; i++) {
				tabNavigationLinks[i].classList.remove('active');
			}
			this.classList.toggle('active');
		}

		tabNavigationLinks.forEach(link => link.addEventListener('click', addActive));


		const init = () => {
			if(!initCalled) {
				initCalled = true;
				el.classList.remove('no-js');

				for(let i = 0; i < tabNavigationLinks.length; i++) {
					const link = tabNavigationLinks[i];
					handleClick(link, i);
				}
			}
		};

		const handleClick = (link, index) => {
			link.addEventListener('click', (e) => {
				e.preventDefault;
				goToTab(index);
			})
		};

		const goToTab = (index) => {
			if(index !== activeIndex && index >= 0 && index <= tabNavigationLinks.length) {
				tabContentContainers[activeIndex].classList.remove('is-active');
				tabContentContainers[index].classList.add('is-active');
				activeIndex = index;
			}
		};

		return {
			init: init,
			goToTab: goToTab
		};

	};

	window.tabs = tabs;

})();

const myTabs = tabs({
	el: '#tabs',
	tabNavigationLinks: '.pl-mobile-dictionary__nav__menu__list__link',
	tabContentContainers: '.c-tab'
});

myTabs.init();
