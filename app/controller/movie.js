const Movie = require('../model/movie');
const _ = require('underscore');


exports.admin = (req, res) => {
	// 配置返回的页面 views/admin.jade
	res.render('admin', {
		title: '电影录入页',
		movie: {
			title: '',
			doctor: '',
			country: '',
			language: '',
			poster: '',
			flash: '',
			year: '',
			summary: ''
		}
	});
}


exports.del = (req, res) => {
	var id = req.query.id;

	if (id) {
		Movie.remove({_id: id}, (err, movie) => {
			if (err) {
				res.render('common/500', {error: err});
			} else {
				res.json({success: 1});
			}
		});
	}
}


exports.list = (req, res) => {

	Movie.fetch((err, movies) => {
		if (err) {
			res.render('common/500', {error: err});
		} else {
			res.render('list', {
				title: '电影列表页',
				movies: movies
			})
		}
	});
}


exports.update = (req, res) => {
	var id = req.params.id;

	if (id) {
		Movie.findById(id, (err, movie) => {
			if (err) {
				res.render('common/500', {error: err});
			} else {
				res.render('admin', {
					title: '电影修改页',
					movie: movie
				})
			}
		});
	} else {
		res.render('common/500', {error: new Error('请求的页面不存在！')})
	}
}


exports.save = (req, res) => {
	// 获取表单提交过来的ID
	var movieObj = req.body.movie;
	var id = movieObj.id;
	var newObj;

	// 没有 ID 则是新增，否则是修改操作
	if (id !== 'undefined') {
		Movie.findById(id, (err, movie) => {
			if (err) {
				res.render('common/500', {error: err});
			} else {
				// 属性合并
				newObj = _.extend(movie, movieObj);
				// 保存并跳转到详情页
				newObj.save((error, result) => {
					if (error) {
						res.render('common/500', {error: error});
					} else {
						res.redirect('/admin/movie/list');
					}
				});
			}
		})
	} else {
		newObj = new Movie({
			doctor: movieObj.doctor,
			title: movieObj.title,
			language: movieObj.language,
			country: movieObj.country,
			summary: movieObj.summary,
			flash: movieObj.flash,
			poster: movieObj.poster,
			year: movieObj.year
		});
		newObj.save((err, result) => {
			if (err) {
				res.render('common/500', {error: err});
			} else {
				res.redirect('/movie/detail/' + result._id);
			}
		});
	}
}


exports.detail = (req, res) => {
	const id = req.params.id;
	if (id) {
		Movie.findById(id, (err, movie) => {
			if (err) {
				res.render('common/500', {error: new Error('没有找到对应的资源')});
			} else {
				// 配置返回的页面 views/detail
				res.render('detail', {
					title: movie.title,
					movie: movie
				});
			}
		});
	} else {
		res.render('common/404');
	}
}
