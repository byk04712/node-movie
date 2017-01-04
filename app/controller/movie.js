const Movie = require('../model/movie');
const Comment = require('../model/comment');
const Category = require('../model/category');
const _ = require('underscore');


exports.admin = (req, res) => {
	// 配置返回的页面 views/admin.jade
	Category.find({}, (error, categories) => {
		if (error) {
			return res.render('common/500', {error: error});
		}
		res.render('admin', {
			title: '电影录入页',
			movie: {},
			categories: categories
		});
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


/**
 * 电影列表页
 */
exports.list = (req, res) => {
	Movie
		.find({})
		.populate('category', 'name')
		.exec((err, movies) => {
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


/**
 * 电影修改页
 */
exports.update = (req, res) => {
	var id = req.params.id;

	if (id) {
		Category.find({}, (err, categories) => {
			Movie.findById(id, (err, movie) => {
				if (err) {
					res.render('common/500', {error: err});
				} else {
					res.render('admin', {
						title: '电影修改页',
						movie: movie,
						categories: categories
					})
				}
			});
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
	if (id) {
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
		newObj = new Movie(movieObj);
		// 保存电影
		newObj.save((err, result) => {
			if (err) {
				return res.render('common/500', {error: err});
			}
			const categoryId = newObj.category;
			// 保存电影分类信息
			Category.findById(categoryId, (err, category) => {
				if (err) {
					return res.render('common/500', {error: err});
				}
				// 将电影添加到电影分类数组中
				category.movies.push(result._id);

				category.save((error, cate) => {
					if (error) {
						return res.render('common/500', {error: err});
					}
					res.redirect('/movie/detail/' + result._id);
				})
			});
		});
	}
}


/**
 * 电影详情页（
 * 		可以使用异步的方式加载电影详情页，先显示电影信息，然后异步加载评论等其他信息
 * 	）
 * 1.首先查到电影数据
 * 2.根据电影id查询评论列表
 */
exports.detail = (req, res) => {
	const id = req.params.id;
	if (id) {
		Movie
			.findOne({_id: id})
			.populate('category', 'name')
			.exec((err, movie) => {
				if (err) {
					return res.render('common/500', {error: new Error('没有找到对应的资源')});
				}

				Comment
					.find({movie: movie})
					.populate('from', 'username')	// populate 用来获取关联表中的字段，如果第二个参数不写 username,将返回 user表中所有字段
					.populate('reply.from reply.to', 'username')
					.exec((err, comments) => {
						if (err) {
							return res.render('common/500', {error: new Error('电影评论数据异常')});		
						}
	// console.log('comments = ', comments);
						// 配置返回的页面 views/detail
						res.render('detail', {
							title: movie.title,
							movie: movie,
							comments: comments
						});
					});
			});
	} else {
		res.render('common/404');
	}
}
