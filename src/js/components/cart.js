class Cart {
	constructor(cartContainer, cartBody, cartList, cartTotal, cartTrigger, cartCount, addToCartBtn, undo, deleteBtn) {
		this.cartContainer = cartContainer;
		this.cartBody = cartBody;
		this.cartList = cartList;
		this.cartTotal = cartTotal;
		this.cartTrigger = cartTrigger;
		this.cartCount = cartCount;
		this.addToCartBtn = addToCartBtn;
		this.undo = undo;
		this.deleteBtn = deleteBtn;
		this.productId = 0;
		this.undoTimeoutId;

		this.deleteItem();
	}

	check() {
		let _ths = this;
		if(this.cartContainer.length > 0) {
			_ths.addToCartBtn.addEventListener('click', function (e) {
				e.preventDefault();
				_ths.addToCart(this);
			});
		}
	}

	//delete an item from the cart
	deleteItem() {
		this.deleteBtn.forEach(el => {
			el.addEventListener('click', function (e) {
				e.preventDefault();
				console.log(e.path[3]);
			})
		})
	}

	addToCart(trigger) {
		this.cartContainer.forEach(el => {
			let cartIsEmpty = el.classList.contains('empty');
			//update cart product list
			//addProduct();
			//update number of items
			//updateCartCount(cartIsEmpty);
			//update total price
			//updateCartTotal(trigger.data('price'), true);
			//show cart
			el.classList.remove('empty');
		});
	};

	toggleCart(bool) {
		this.cartContainer.forEach(el => {
			let cartIsOpen = (typeof bool === 'undefined') ? el.classList.contains('cart-open') : bool;
			if(cartIsOpen) {
				el.classList.remove('cart-open');
			} else {
				el.classList.add('cart-open');
			}
		});
	}

	//close cart when clicking on the .cd-cart-container::before (bg layer)
	closeOnBg() {
		let _ths = this;
		this.cartContainer.forEach(el => {
			el.addEventListener('click', function (e) {
				if(e.target === el) {
					_ths.toggleCart(true);
				}
			});
		});
	}

	//open/close cart
	cartToggle() {
		let _ths = this;
		this.cartTrigger.forEach(el => {
			el.addEventListener('click', function (e) {
				e.preventDefault();
				_ths.toggleCart();
			});
		})
	}

	init() {
		this.check();
		this.closeOnBg();
		this.cartToggle();
	}
}

export { Cart };
