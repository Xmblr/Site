$.fn.designed = function () {

    var select = $(this).find('select');
    select.hide();
    var id = (select.attr('id')+'_designed');
    var current = '';
    var proto = '<ul id="'+id+'"><li>';
    var options = '';
    select.find('option').each(function (i, el) {
        if ($(el).attr('selected')) {
            current = $(el).text();
        }
        options += '<li data-value="' + $(el).attr('value') + '">' + $(el).text() + '</li>';
    });

    if (!current) {
        current = select.find('option:first').text();
    }

    proto += '<span>' + current + '</span>';
    proto += '<ul>' + options + '</ul>';
    proto += '</li></ul>';
    $(this).after($(proto));

    var designed = $('#'+id);
    $(document).click(function(){
        designed.removeClass('hover');
    })
    designed.find('span').click(function(event){
        event.stopPropagation();
        if($(this).parents('ul').hasClass('hover')) {
            $(this).parents('ul').removeClass('hover');
        } else {
            $(this).parents('ul').addClass('hover');
        }
    })
    designed.find('li li').click(function(event){
        event.stopPropagation();
        designed.find('span').text($(this).text());
        select.val($(this).attr('data-value'));
        designed.removeClass('hover');
    });
}

$.fn.transiionEnd = function(func) {
    if(isTransitionSupport()) {
        jQuery(this).bind({
            'transitionend': func,
            'webkitTransitionEnd': func,
            'webkittransitionend': func,
            'oTransitionEnd': func
        });
    } else {
        $(document).ready(func);
    }
}

isTransitionSupport = function () {
    var prefixes = [
        "",       // Firefox
        "webkit", // Webkit-based
        "o"       // Opera
    ];

    var result = false;
    jQuery.each(prefixes, function (index, prefix) {
        if (("on" + prefix + "transitionend") in window) {
            result = true;
            return false;
        }
    })

    return result;
}

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

$(document).ready(function(){
    $(document).click(function() {
        $('.menu_top ul li.activated').removeClass('activated');
    })

    $('.menu_top ul li ul').parent('li').click(function(event){
        event.stopPropagation();
        if($(this).hasClass('activated')) {
            $(this).removeClass('activated');
        } else {
            $(this).addClass('activated');
        }
    })

    $('.menu_top ul li ul li a').click(function(event){
        event.stopPropagation();
        $(this).parents('li.activated').removeClass('activated');
    })
    if($('a.goToSupport').length)
        $('a.goToSupport').click(function(e){
            e.stopPropagation();
            e.preventDefault();
            $('#form_subject_designed li[data-value="Customer Support"]').click();

            $.scrollTo($('#form_name'), 1200, {'axis':'y', onAfter: function(){$('#form_name').focus()}});
            return false;
        })

    $('#tabs li a').click(function(){
        if(!$(this).hasClass('over'))
        {
            $('#tabs li a').removeClass('over');
            $('.right_content').hide();
            $(this).addClass('over')
            $($(this).attr('href')).show();
        }
        return false;
    });

    $('#tabs .section a').click(function(){
        if(!$(this).parent().hasClass('active_job'))
        {
            $('#tabs .section').removeClass('active_job');
            $('#tabs .punkt').slideUp();
            $(this).parent().addClass('active_job')
            $($(this).attr('href')).slideDown();
        } else {
            $('#tabs .section').removeClass('active_job');
            $('#tabs .punkt').slideUp();
        }

        return false;
    });
})