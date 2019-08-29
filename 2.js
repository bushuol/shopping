setInterval(function(){
        var a = new Date()
        var s = document.getElementById("ss1")
        s.innerHTML=a.getFullYear()+'年'+(a.getMonth()+1)+'月'+a.getDate()+'日'+a.getHours()+'时'+a.getMinutes()+'分'+a.getSeconds()+'秒'
    },1000)

$(function () {
    // 总计
    function AllPrice() {
        var selected = 0;
        var all_price = 0;
        var HTMLstr = '';
        $(".one").each(function (i) {
            if ($(this).prop("checked")) {
                selected += parseInt($(this).parents(".tr").find('.count-input').val());
                all_price += parseFloat($(this).parents(".tr").find(".subtotal").html());
                HTMLstr += '<div><img src="' + $(this).parents(".tr").find('img').prop('src') + '"><span class="del" index="' + i + '">取消选择</span></div>'
            }
        })
        $('#selectedTotal').html(selected);
        $("#priceTotal").html(all_price.toFixed(2));
        $('#selectedViewList').html(HTMLstr);

        if(selected == 0){
            $('.foot').prop('class','foot');
        }
    }
    //小计
    function getSubTotal() {
        $(".one").each(function (i) {
            var price = parseFloat($(this).parents(".tr").find(".price").html());
            var count = parseInt($(this).parents(".tr").find('.count-input').val());
            var SubTotal = parseFloat(price * count);
            $(this).parents(".tr").find(".subtotal").html(SubTotal.toFixed(2));
        })
    }
    //全选
    $('.allcheck').click(function(){
            $(".one").prop("checked", $(this).prop('checked'))
            $(".allcheck").prop("checked", $(this).prop('checked'))
        AllPrice();
    })
    //单选
    $(".one").click(function(){
        var len = $('.one').length
        var check_len = $('.one:checked').length
        if(len === check_len){
            $('.allcheck').prop('checked',true)
        }else{
            $('.allcheck').prop('checked',false)
        }
        AllPrice();
        })

    $('#selected').click(function () {
        if ($('.foot').prop('class') === 'foot'){
            if ($('#selectedTotal').html() != '0') {
                $('.foot').prop('class','foot show');
            }
        }else {
            $('.foot').prop('class','foot');
        }
    })

    $('#selectedViewList').click(function (event) {
        if ($(event.target).prop('class') == 'del') {
            var index = $(event.target).attr('index')
            var input = $('.tr').find('.one')
            for(var i=0;i<input.length;i++){
                if(i==index){
                    $(input[index]).attr('checked',false)
                    $(input[index]).click()
                }
            }
        }
    })
    //加数
    $('.add').click(function (i) {
        var val = parseInt($(this).parents(".tr").find('.count-input').val())
        $(this).parents(".tr").find('.count-input').prop('value',val+1)
        getSubTotal($(this))
        AllPrice()
    })
    //减数
    $('.reduce').click(function (i) {
        var val = parseInt($(this).parents(".tr").find('.count-input').val())
        if (val > 1) {
        $(this).parents(".tr").find('.count-input').prop('value', val - 1)
        }else{
           $(this).prop('disabled',true)
        }
        getSubTotal($(this))
        AllPrice()
    })
    //删除单行
    $('.delete').click(function (i) {
        var conf = confirm('确定要删除吗？');
        if (conf) {
            $(this).parents(".tr").remove();
            AllPrice()
        }
    })
    //输数
    $('.count-input').keyup(function (i) {
        var val = $(this).val()
        if (isNaN(val) || val < 1) {
                val = 1;
        }
        $(this).prop('value',val);
        if (val <= 1) {
            $('reduce').prop('disabled',true);
        }
        getSubTotal($(this));
        AllPrice();
    })
    //全部删除
    $('#deleteAll').click(function () {
        if ($('#selectedTotal').html() != '0') {
            var conf = confirm('确定删除所选商品吗？');
            if (conf) {
                // $('.one:checked').each(function(i){
                //     var n = $(this).parents(".tr").index()
                //     $('#cartTable').find(".tr:eq("+n+")").remove()
                // })
                $('.one').each(function (i) {
                    if($(this).prop('checked')){
                        $(this).parents('.tr').remove()
                    }
                })
            }
        }else{
            alert('请选择商品！');
        }
        AllPrice();
    })
    //初始化默认全选
    $('.allcheck').prop("checked",true)
    $('.allcheck').click()
})