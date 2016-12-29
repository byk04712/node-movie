const Category = require('../model/category');



/**
 * 新增电影分类页
 */
exports.new = (req, res) => {
	res.render('category_new', {
		title: '新增电影分类',
		category: {}
	});
}


/**
 * 保存电影分类
 */
exports.save = (req, res) => {
	const _category = req.body.category;
	if (_category) {
		const category = new Category(_category);
		category.save((error, data) => {
			if (error) {
				return res.render('common/500', {error: error});
			}
			// 保存成功后，跳转到电影分类列表页
			res.redirect('/admin/category/list');
		});
	}
}

/**
 * 电影分类列表
 */
exports.list = (req, res) => {
	Category.fetch((error, data) => {
		if (error) {
			return res.render('common/500', {error: error});
		}
		res.render('category_list', {
			title: '电影分类列表',
			categories: data
		});
	});
}