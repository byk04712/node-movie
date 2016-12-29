const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


/**
 * 评论 schema
 */
const CommentSchema = new Schema({
	// 评论的电影
	movie: {
		type: ObjectId,
		ref: 'Movie'
	},
	// 评论人
	from: {
		type: ObjectId,
		ref: 'User'
	},
	// 评论人当下的所有回复信息
	reply: [{
		// 回复的人
		from: {
			type: ObjectId,
			ref: 'User'
		},
		// 回复给谁
		to: {
			type: ObjectId,
			ref: 'User'
		},
		// 回复的内容
		content: String,
		// 回复时间
		replyTime: {
			type: Date,
			default: Date.now()
		}
	}],
	// 评论的内容
	content: String,
	commentTime : {
		type: Date,
		default: Date.now()
	}
});


module.exports = CommentSchema;