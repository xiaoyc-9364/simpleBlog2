$(document).ready(function() {
    
    /*
    $('button[value="submit"').click(() => {
        const titleText = $('input[name="blog_title"').val(),
            introText = $('textarea[name="blog_intro"]').val(),
            contentText = $('textarea[name="blog_content"]').val(),
            authorText = $('input[name="blog_author"]').val();

        if (titleText === '') {
            alert('博客标题不能为空!');
            $('#blog_info').on('submit', false);
            return;
        }
        if (introText === '') {
            alert('博客简介不能为空!');
            $('#blog_info').on('submit', false);
            return;
        }
        if (contentText === '') {
            alert('博客内容不能为空!');
            $('#blog_info').on('submit', false);
            return;
        }
        if (authorText === '') {
            alert('博客作者不能为空!');
            $('#blog_info').on('submit', false);
            return;
        }
        $('#blog_info').on('submit');
    });
    */
    $('button[value="submit"').click((e) => {
        const titleText = $('input[name="blog_title"').val(),
            introText = $('textarea[name="blog_intro"]').val(),
            contentText = $('textarea[name="blog_content"]').val(),
            authorText = $('input[name="blog_author"]').val(),
            submitType = $('button[value="submit"').val();

        if (titleText === '') {
            $('#warnMessage').text('博客标题不能为空')
            e.preventDefault();
            return;
        }
        if (introText === '') {
            $('#warnMessage').text('博客简介不能为空')
            e.preventDefault();
            return;
        }
        if (contentText === '') {
            $('#warnMessage').text('博客内容不能为空')
            e.preventDefault();
            return;
        }
        if (authorText === '') {
            $('#warnMessage').text('博客作者不能为空')
            e.preventDefault();
            return;
        }
        $('#warnMessage').text('');
        $.ajax({
            type:'post',
            url: '/blogs/article',
            data: {
                title: titleText,
                intro: introText,
                content: contentText,
                author: authorText,
                submit: submitType
            },
            dataType: 'json',
            success:(result) => {
                console.log(result);
                
              
            }
        });
    }) 
});