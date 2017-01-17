$(function() {

	$('#doubanMovie').blur(function() {
		var input = $(this);
		var movieId = input.val().trim();
		if (movieId) {
			$.ajax({
				url: 'https://api.douban.com/v2/movie/subject/' + movieId,
				cache: true,
				crossDomain: true,
				dataType: 'jsonp',
				jsonp: 'callback',
				success: function(data) {
					$('#inputTitle').val(data.title);
					$('#inputDocotor').val(data.directors[0].name);
					$('#inputCountry').val(data.countries[0]);
					$('#inputLanguage').val('英语');
					$('#inputPoster').val(data.images.large);
					$('#inputFalsh').val(data.mobile_url);
					$('#inputYear').val(data.year);
					$('#inputSummary').val(data.summary);

					var genre = data.genres[0];

					// 页面上已有的电影分类
					var cks = [];
					$('#genreOptions > label.radio-inline').text(function(index, text) {
						cks.push(text.trim());
					});
					var index = cks.indexOf(genre);
					// 不存在该电影类型时才添加
					if (index == -1) {
						var label = $('<label>').addClass('radio-inline')
							.html("<input type='radio' name='movie[category]' value='" + genre + "' checked />" + genre);
						$('#genreOptions').append(label);
					}
					// 存在时，则将其设置为勾选状态
					else {
						$($('input:radio')[index]).attr('checked', true);
					}
				},
				error: function() {
					alert('输入的电影ID有误或该电影不存在！');
				}
			});
		}
	});

});