var deleteBear = function () {
	var id = $(event.target).closest('tr')attr('id');

	aler('The id of this bear is: ' + id);

}


$('.deleteBear').on('click', deleteBear);





