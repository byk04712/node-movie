$(function() {

	// 登录校验
	$('#signupForm').bind('submit', function() {
		var uname = $(this).find('#username');
		var pword = $(this).find('#password');

		var username = uname.val().trim();
		var password = pword.val();

		if (!username) {
			window.alert('请输入账号');
			uname.focus();
			return false;
		}

		if (!password) {
			window.alert('请输入密码');
			pword.focus();
			return false;
		}
		return true;
	});

	// 注册校验
	$('#signinForm').bind('submit', function() {
		var uname = $(this).find('#username');
		var pword = $(this).find('#password');
		var pword2 = $(this).find('#password2');

		var username = uname.val().trim();
		var password = pword.val();
		var password2 = pword2.val();

		if (!username) {
			window.alert('请输入账号');
			uname.focus();
			return false;
		}

		if (!password) {
			window.alert('请设置您的密码');
			pword.focus();
			return false;
		}

		if (password2 != password) {
			window.alert('两次输入的密码不一致');
			pword2.select();
			return false;
		}
		return true;
	});

	// 评论校验
	$('#commentForm').bind('submit', function() {
		var content = $(this).find('#content');
		var contentVal = content.val().trim();
		if (!contentVal) {
			window.alert('请输入评论内容');
			content.focus();
			return false;
		}
		return true;
	});
});