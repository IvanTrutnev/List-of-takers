import './UsersList.css';
export class UsersList {
	constructor(data = [], columns = [], limit = 1000, wrapperElem) {
		this.data = data;
		this.columns = columns;
		this.limit = limit;
		this.wrapper = wrapperElem;
	}

	generateDataDetails(data) {
		let reportStr = '';
		Object.keys(data).forEach((key) => {
			if (key === 'id' || key === 'picture') return;
			reportStr += `\n ${key}: ${data[key]}`;
		});

		return reportStr;
	}

	generateTable(data, columns) {
		const table = document.createElement('table');
		const tHead = document.createElement('thead');
		const tBody = document.createElement('tbody');
		const hRow = document.createElement('tr');

		for (let i = 0; i < columns.length; i++) {
			const th = document.createElement('th');
			th.innerHTML = columns[i];
			hRow.appendChild(th);
		}
		tHead.appendChild(hRow);
		table.appendChild(tHead);

		for (let i = 0; i < data.length; i++) {
			const bRow = document.createElement('tr');
			bRow.dataset.id = data[i].id;
			for (let j = 0; j < columns.length; j++) {
				const td = document.createElement('td');
				const fieldName = columns[j].toLowerCase();
				td.innerHTML = data[i][fieldName];
				bRow.appendChild(td);
			}
			tBody.appendChild(bRow);
		}
		table.appendChild(tBody);
		table.ondblclick = (event) => {
			if (event.target.tagName === 'TD') {
				const userID = event.target.parentNode.dataset.id;
				this.showUserInfo(userID);
			}
		};

		return table;
	}

	showUserInfo(userID) {
		const user = this.data.find((item) => item.id == userID);
		const reportData = this.generateDataDetails(user);
		alert(reportData);
	}

	makeSortable(table) {
		let tHead = table.tHead,
			i;
		tHead && (tHead = tHead.rows[0]) && (tHead = tHead.cells);
		if (tHead) i = tHead.length;
		else return;
		while (--i >= 0) {
			((i) => {
				let dir = 1;
				tHead[i].addEventListener('click', () => {
					this.sortTable(table, i, (dir = 1 - dir));
				});
			})(i);
		}
	}

	sortTable(table, col, reverse) {
		let tBody = table.tBodies[0],
			tRows = Array.prototype.slice.call(tBody.rows, 0),
			i;
		reverse = -(+reverse || -1);
		tRows = tRows.sort(
			(a, b) => reverse * a.cells[col].textContent.trim().localeCompare(b.cells[col].textContent.trim())
		);
		for (i = 0; i < tRows.length; ++i) tBody.appendChild(tRows[i]);
	}

	makeAllSortable(parent = document.body) {
		const table = parent.getElementsByTagName('table');
		let i = table.length;
		while (--i >= 0) this.makeSortable(table[i]);
	}

	render() {
		const users = this.data
			.map((item, index) => {
				item.id = index;
				return item;
			})
			.filter((_, index) => index < this.limit);
		const root = this.wrapperElem || document.createElement('div');
		root.classList.add('wrapper');
		const table = this.generateTable(users, this.columns);
		table.classList.add('users-table');
		root.appendChild(table);
		document.body.appendChild(root);
		this.makeAllSortable();
	}
}
