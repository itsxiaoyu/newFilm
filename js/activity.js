var navVis = $('#nav');
var lunboImg = $('.act_screen>img');
var lunboTitle = $('.side_title>h3');
var lunboContent = $('.side_title>p');
var pageSize = 12;

var lunboSpeed = 5000;

$(document).scroll(function () {
  if ($(document).scrollTop() > 100) {
    navVis.css('top', '-60' + 'px');
  } else {
    navVis.css('top', 0);
  };
})

$(document).ready(function () {
  $.ajax({
    url: './php/act-lunbo-source.php',
    type: 'get',
    success: (result) => {
      result = JSON.parse(result);
      var html = '';
      for (var i = 0; i < result.length; i++) {
        html += `<span></span>`
      }
      $('.img-swiper').html(html);
      $('.img-swiper>span:first').addClass('span-active');
      var i = 0;
      var timerId = setInterval(() => {
        if (i > result.length - 1) {
          i = 0;
        }
        lunboImg.attr('src', result[i].imgSrc);
        lunboTitle.text(result[i].imgTitle);
        lunboContent.text(result[i].imgContent);
        i++;
        clearInterval(timerId);

        timerId = setInterval(() => {
          if (i > result.length - 1) {
            i = 0;
          }
          if ( $('.span-active').next()[0]) {
            var sm = $('.span-active');
            sm.next().addClass('span-active');
            sm.removeClass('span-active');
          } else {
            $('.img-swiper>span:last').removeClass('span-active');
            $('.img-swiper>span:first').addClass('span-active');
          }
          lunboImg.attr('src', result[i].imgSrc);
          lunboTitle.text(result[i].imgTitle);
          lunboContent.text(result[i].imgContent);
          i++;
        }, lunboSpeed);
      }, 0);

    }
  })

  //生成主体内容
  createAll();

})


//创造全部内容函数
function createAll() {
  $.ajax({
    url: './php/act-contents.php',
    type: 'get',
    success: function (result) {
      result = JSON.parse(result);
      createCon(result);
    }
  })

  $.ajax({
    type: 'get',
    url: './php/actall-contents.php',
    success: (result) => {
      result = JSON.parse(result);
      createPage(result);
    }
  })
}



//构造分页函数
function createPage(result) {
  var count = result.length;
  var pageNum = Math.ceil(count / pageSize);
  var html = `<li>
  <a href="#" aria-label="Previous" class='page_previous'>
    <span  aria-hidden="true"><</span>
  </a>
</li>
`
  for (var i = 0; i < pageNum; i++) {
    i == 0 ? html += `<li class='page_a'><a class='page-active' href="#">${i + 1}</a></li>` : html += `<li class='page_a'><a href="#">${i + 1}</a></li>`;
  }
  html += `<li>
  <a href="" aria-label="Next" class='page_next'>
    <span  aria-hidden="true">></span>
  </a>
</li>`;

  $('.pagination').html(html);
  if (pageNum == 1) {
    $('.page_next').css('display', 'none');
  }
}

//状态判断函数 
function statusContent(item) {
  if (parseInt(item) == 0) {
    return {
      act_status: '报名中',
      act_color: 'rgb(231,75,59)'
    };
  } else if (parseInt(item) == 1) {
    return {
      act_status: '进行中',
      act_color: 'rgb(250,194,28)'
    };
  } else if (parseInt(item) == 2) {
    return {
      act_status: '展映中',
      act_color: 'rgb(250,194,28)'
    };
  } else {
    return {
      act_status: '已结束',
      act_color: 'rgb(240,240,240)'
    };
  }
}




//根据ajax请求结果生成内容
function createCon(result) {
  var html = '';
  for (var item of result) {
    var statusObj = statusContent(item.contentsStatus)
    html += `<li class='active-item'>
          <a href=""><img class=cover src="${item.contentsImg}" alt=""></a>
          <div class='content'>
            <div class="content-title">
            <a href="javaScript:void(0)">
                ${ item.contentsTitle}
                </a>
                <span style='background-color:${ statusObj.act_color}'>${statusObj.act_status}</span>
            </div>
            <div class='time-list'>
              <span class='glyphicon glyphicon-time'></span>
               ${ item.contentDate}
            </div>
          </div>
        </li>`
  }
  $('.active-list').html(html);
}


$('.pagination').on('click', '.page_a>a', (e) => {
  var num = parseInt($(e.target).text());

  num > 1 ? $('.page_previous').css('display', 'block') : '';
  num == 1 ? $('.page_previous').css('display', 'none') : '';
  num == $('.page_a').length ? $('.page_next').css('display', 'none') : '';
  num < $('.page_a').length ? $('.page_next').css('display', 'block') : '';


  var pageStart = (num - 1) * 12;
  var pageEnd = pageSize;
  $('.page_a>a').removeClass('page-active');
  $(e.target).addClass('page-active');

  if ($('.span-all>span').text() == $('.act-all').text()) {
    var url = './php/act-page.php';
    defStatus(url, pageStart, pageEnd);
  } else if ($('.span-all>span').text() == $('.act-name').text()) {
    var url = './php/status-name.php';
    defStatus(url, pageStart, pageEnd);
  } else if ($('.span-all>span').text() == $('.act-now').text()) {
    var url = './php/status-now.php';
    defStatus(url, pageStart, pageEnd);
  } else if ($('.span-all>span').text() == $('.act-video').text()) {
    var url = './php/status-video.php';
    defStatus(url, pageStart, pageEnd);
  } else {
    var url = './php/status-end.php';
    defStatus(url, pageStart, pageEnd);
  }

  e.preventDefault();
})

//不同类型的post请求分页
function defStatus(url, pageStart, pageEnd) {
  $.ajax({
    type: 'post',
    url: url,
    data: {
      pageStart: pageStart,
      pageEnd: pageEnd
    },
    success: function (result) {
      result = JSON.parse(result);
      console.log(result);
      createCon(result);
    }

  })
}



//分页条左箭头执行
$('.pagination').on('click', '.page_previous', e => {
  var index = $('.page-active').text();
  var th = $('.page-active');
  if (index > 1) {
    th.removeClass('page-active');
    th.parent().prev().children().click();
  } else {
    return false;
  }
  e.preventDefault();
})

//分页条左箭头执行
$('.pagination').on('click', '.page_next', e => {
  var index = $('.page-active').text();
  var th = $('.page-active');
  if (index < 6) {
    th.parent().next().children().click();
  } else {
    return false;
  }
  e.preventDefault();
})


//全部内容区点击切换显示
function statusShow(url, curl) {
  $('.span-all>span').text($(this).text());
  $.ajax({
    type: 'get',
    url: url,
    success: function (result) {
      result = JSON.parse(result);
      createPage(result);
    }
  })

  $.ajax({
    type: 'get',
    url: curl,
    success: function (result) {
      result = JSON.parse(result);
      createCon(result);
    }
  })
}





//全部数据显示
$('.act-all').click(function (e) {
  $('.span-all>span').text($(this).text());
  createAll();
  e.preventDefault();
})


//报名中的数据显示
$('.act-name').click(function (e) {
  var url = './php/status-name-num.php';
  var curl = './php/status-name-page.php';

  statusShow.call(this, url, curl);
  e.preventDefault();
})

//进行中的数据显示
$('.act-now').click(function (e) {
  var url = './php/status-now-num.php';
  var curl = './php/status-now-page.php';
  statusShow.call(this, url, curl);
  e.preventDefault();
})

//展映中的数据显示
$('.act-video').click(function (e) {
  var url = './php/status-video-num.php';
  var curl = './php/status-video-page.php';
  statusShow.call(this, url, curl);
  e.preventDefault();
})

//已经结束的数据显示
$('.act-end').click(function (e) {
  var url = './php/status-end-num.php';
  var curl = './php/status-end-page.php';
  statusShow.call(this, url, curl);
  e.preventDefault();
})


//中部导航条点击函数效果
$('.status-nav-ul>ul>li>a').click(function(e){
  e.preventDefault();
  $('.middle-active').removeClass('middle-active');
  $(this).addClass('middle-active');
})