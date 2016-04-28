var deleteBlogPost = function () {


	var id = $(event.target).closest('tr').attr('id');
	var blogPost = $(event.target).closest('tr');

	if (confirm('Are you sure you want to delete this blog post?')) {
		$.ajax({
			url: '/api/blogPosts/' + id,
			method: 'DELETE',
		}).done(function(){
			console.log('blog post deleted!');
			blogPost.remove();
		});
	}
};


$('.deleteBlogPost').on('click', deleteBlogPost);

var addBlogPost = function(event){
	event.preventDefault();

	var post = $('#post').val();
	var pic = $('#pic').val();
	var date = $('#date').val();
	var $table = $('#blogPostTable');

	var blogPost = {};
	blogPost.post = post;
	blogPost.pic = pic;
	blogPost.date = date;

		$.ajax({
			url: '/api/blogPosts',
			method: 'POST',
			data: blogPost
		}).done(function(data){

			console.log('I posted a blog post!', data);

			$table.append('<tr id=' + data._id + '> \
							<td>' + blogPost.post + '</td> \
							<td>' + blogPost.date + '</td> \
							<td><button class="btn btn-warning deleteBear">delete</button></td> \
						</tr>'
					);
			$('.deleteBlogPost').on('click', deleteBlogPost);
			$('#post').val('');
			$('#date').val('');
		});

};

$('#addBlogPost').on('click', addBlogPost);














