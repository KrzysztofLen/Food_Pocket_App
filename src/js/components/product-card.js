class ProductCard {
	constructor(store, url) {
		this.store = store;
		this.url = url;

		this.init();
	}

	createCard(data) {
		let cardWrapper = `
		<div class="card">
            <div class="card__side card__side--front">
                <div class="card__picture card__picture--1">
                    &nbsp;
                </div>
                <h4 class="card__heading">
                    <span class="card__heading-span card__heading-span--1">${data.main.productName}</span>
                </h4>
                <p>${data.main.productDesc}</p>
                <div class="card__details">
                <h5>Additional</h5>
                    <ul>
                        <li>Type: ${data.additional.productType}</li>
                        <li>Gramature: ${data.additional.productWeight} ${data.additional.productUnit}</li>
                    </ul>
                </div>
            </div>
            <div class="card__side card__side--back card__side--back-1">
                <div class="card__cta">
                    <div class="card__price-box">
                        <p class="card__price-only">
                            Only
                        </p>
                        <p class="card__price-value">
                            $ ${data.main.productPrice}
                        </p>
                    </div>
                    <a href="#" class="btn btn--white">Book now</a>
                </div>
            </div>
        </div>	
	`;

		this.store.innerHTML += cardWrapper;
	}

	connectToDB() {
		fetch(this.url)
			.then((response) => {
				if (response.status !== 200) {
					console.warn('%c [Looks like there was a problem. Status code]: ' + response.status, 'color: #D32F2F');
					return;
				}
				response.json()
					.then((data) => {
						console.log('%c [From web]', 'color: #0288D1', data);

						const results = [];

						for (const key in data) {
							results.push(data[key]);
						}

						this.updateUI(results);
					});
			});
	}

	updateUI(results) {
		for (let i = 0; i < results.length; i++) {
			this.createCard(results[i]);
		}
	}

	init() {
		this.connectToDB();
	}
}


export {ProductCard};
