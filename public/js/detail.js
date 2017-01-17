$(function() {
	$('.replyLink').on('click', function(){
		var target = $(this);
		// 回复的评论id
		var commentId = target.data('cid');
		// 回复给用户id
		var toId = target.data('tid');
		// 用来显示
		var username = target.data('name');

		$('#content').attr({
			placeholder: '回复给：' + username
		});

		if ($('#cid').length > 0) {
			$('#cid').val(commentId);
		} else {
			$('<input>').attr({
				type: 'hidden',
				id: 'cid',
				name: 'comment[cid]',
				value: commentId
			}).appendTo('#commentForm');
		}

		if ($('#tid').length > 0) {
			$('#tid').val(toId);
		} else {
			$('<input>').attr({
				type: 'hidden',
				id: 'tid',
				name: 'comment[tid]',
				value: toId
			}).appendTo('#commentForm');
		}
	});
});