$(document).ready(function(){
    $('#appraise').click(() => {
        $('#appraise_text').toggle();
    });
console.log($('h1').data('id'));
    $('#click_like').on('click', (e) => {
        e.preventDefault();

        $.get('/addlike/', {
            isclick: true,
            id: $('h1').data('id')
        }, (result) => {
            $('#click_like span').text();
        }, 'json');



    })

});