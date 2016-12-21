const Index = require('../app/controller/index');
const User = require('../app/controller/user');
const Movie = require('../app/controller/movie');


module.exports = function(app) {

	app.use((req, res, next) => {
		const _user = req.session.user;
		app.locals.user = _user;
		next();
	});

	// Index
	app.get('/', Index.index);

	// User
	app.get('/logout', User.logout);
	app.post('/user/signup', User.signup);
	app.post('/user/signin', User.signin);
	app.get('/admin/user/list', User.adminRequired, User.userlist);
	app.get('/signin', User.showSignin);
	app.get('/signup', User.showSignup);


	// Movie
	app.get('/admin/movie/new', User.adminRequired, Movie.admin);
	app.delete('/admin/movie/list', User.adminRequired, Movie.del);
	app.get('/admin/movie/list', User.adminRequired, Movie.list);
	app.get('/admin/movie/update/:id', User.adminRequired, Movie.update);
	app.post('/admin/movie/save', User.adminRequired, Movie.save);
	app.get('/movie/detail/:id', User.adminRequired, Movie.detail);


}