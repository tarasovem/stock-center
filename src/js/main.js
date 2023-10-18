import '../css/style.css';

function showModal() {
	const backdrop = document.createElement('div');
	const modal = document.querySelector('#modal');
	backdrop.classList.add('modal__backdrop');
	document.body.appendChild(backdrop);
	modal.classList.add('show');
}

function closeModal(evt) {
	const backdrop = document.querySelector('.modal__backdrop');
	const modal = document.querySelector('#modal');

	if (evt?.target.matches('.modal, .modal__close, .modal__cancel')) {
		backdrop.parentNode.removeChild(backdrop);
		modal.classList.remove('show');
	} else if (!evt) {
		backdrop.parentNode.removeChild(backdrop);
		modal.classList.remove('show');
	}
}

function submitForm() {
	const form = document.getElementById('modal-form');
	const formData = new FormData(form);
	const newData = {};

	for (let [key, value] of formData.entries()) {
		newData[key] = value;
	}

	let data = [];

	if (localStorage.getItem('formData')) {
		const oldData = localStorage.getItem('formData');
		data = JSON.parse(oldData);
		data.push(newData);
	} else {
		data = [newData];
	}

	localStorage.setItem('formData', JSON.stringify(data));

	closeModal();

	renderTable();
}

function renderTable() {
	const data = JSON.parse(localStorage.getItem('formData'));
	const tableBody = document.querySelector('.table tbody');

	if (data) {
		tableBody.innerHTML = '';
		data.forEach((entry, index) => {
			const row = document.createElement('tr');
			const indexCell = document.createElement('td');
			const titleCell = document.createElement('td');
			const priceCell = document.createElement('td');
			const dataAndTimeCell = document.createElement('td');

			const date = new Date(entry.dateAndTime);
			const day = String(date.getDate() + 1).padStart(2, '0');
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const year = date.getFullYear();
			const hours = date.getHours();
			const minutes = date.getMinutes();
			const formattedDate = day + '.' + month + '.' + year + ' ' + hours + ':' + minutes;

			indexCell.textContent = index + 1;
			titleCell.textContent = entry.title;
			priceCell.textContent = entry.price;
			dataAndTimeCell.textContent = formattedDate;

			row.appendChild(indexCell);
			row.appendChild(titleCell);
			row.appendChild(priceCell);
			row.appendChild(dataAndTimeCell);
			tableBody.appendChild(row);
		});
	}
}

document.querySelector('#table').innerHTML = `
  <div class="table">
    <table class="table__content">
    	<thead>
    		<tr>
    			<th>#</th>
    			<th>Title</th>
    			<th>Price, USD</th>
    			<th>Date and time</th>
				</tr>
			</thead>	
    	<tbody>
    		<tr>
    			<td colspan="4" style="text-align: center;">Таблица пуста</td>
				</tr>
			</tbody>	
		</table>
  </div>
	<button class="table__add" type="button" id="table-add">New item</button>
	<div class="modal" id="modal">
		<div class="modal__content">
			<div class="modal__header">
				<p class="modal__title">New item</p>
				<button class="modal__close" type="button" />
			</div>
			<div class="modal__body">
				<form id="modal-form">
					<div class="modal__form-control">
						<label for="modal-title">Title</label>
						<input type="text" id="modal-title" name="title" />
					</div>
					<div class="modal__form-control">
						<label for="modal-price">Price</label>
						<input type="number" id="modal-price" placeholder="0.00" min="0.00" step="0.01" pattern="\\d+(\\.\\d{2})?" name="price" />
					</div>
					<div class="modal__form-control">
						<label for="modal-date">Date and time</label>
						<input type="datetime-local" id="modal-date" name="dateAndTime" />
					</div>
				</form>
			</div>
			<div class="modal__footer">
				<button class="modal__cancel" type="button">Close</button>
				<button class="modal__add" type="button" id="form-submit">Add</button>
			</div>
		</div>
	</div>
`;

document.addEventListener('DOMContentLoaded', renderTable);

document.querySelector('#burger-menu').addEventListener('click', (evt) => {
	const target = evt.target;
	target.nextElementSibling.classList.toggle('show');
});

document.querySelector('#table-add').addEventListener('click', () => {
	showModal();
	document.querySelector('#modal').addEventListener('click', closeModal);
});

document.querySelector('#form-submit').addEventListener('click', submitForm);