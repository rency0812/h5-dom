$(function(){
  // 菜单颜色切换
  $('.left-nav .dropdown li a').click(function(){
    $('.left-nav .dropdown li a').removeClass('active');
    $(this).addClass('active');
  });

  // 弹出详情页
  $('.caseItemWrapper a').click(function(){
    $('#detail').fadeIn();
  });

  // 收起详情页
  $('#detail .top .pull-right').click(function(){
    $('#detail').fadeOut();
  });

  // 显示评论框
  $('#detail .publishcomment').click(function(){
    $('#publish').show();
    return false;
  });

  // 隐藏弹窗
  $('body.colletion .grey').click(function(){
    $('#modal').hide();
  });
});

//收藏
function collect(obj){
  var type = $(obj).attr('data-type');
  if(type == 0){
    $(obj).addClass('collect');
    $(obj).attr('data-type',1);
  }else{
    $(obj).removeClass('collect');
    $(obj).attr('data-type',0);
  }
}

// 菜单收放
function toggleMenu(obj){
  var status = $(obj).attr('data-status');
  if(status == 'close'){
    $(obj).attr('data-status','open');
    $('.left-nav').animate({'width':'100%','height':'90%'});
    $('body').css('overflowY','hidden');
  }else{
    $(obj).attr('data-status','close');
    $('.left-nav').animate({'width':0,'height':0});
    $('body').css('overflowY','scroll');
  }
}

// 发布评论
function publishcomment(obj){
  var user = '管理员';
  var comment = $(obj).siblings('input').val();
  var string = '';
  string += '<li class="clearfix"><span class="user">'+user+'</span><span class="comments">'+comment+'</span></li>';
  $('ul.comments').append(string);
  jQuery("html,body").animate({scrollTop: 1000000}, 1000);
  return false;
}

// 确认删除弹窗
function modal(obj){
  var index = $(obj).parents('.caseWrapper').index();
  $('#modal .green').attr('data-id',index);
  $('#modal').show();
}

// // 删除条目
function del(obj){
  var index = $(obj).attr('data-id');
  var num = $('body.colletion .caseWrapper').length;
  $('body.colletion .caseWrapper').eq(index).remove();
  $('#modal').hide();
  if(num == 1) {
    var string = '<div class="description">';
    string += '<div class="icon"><img src="images/null.png" /></div>';
    string += '<p>你还没有收藏H5案例</p>';
    string += '<p>请去案例大厅看看吧</p>';
    string += '</div>';
    $('#main').append(string);
  }
}


function checkTel(obj){
  var is_check=true;
  var reg=/^1[3-9]\d{9}$/;
  if(!reg.test(obj)){
    alert('请填写正确的手机号码');
    is_check=false;
  }
  return is_check;
}

function checkEmail(obj){
  var is_check=true;
  var reg=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
  if(!reg.test(obj)){
    alert('请填写正确的邮箱号码');
    is_check=false;
  }
  return is_check;
}

/*
  分享页面验证
*/
function shareCheck(){
    //var reg=/^1[3-9]\d{9}$/;
    $('._itemInput').each(function(){
      var val=$(this).val();
      if(val==''){
        $(this).addClass('shareNotice');
        $(this).focus();
      }else{
        $(this).removeClass('shareNotice');
      }
      //获取手机输入框的id
      var id= $(this).attr("id");
      if(id=='shareTel'){
        var tel=$(this).val();
        if(!checkTel(tel)){
          $(this).focus();
        }
      }
    });
  }

  /*
    承接H5页面的验证
  */
    function untakeCheck(){
    $('.itemInput,.contactItemInput').each(function(){
      var val=$(this).val();
      if(val==''){
        $(this).addClass('untakeNotice');
        // $(this).focus();
      }else{
            $(this).removeClass('untakeNotice');
            //验证团队人数
            var attrName=$(this).attr('name');
            if(attrName=='teamNum'){
                 if(isNaN(val)){
                  alert('团队人数只能填写数字');
                  $(this).focus();
                  return false;
                }
            }

            //验证手机
            if(attrName=='contactTel'){
              if(!checkTel(val)){
                $(this).focus();
                return false;
              }
            }

            //验证email
            if(attrName=='contactEmail'){
              if(!checkEmail(val)){
                 $(this).focus();
                 return false;
              }
            }
      }

    });
  }