const Movie = require('../model/movie');
const Category = require('../model/category');

// 首页
exports.index = (req, res) => {
	// 配置返回的页面 views/index.jade
	Category
		.find({})
		.populate({
			path: 'movies',
			// select: 'name -_id',
			options: {
				limit: 5
			}
		})
		.exec((err, categories) => {
			if (err) {
				res.render('common/500', {error: err});
			} else {
				res.render('index', {
					title: '天地影视-这里有你想看的，想听的，想玩的。一切拥有尽有。',
					categories: categories
				});
			}
		});
}
