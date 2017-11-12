class TabMenu {
	constructor(tabs, tabNavLink, tabContent) {
		this.tabs = tabs;
		this.tabNavLink = tabNavLink;
		this.tabContent = tabContent;
		this.activeIndex = 0;
		this.init();
	}

	addActive() {
		let _this = this;

		this.tabNavLink.forEach(tab => tab.addEventListener('click', () => {
			for (let i = 0; i < _this.tabNavLink.length; i++) {
				_this.tabNavLink[i].classList.remove('active');
			}
			tab.classList.toggle('active');
		}));
	}

	goToTab(index) {
		if (index !== this.activeIndex && index >= 0 && index <= this.tabNavLink.length) {
			this.tabContent[this.activeIndex].classList.remove('is-active');
			this.tabContent[index].classList.add('is-active');
			this.activeIndex = index;
		}
	};

	handleClick(link, index) {
		link.addEventListener('click', (e) => {
			e.preventDefault;
			this.goToTab(index);
		})
	};

	init() {
		let _this = this;
		let initCalled = false;

		if (!initCalled) {
			// initCalled = true;
			this.tabs.classList.remove('no-js');

			for (let i = 0; i < this.tabNavLink.length; i++) {
				const link = _this.tabNavLink[i];
				this.handleClick(link, i);
			}
		}
		this.addActive();
	}
}

export {TabMenu};
