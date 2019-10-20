import { UsersList } from './components/UsersList';
const columns = [ 'Address', 'Email', 'Firstname', 'Gender', 'Lastname', 'Login', 'Password', 'Title' ];
const limit = 10;
fetch('testtakers.json').then((res) => res.json()).then((data) => {
	const usersList = new UsersList(data, columns, limit);
	usersList.render();
});
