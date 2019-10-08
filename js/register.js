$(window).load(function(){
    $(".visible").click(function(){

        var ii=$(".visible").children().first().css("display");
        console.log(ii);
        if(ii=="inline")
        {
            $(this).children().first().css("display","none");
            $(this).children().last().css("display","inline");
            $(this).prev().attr("type","text");
            
        }
        if(ii=="none")
        {
            $(this).children().first().css("display","inline");
            $(this).children().last().css("display","none");
            $(this).prev().attr("type","password");
        }
    })
    $(".area").click(function(){
        $(this).css("color","red");
        $(this).children().last().toggleClass("traaa");
        $(this).next().toggle();
    })
    $(".flag ul li").click(function(){
       var str=$(this).children().last().html();
        $(".area span").text(str);
        $(".area").children().last().removeClass("traaa");
        $(".flag").css("display","none");
    })
    $(".btn").click(function(e){

        var uname=$(".uname").val();
        var uphone=$(".phone-number").val()
        var verification=$(".verification").val()
        var upswd=$("#upswd").val();
       if(uname=="")
       {
           alert("请输入昵称")
          return false
       }
       else if(uphone=="")
       {
           alert("请输入手机号")
           return false
       }
       else if(verification=="")
       {
           alert("请输入验证码")
           return false
       }
       else if(upswd=="")
       {
           alert("请输入密码")
           return false
       }
       else{
        e.preventDefault()
        ajax({type:"post",url:"./php/islogin.php",data:"uname="+uname+"&uphone="+uphone+"&upswd="+upswd}).then(res=>{
            if(res=="注册成功"){
                window.location.href="../newFilm/login.html"
            }
            })
       }
    })
  $("button").click(function(){
        var phone=$(".phone-number").val();
        if(phone!="")
        {
            if(/^1[345789]\d{9}$/.test(Number(phone)))
            {
                var i=60
                setInterval(function(){
                    if(i>0)
                    {
                        $("button").text(`(${i}s)`);
                        $("button").css("color","#808080")
                      i--;
                    }
                  },1000)
            }
            else
            {
                alert("请输入正确的手机号");
            }      
          }
          else
          {
              alert("手机号不能为空");
          }
        })
})
