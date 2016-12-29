const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;



// 定义模型
const MovieSchema = new Schema({
	category: {
		type: ObjectId,
		ref: 'Category'
	},
	doctor: {
		type: String,
		default: ''
	},
	title: {
		type: String,
		default: ''
	},
	language: {
		type: String,
		default: ''
	},
	country: {
		type: String,
		default: ''
	},
	summary: {
		type: String,
		default: ''
	},
	flash: {
		type: String,
		default: ''
	},
	poster: {
		type: String,
		default: ''
	},
	year: {
		type: String,
		default: ''
	},
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
});



// 中间价
// save 前执行
MovieSchema.pre('save', function(next, path, val, typel) {
	// 如果是新增
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}

	// 流程往下走
	next();
});



// 静态业务方法
MovieSchema.statics = {
	fetch: function(cb) {
		return this.find({}).sort('meta.updateAt').exec(cb);
	},
	findById: function(id, cb) {
		return this.findOne({_id: id}).exec(cb);
	}
}


module.exports = MovieSchema;