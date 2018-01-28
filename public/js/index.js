$(document).ready(function() {
    const getQueryString = (name) => {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return Number(decodeURI(r[2]));
        }
        return null;
    };

    const blogListContent = (path, opts) => {
        $.get(path, opts,
            (result) => {
                let html = template('blog_item', result);
                $('#all_blog_article').html(html);
                
                $('#page_info').html(`一共有&nbsp;${result.count}&nbsp;条博客,
                    每页显示&nbsp;${result.limit}&nbsp;条博客,
                    一共&nbsp;${result.pages}&nbsp;页,当前第&nbsp;${result.page}&nbsp;页.`);
                
                // const path = window.location.pathname;
                history.pushState({},'', result.path + result.page);
                $('#next_page').attr('href', result.path + (result.page + 1));
                $('#prev_page').attr('href', result.path + (result.page - 1));
            },
            'json'
        );
    };
    let page, keyword, type, authPageNum;
    const showPage = n => {
        n = n ? n : 0;
        page = getQueryString('page') + n|| 1,
        keyword = $('#keyword').val(),
        type = $('#search_type').val();
    
        blogListContent('/blog-list-ajax/', {
            keyword: keyword,
            type: type,
            page: page
        });
    }
    showPage();
    $('#next_page').click(function(e) {
        e.preventDefault();
    
        showPage(1);
    });

    $('#prev_page').click((e) => {
        e.preventDefault();
        showPage(-1);
    });

    window.addEventListener('popstate', function() {
        showPage();
    }, false);

    $('#search_btn').on('click', (e) => {
        showPage();
    });

    $(document).on('click','.author a',function(){
        const $this = $(this);
        const authName = $.trim($this.text());
        authPageNum = 1;
        blogListContent('/author-list-ajax/', {
            author: authName,
            page: authPageNum
        });
        $('#back_index').show();
    });

    $('#back_index').click((e) => {
        e.preventDefault();
        history.back();
        $('#back_index').hide();
    });
});