const Movie = require('../model/movie');

// 首页
exports.index = (req, res) => {
	// 配置返回的页面 views/index.jade
	Movie.fetch((err, movies) => {
		if (err) {
			res.render('common/500', {error: err});
		} else {
			res.render('index', {
				title: '天地影视-这里有你想看的，想听的，想玩的。一切拥有尽有。',
				movies: movies
			});
		}
	});
}
