$(document).ready(function() {
    $('button[value="submit"').click((e) => {
        
            const titleText = $('input[name="blog_title"]').val(),
                introText = $('textarea[name="blog_intro"]').val(),
                contentText = $('div.blog_content').html(),
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
                    window.location.href = "/blogs/?id=" + result._id;
                    alert('发布博客成功!');
                    $('#form').find('input, textarea').val('');
                },
                error: (XMLHttpRequest, textStatus, errorThrown) => {
                    throw errorThrown;
                }
            });
    });

    $('button[value="reset"').click(() => {
        $('#form').find('input, textarea').val('');
    });
    
    $('#upload_img').click(() => {
        var formData = new FormData();
        formData.append("file",$("#files")[0].files[0]);
        $.ajax({
            url: /images/,
            type: 'post',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success:(result) => {
                document.execCommand('insertimage', false, result);
            },
            dataTypeString: 'json'
        });
        $("#files").val('');
    });

});