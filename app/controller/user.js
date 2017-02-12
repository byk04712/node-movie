const User = require('../model/user');



exports.logout = (req, res) => {
	delete req.session.user;
	// delete app.locals.user;
	res.redirect('/');
}


exports.showSignin = (req, res) => {
	res.render('signin', {
		title: '用户登录'
	});
}


exports.showSignup = (req, res) => {
	res.render('signup', {
		title: '用户注册'
	});
}


exports.signin = (req, res) => {
	const _user = req.body.user;
	// const _user = req.params('user');
	
	console.log('body = ', req.body);
	if (_user) {
		User.findOne({username: _user.username}, (err, user) => {
			console.log('findOne ',user);
			if (err) {
				return res.render('common/500', {error: err})
			}

			if (!user) {
				return res.render('signin', {
						message: '用户名或密码错误！'
					});
			}
			user.comparePassword(_user.password, (err, isMatch) => {
				if (err) {
					res.render('signin', {
						message: err.message
					});
				}
				if (isMatch) {
					// 登录成功
					// 1.更新session中的用户
					// 2.跳转到登录前请求的页面
					// 3.如果是登录页面登录的，则跳转到首页
					req.session.user = user;
					const refer = req.headers.referer;
					if (refer.indexOf('/signin') != -1) {
						res.redirect('/');
					} else {
						res.redirect(refer);
					}
				} else {
					res.render('signin', {
						message: '用户名或密码不正确'
					});
				}
			})
		});
	}
}


exports.signup = (req, res) => {
	const _user = req.body.user;

	if (_user) {
		// 检测用户是否存在
		User.find({username: _user.username}, (err, users) => {
			if (err) {
				res.render('common/500', {error: err});
			} else {
				// 如果用户已存在
				if (users && users.length > 0) {
					return res.render('signup', {message: '账号已存在！'});
				} else {		
					const user = new User(_user);			
					user.save((err, result) => {
						if (err) {
							res.render('signup', {message: err.message});
						} else {
							// 注册成功
							res.redirect('/signin');
						}
					});
				}
			}
		});
	}
}


exports.userlist = (req, res) => {
	User.fetch((err, users) => {
		if (err) {
			res.render('common/500', {error: err});
		} else {
			res.render('userlist', {
				title: '用户列表页',
				users: users
			});
		}
	});
}


/**
 * 验证是否是登录用户
 */
exports.signinRequired = (req, res, next) => {
	const user = req.session.user;
	if (!user) {
		return res.redirect('/signin');
	}
	next(); 
}


/**
 * 验证是否是管理员角色
 */
exports.adminRequired = (req, res, next) => {
	const user = req.session.user;
	// role>10 表示管理员角色
	if (!user || user.role <= 10) {
		return res.redirect('/signin');
	}
	next();
}