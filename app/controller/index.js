const Movie = require('../model/movie');
const Category = require('../model/category');

// 首页
exports.index = (req, res) => {
	// 配置返回的页面 views/index.jade
	Category
		.find({})
		.populate({
			/*			
			path 类型：String或Object。
			　　String类型的时， 指定要填充的关联字段，要填充多个关联字段可以以空格分隔。
			　　Object类型的时，就是把 populate 的参数封装到一个对象里。当然也可以是个数组。
			select 类型：Object或String，可选，指定填充 document 中的哪些字段。
			　　Object类型的时，格式如:{name: 1, _id: 0},为0表示不填充，为1时表示填充。
			　　String类型的时，格式如:"name -_id"，用空格分隔字段，在字段名前加上-表示不填充。
			model 类型：Model，可选，指定关联字段的 model，如果没有指定就会使用Schema的ref。
			match 类型：Object，可选，指定附加的查询条件。
			options 类型：Object，可选，指定附加的其他查询选项，如排序以及条数限制等等。
			 */
			// path: 'movies',
			// select: 'name -_id',
			// model: 'Movie',
			// match: '',
			// options: {
			// 	limit: 5
			// }
			path: 'movies',
			options: {
				limit: 20
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


// 查询结果
exports.search = (req, res) => {
	// 电影分类id
	var categoryId = req.query.cid;
	// 当前页
	var page = parseInt(req.query.p) || 1;
	if (page < 1) {
		page = 1;
	}
	// 每页显示数量
	var pageSize = 4;

	// 首页点击分类进去的
	if (categoryId) {
		Category
			.findOne({_id: categoryId})
			.populate({
				path: 'movies',
				options: {
					limit: pageSize,
					skip: (page - 1) * pageSize
				}
			})
			.exec((err, category) => {
				if (err) {
					return res.render('common/500', {error: err});
				}
				// 总页数
				var totalPage = Math.ceil(category.__v / pageSize);
				res.render('result', {
					title: '电影结果页',
					key: category.name,
					movies: category.movies,
					currentPage: page,
					totalPage: totalPage,
					query: 'cid=' + categoryId
				});
			});
	} else {
		// 查询电影
		var key = req.query.q;
		Movie
			.find({title: new RegExp(req.query.q)})
			.exec((error, movies) => {
				if (error) {
					return res.render('common/500', {error: error});
				}
				var totalPage = Math.ceil(movies.length / pageSize);
				res.render('result', {
					title: '查询结果页',
					key: `查找到关于 '${key}' 的结果`,
					movies: movies,
					currentPage: page,
					totalPage: totalPage,
					query: 'q=' + key,
					q: key
				});
			});
	}
}
