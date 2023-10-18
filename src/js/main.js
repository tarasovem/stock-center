import render from './render.js';
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

function handleFormSubmit(evt) {
	evt.preventDefault();
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

	render(data, 'table');

	localStorage.setItem('formData', JSON.stringify(data));

	closeModal();

	form.reset();
}

document.querySelector('#table').innerHTML = `
  <div class="table" id="table">
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
			<form id="modal-form">
				<div class="modal__body">
					<div class="modal__form-control">
						<label for="modal-title">Title</label>
						<input type="text" id="modal-title" name="title" placeholder="Title" required />
						<div class="modal__warning">Invalid title</div>
					</div>
					<div class="modal__form-control">
						<label for="modal-price">Price</label>
						<input type="number" id="modal-price" placeholder="0.00" min="0.00" step="0.01" pattern="\\d+(\\.\\d{2})?" name="price" required />
						<div class="modal__warning">Invalid price</div>
					</div>
					<div class="modal__form-control">
						<label for="modal-date">Date and time</label>
						<input type="datetime-local" id="modal-date" name="dateAndTime" required />
						<div class="modal__warning">Invalid date and time</div>
					</div>
				</div>
				<div class="modal__footer">
					<button class="modal__cancel" type="button">Close</button>
					<button class="modal__add" type="submit" id="form-submit">Add</button>
				</div>
			</form>
		</div>
	</div>
`;

document.addEventListener('DOMContentLoaded', render(JSON.parse(localStorage.getItem('formData')), 'table'));

document.querySelector('#burger-menu').addEventListener('click', (evt) => {
	const target = evt.target;
	target.nextElementSibling.classList.toggle('show');
});

document.querySelector('#table-add').addEventListener('click', () => {
	showModal();
	document.querySelector('#modal').addEventListener('click', closeModal);
});

document.querySelector('#modal-form').addEventListener('submit', handleFormSubmit);