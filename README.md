# 项目目录结构说明

public 存放js，css，上传文件目录等
app,config 存放业务代码和项目配置
test 存放测试代码 运行 `grunt test` 进行代码测试


`npm install`

`npm install bower -g`

`bower install bootstrap`

view 模版使用 jade

.bowerrc 文件说明
`
{
    "directory": "public/libs"  // 设置 bower install 安装插件存放的位置
}
`

项目依赖包
`
  "dependencies": {
    "bcrypt",
    "body-parser",
    "bower",
    "connect-mongo",
    "connect-multiparty",
    "cookie-session",
    "express",
    "express-session",
    "jade",
    "moment",
    "mongoose",
    "morgan",
    "underscore"
  }
`


// 开发环境依赖包
`
  "devDependencies": {
    "grunt",
    "grunt-concurrent",
    "grunt-contrib-nodemon",
    "grunt-contrib-watch",
    "grunt-mocha-test"
  }
`