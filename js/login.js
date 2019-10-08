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
    $("#note").click(function(){
        $("#cod").css("display","block");
        $("#cyp").css("display","none");
        $(".register-right").css({"border-bottom":"2px solid #fff","color":"black"});
        $(".register-left").css({"border-bottom":"2px solid #e74b3b","color":"#e74b3b"});
   
    })
    $("#pwd").click(function(){
        $("#cod").css("display","none");
        $("#cyp").css("display","block");
        $(".register-right").css({"border-bottom":"2px solid #e74b3b","color":"#e74b3b"});
        $(".register-left").css({"border-bottom":"","color":""});
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
        $(".btn").click(function(e){
            var uphone=$(".phone-number").val()
            var upswd=$("#upswd").val();
            e.preventDefault()
            ajax({type:"post",url:"./php/signin.php",data:"uphone="+uphone+"&upswd="+upswd}).then(res=>{
                console.log(11111) 
                console.log(res) 
                if(res=="true")
                {
                    window.location.href="../newFilm/index.html"
                }
                else{
                    alert("手机号或密码错误")
                }
                })
           
        })
})