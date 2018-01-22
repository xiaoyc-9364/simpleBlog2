$(document).ready(function() {
    $('#search_btn').click(function(e) {
        const keyword = $('#keyword').val(),
            type = $('#search_type').val();
        if (keyword === '') {
            e.preventDefault();
            return;
        }
        
        $.ajax({
            type: 'get',
            url: '/index/search',
            data: {
                keyword: keyword,
                type: type
            },
            dataType: 'html',
            success:(result) => {
              console.log(result);
            }
        });
    });




});