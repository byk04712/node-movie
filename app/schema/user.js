const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;


const UserSchema = new mongoose.Schema({
	username: {
		unique: true,
		type: String
	},
	password: {
		type: String
	},
	role: {
		type: Number,
		default: 0 // 0: 普通用户 1: 验证用户 2: 高级用户  >10: 管理员 >50： 超级管理员
	},
	meta: {
		crateAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
});


UserSchema.pre('save', function(next, path, val, typel) {
	const user = this;

	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}

	// 保存密码时，将密码进行加密
	bcrypt.genSalt(saltRounds, (err, salt) => {
		if (err) {
			return next(err);
		}

		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) {
				return next(err);
			}

			user.password = hash;
			next();
		});
	});
});

// 定义对象方法
UserSchema.methods = {
	comparePassword: function(_password, cb) {
		console.log('_password', _password + ' -- ' + this.password);
		bcrypt.compare(_password, this.password, (err, res) => {
			if (err) {
				return cb(err);
			}
			cb(null, res);
		})
	}
}


// 定义类方法
UserSchema.statics = {
	fetch: function(cb) {
		return this.find({}).sort('meta.createAt').exec(cb);
	}
};

module.exports = UserSchema;