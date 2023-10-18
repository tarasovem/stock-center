function formatDate(dateAndTime) {
	const date = new Date(dateAndTime);
	const day = String(date.getDate() + 1).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();
	const hours = String(date.getHours() + 1).padStart(2, '0');
	const minutes = String(date.getMinutes() + 1).padStart(2, '0');

	return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes;
}

function formatPrice(price) {
	let number = parseFloat(price);
	return number.toFixed(2);
}


function render(data, tableId) {
	if (!data) {
		return false;
	}

	data.sort((a, b) => a.dateAndTime.localeCompare(b.dateAndTime, undefined, {numeric: true}));

	const tableBody = document.querySelector(`${tableId} tbody`);

	tableBody.innerHTML = '';

	data.forEach((entry, index) => {
		const row = document.createElement('tr');
		const indexCell = document.createElement('td');
		const titleCell = document.createElement('td');
		const priceCell = document.createElement('td');
		const dataAndTimeCell = document.createElement('td');

		indexCell.textContent = index + 1;
		titleCell.textContent = entry.title;
		priceCell.textContent = formatPrice(entry.price);
		dataAndTimeCell.textContent = formatDate(entry.dateAndTime);

		row.appendChild(indexCell);
		row.appendChild(titleCell);
		row.appendChild(priceCell);
		row.appendChild(dataAndTimeCell);
		tableBody.appendChild(row);
	});
}

export default render;
