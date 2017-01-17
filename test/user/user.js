const crypto = require('crypto');
const bcrypt = require('bcrypt');
const should = require('should');
const app = require('../../app');
const mongoose = require('mongoose');
const User = mongoose.model('User');



/**
 * 获取随机字符串
 */
function getRandomString(len) {
	if (!len) {
		len = 16;
	}
	return crypto.randomBytes(Math.ceil(len / 2)).toString('hex');
}




let user;

// test
describe('<Unit Test', () => {
	// 测试用户模块
	describe('Model User:', () => {
		// 测试开始之前
		before(done => {
			user = {
				username: getRandomString(),
				password: 'password'
			};
			done();
		});

		// 保存用户之前
		describe('Before Method save', () => {
			// 保存之前应该是没有该用户的
			it('should begin without test user', (done) => {
				User.find({username: user.username}, (error, users) => {
					users.should.have.length(0);
					done();
				});
			})
		});

		// 测试保存用户
		describe('User save', () => {
			it('should begin without problems', (done) => {
				var _user = new User(user);
				_user.save(error => {
					should.not.exist(error);
					_user.remove(err => {
						should.not.exist(err);
						done();
					});
				});
			});

			// 测试用户生成的密码是否正确
			it('should password be hashed correctly', (done) => {
				var password = user.password;
				var _user  = new User(user);

				_user.save(error => {
					should.not.exist(error);
					_user.password.should.not.have.length(0);

					bcrypt.compare(password, _user.password, (err, isMatch) => {
						should.not.exist(err);
						isMatch.should.equal(true);

						_user.remove(error => {
							should.not.exist(error);
							done();
						})
					});
				});
			});

			// 测试用户角色是否默认为0
			it('should have default role 0', (done) => {
				var _user = new User(user);

				_user.save((err) => {
					_user.role.should.equal(0);

					_user.remove((err) => {
						done();
					});
				});
			});

			// 测试username是否唯一			
			it('should username be unique', (done) => {
				var _user1 = new User(user);
				_user1.save((error) => {

					var _user2 = new User(user);
					_user2.save((error) => {

						should.exist(error);

						_user1.remove((error) => {
							if (!error) {
								_user2.remove((error) => {
									done();
								})
							}
						})
					});
				});
			});
		});

		// 测试之后
		after(done => {
			done();
		});

	});
});