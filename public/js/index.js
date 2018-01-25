$(document).ready(function() {
    let pageNum = 1;
    let searchPageNum = 1;
    const listContent = (path, opts) => {
        $.get(path, 
            opts,
            (result) => {
                let html = '';
                result.list.forEach(value => {
                    html +=  `<li>
                        <h2><a href="/blogs/?id=${value._id}">${value.title}</a></h2>
                        <p class="intro">简介:&nbsp;&nbsp;&nbsp;&nbsp;${value.intro}</p>
                        <div class="detail">
                            <span class="author">
                                作者:&nbsp;
                                <a href="javascript:;">
                                    <img src="${value.chatHead}" class="portrait"/>&nbsp;${value.author}
                                </a>
                            </span>
                            <span class="publish_time">发表时间: ${value.date}</span>
                            <span class="appraise"><a href="/blogs/?id=${value._id}">评论(${value.appraise.length})</a></span>
                            <span class="read_num"><a href="/blogs/?id=${value._id}">阅读(${value.readNum - 1})</a></span>
                            <span class="like_num">
                                    <img src="/public/images/star_click.png"/>
                                    ${value.like}
                            </span>
                        </div>
                    </li>`
                });
        
                $('#all_blog_article').html(html);
                $('#page_info').html(`一共有&nbsp;${result.count}&nbsp;条博客,
                    每页显示&nbsp;${result.limit}&nbsp;条博客,
                    一共&nbsp;${result.pages}&nbsp;页,当前第&nbsp;${result.page}&nbsp;页.`)
                pageNum = result.page;
                searchPageNum = result.page;
                authorPageNum = result.page
                // history.replaceState({},'',result.path);
                
            },
            'json'
        );
    };

    listContent('/index/', {page: pageNum});

    const toggleSearchFun = (n) => {
        const keyword = $('#keyword').val();
            type = $('#search_type').val();
        if (!keyword) {
            listContent('/index/', {page: pageNum + n}); 
            searchPageNum = 1;
            authorPageNum = 1
        } else {
            listContent('/search/', {
                keyword: keyword,
                type: type,
                page: searchPageNum + n
            });
            pageNum = 1;
            authorPageNum = 1;
        }
    }
    $('#next_page').click(() => {
        toggleSearchFun(1);
    });

    $('#prev_page').click(() => {
        toggleSearchFun(-1);
    });

    $('#search_btn').on('click', (e) => {
        const keyword = $('#keyword').val(),
            type = $('#search_type').val();
            searchPageNum = 1;
        if (!keyword) {
            listContent('/index/', {page: 1});
        } else {
            listContent('/search/', {
                keyword: keyword,
                type: type,
                page: searchPageNum
            });
        }
    });

    $('#back_index').click((e) => {
        $('#back_index').hide();
        $('#keyword').val('');
        $('#search_type').val('all');
        $('#search_btn').trigger('click');
    });

    $(document).on('click','.author a',function(){
        const $this = $(this);
        $('#back_index').show();
        $('#keyword').val($.trim($this.text()));
        $('#search_type').val('author');
        $('#search_btn').trigger('click');
    });

    /*
    $(document).on('click','.author a',function(){
        const $this = $(this);

        $.get('/author/', {
            author: $.trim($this.text()),
        }),
        (result) => {
            console.log(result);
            let html = '';
            result.list.forEach(value => {
                html +=  `<li>
                    <h2><a href="/blogs/?id=${value._id}">${value.title}</a></h2>
                    <p class="intro">简介:&nbsp;&nbsp;&nbsp;&nbsp;${value.intro}</p>
                    <div class="detail">
                        <span class="author">
                            作者:&nbsp;
                            <a href="javascript:;">
                                <img src="${value.chatHead}" class="portrait"/>&nbsp;${value.author}
                            </a>
                        </span>
                        <span class="publish_time">发表时间: ${value.date}</span>
                        <span class="comment"><a href="javascript:;">评论(0)</a></span>
                        <span class="read_num"><a href="javascript:;">阅读(0)</a></span>
                    </div>
                </li>`
            });
    
            $('#all_blog_article').html(html);
            $('#page_info').html(`一共有&nbsp;${result.count}&nbsp;条博客,
                每页显示&nbsp;${result.limit}&nbsp;条博客,
                一共&nbsp;${result.pages}&nbsp;页,当前第&nbsp;${result.page}&nbsp;页.`);
        },
        'json'
    });
    */

});