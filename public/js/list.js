$(function() {

	// 弹出框显示前触发
	$('#myModal').on('show.bs.modal', function(event) {
		var button = $(event.relatedTarget);
		var id = button.data('id');
		var name = button.data('name');

		$('.modal-body #selected-id').val(id);
		$('.modal-body #movie-name').html(name);
	});

	// 确定删除按钮点击
	$('.del').click(function() {
		var id = $('#selected-id').val();
		var tr = $('.item-id-' + id);
		$.ajax({
			type: 'DELETE',
			url: '/admin/movie/list?id=' + id
		}).done(function(result) {
			if (result.success == 1) {
				if (tr.length > 0) {
					tr.remove();
				}
				$('#myModal').modal('hide');
			}
		});
	});
});