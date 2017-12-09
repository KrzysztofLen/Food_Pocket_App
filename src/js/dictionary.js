const dictionary = document.querySelector('#pl-mobile-dictionary__dictionary-list');

const createCard = (data) => {
// console.log(data);
	const cardWrapper = `<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
      <th>Height</th>
      <th>Location</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Stephen Curry</td>
      <td>27</td>
      <td>1,91</td>
      <td>Akron, OH</td>
    </tr>
    <tr>
      <td>Klay Thompson</td>
      <td>25</td>
      <td>2,01</td>
      <td>Los Angeles, CA</td>
    </tr>
    <tr>
    <td>${data.term}</td>
</tr>
  </tbody>
</table>`;
	const wrapper = document.createElement('div');
	const test = document.createElement('p');
	test.textContent = data.term;
	wrapper.appendChild(test);

	dictionary.appendChild(wrapper);
	// dictionary.innerHTML = wrapper;
}

const updateUI = (results) => {
	for (let i = 0; i < results.length; i++) {
		createCard(results[i]);
	}
}

const url = 'https://english-56ed3.firebaseio.com/english.json';

fetch(url)
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

				updateUI(results);
			});
	});

