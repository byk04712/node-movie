const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const session = require('express-session');
const morgan = require('morgan');
// 利用mongoDB作会话持久化
const MongoStore = require('connect-mongo')(session);


// 默认端口是3000，也可以使用 PORT=5555 node app.js 指定端口号启动
const port = process.env.PORT || 3000;
const app = express();
const dbUrl = 'mongodb://localhost/movie';
// 连接 mongo 数据库
mongoose.connect(dbUrl);


// 设置视图根目录
app.set('views', './app/views/pages');
// 设置默认的模版引擎
app.set('view engine', 'jade');
// 将表单的数据json格式化功能
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
	name: 'imooc',
	keys: ['imoocKey']
}));
app.use(session({
	secret: 'movie',
	store: new MongoStore({
		url: dbUrl,
		collection: 'sessions' // default sessions
	})
}));
//设置静态资源路径
app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment');
// 端口监听
app.listen(port);

require('./config/routes')(app);


// 开发环境配置
if ('development' === app.get('env')) {
	// 显示错误信息
	app.set('showStackError', true);
	// 打印日志
	app.use(morgan(':method :url :status :response-time ms'));
	// 格式化 html
	app.locals.pretty = true;
	// mongoDB信息
	mongoose.set('debug', true);
}


console.log(`Server started on port ${port}`);

