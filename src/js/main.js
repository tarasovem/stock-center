import '../css/style.css';

function showModal () {
	const backdrop = document.createElement('div');
	const modal = document.querySelector('#modal');
	backdrop.classList.add('modal__backdrop');
	document.body.appendChild(backdrop);
	modal.classList.add('show');
}

function closeModal (evt) {
	const backdrop = document.querySelector('.modal__backdrop');
	const modal = document.querySelector('#modal');

	if (evt.target.classList.contains('modal') || evt.target.classList.contains('modal__close')) {
		backdrop.parentNode.removeChild(backdrop);
		modal.classList.remove('show');
	}
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
				Content
			</div>
			<div class="modal__footer">
				<button class="modal__cancel" type="button">Close</button>
				<button class="modal__add" type="button">Add</button>
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