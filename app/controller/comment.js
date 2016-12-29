const Comment = require('../model/comment');


/**
 * 电影评论
 */
exports.save = (req, res) => {
	const _comment = req.body.comment;
	const _movieId = _comment.movie;
	
	// 从 session 中获取当前的登录用户
	const _user = req.session.user;
	_comment.from = _user;

	// 判断是回复还是评论，cid代码评论的id，有值代表回复，没值代表评论
	if(_comment.cid) {
		Comment.findById(_comment.cid, (error, comment) => {
			if (error) {
				throw error;
			}
			const reply = {
				from: _user,  // 回复人，当前登录用户
				to: _comment.tid,	// 回复给谁
				content: _comment.content	//回复内容
			};
			// 把找到的评论数据添加一条回复信息
			comment.reply.push(reply);
			comment.save((error, comment) => {
				if (error) {
					throw error;
				}
				res.redirect('/movie/detail/' + _movieId);
			});
		});
	} else {	// 评论
		const comment = new Comment(_comment);

		comment.save((error, comment) => {
			if (error) {
				return res.render('common/500', {error: error});
			}
			res.redirect('/movie/detail/' + _movieId);
		});
	}

}