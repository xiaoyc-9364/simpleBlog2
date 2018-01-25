$(document).ready(function(){
    $('#click_like').on('click', (e) => {
        e.preventDefault();

        $.get('/addlike/', {
                id: $('h1').data('id')
            }, 
            (result) => {
                $('#click_like span').text(result.like);
            },
            'json'
        );
    });

    $('#submit_appraise').on('click', () => {
        const appraiseText = $('#appraise_text').val();
        if (!appraiseText) {
            $('#appraise_container .warn_text').text('内容不能为空！')
            return;
        }
        $.post('/addappraise/', {
                id: $('h1').data('id'),
                appraise: appraiseText
            },
            (result) => {
                let html = `<li>
                            <p class="appraise_content">${result.text}</p>
                            <p class="appraise_date">${result.date}</p>
                        </li>`;
                $('#appraise_list').prepend(html);
                $('#appraise_text').val('').find('.warn_text')
                $('#appraise_container .warn_text').empty();
            },
            'json'
        );
    });
});