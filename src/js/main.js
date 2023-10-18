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

	if (evt.target.matches('.modal, .modal__close, .modal__cancel')) {
		backdrop.parentNode.removeChild(backdrop);
		modal.classList.remove('show');
	}
}

function submitForm() {
	let formData = new FormData('#modal-form');
	console.log(formData);
}

document.querySelector('#table').innerHTML = `
  <div class="table-responsive">
    <table class="table">
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
    			<td>1</td>
    			<td>Headphones</td>
    			<td>10.00</td>
    			<td>11.01.2021 10:00:00</td>
				</tr>
    		<tr>
    			<td>1</td>
    			<td>Headphones</td>
    			<td>10.00</td>
    			<td>11.01.2021 10:00:00</td>
				</tr>
    		<tr>
    			<td>1</td>
    			<td>Headphones</td>
    			<td>10.00</td>
    			<td>11.01.2021 10:00:00</td>
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

document.querySelector('#burger-menu').addEventListener('click', (evt) => {
	const target = evt.target;
	target.nextElementSibling.classList.toggle('show');
});

document.querySelector('#table-add').addEventListener('click', () => {
	showModal();
	document.querySelector('#modal').addEventListener('click', closeModal);
});

document.querySelector('#form-submit').addEventListener('click', submitForm);