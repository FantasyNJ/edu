# 网易教育产品部首页
## 1功能点

  1. 1.1关闭顶部通知条

点击顶部通知条中的&quot;X 不再提醒&quot;后，刷新页面不再出现此通知条（使用本地cookie实现）。点击项的hover效果见视觉稿

1.
  1. 1.2关注&quot;网易教育产品部&quot;/登录

-
  -
    - 点击关注按钮：首先判断登录的cookie是否已设置（loginSuc）
    - 如果未设置登录cookie，则弹出登录框，使用给定的用户名和密码（需要表单验证）调用服务器Ajax登录，成功后设置登录cookie
    - 登录成功后，调用关注API，并设置关注成功的cookie（followSuc）
    - 登录后&quot;关注&quot;按钮变成不可点的&quot;已关注&quot;状态。按钮的hover效果见视觉稿

1.
  1. 1.3顶部右侧导航及内容区各产品的&quot;了解更多&quot;

点击导航中的&quot;网易公开课&quot;，&quot;网易云课堂&quot;，&quot;中国大学MOOC&quot;，新窗口打开对目的页面，对应的跳转链接如下，点击项的hover效果见视觉稿。点击&quot;了解更多&gt;&quot;的跳转链接及打开方式相同。

网易公开课： [http://open.163.com/](http://open.163.com/)

网易云课堂： [http://study.163.com/](http://study.163.com/)

中国大学MOOC： [http://www.icourse163.org/](http://www.icourse163.org/)

1.
  1. 1.4轮播图

三张轮播图轮播效果：实现每5s切换图片，图片循环播放；鼠标悬停某张图片，则暂停切换；切换效果使用入场图片500ms淡入的方式。点击后新开窗口打开目的页面，对应的跳转链接如下，

banner1： [http://open.163.com/](http://open.163.com/)

banner2： [http://study.163.com/](http://study.163.com/)

banner3： [http://www.icourse163.org/](http://www.icourse163.org/)

1.
  1. 1.5左侧内容区tab切换

点击&quot;产品设计&quot;或&quot;编程语言&quot;tab，实现下方课程内容的更换。tab项的hover及选中效果见视觉稿，tab项对应的课程卡片数据见本文档的数据接口列表

1.
  1. 1.6查看课程详情

鼠标悬停&quot;产品设计&quot;或&quot;编程语言&quot;tab下的任意课程卡片，出现浮层显示该课程的课程详情；鼠标离开课程详情浮层，则浮层关闭。课程卡片即详情浮层的效果见视觉稿，课程卡片及详情数据见本文档的数据接口列表

1.
  1. 1.7右侧&quot;机构介绍&quot;中的视频介绍

点击&quot;机构介绍&quot;中的整块图片区域，调用浮层播放介绍视频。图片的hover效果见视觉稿，浮层中调用的播放器（不做浏览器兼容,可用html5）及视频内容接口见本文档的数据接口列表

1.
  1. 1.8右侧&quot;热门推荐&quot;

实现每次进入或刷新本页面，&quot;热门推荐&quot;模块中，接口返回20门课程数据，默认展示前10门课程，隔5秒更新一门课程，实现滚动更新热门课程的效果。课程数据接口见本文档的数据接口列表

1.
  1. 1.9页面布局动态适应

根据浏览器窗口宽度，适应两种视觉布局尺寸。窗口宽度&lt;1205时，使用小屏视觉布局；窗口宽度&gt;=1205时，使用大屏视觉布局。布局示意图见视觉效果

1.
# 2前后端交互接口说明

1.
  1. 1.1获取课程列表

| 请求地址格式 | http://study.163.com /webDev/couresByCategory.htm |
| --- | --- |
| 请求方式 | get类型 |
| 请求参数 | pageNo ; psize ; type ; |
| 请求参数说明 | 当前页码 ;每页返回数据个数 ;筛选类型（10：产品设计；20：编程语言） ; |
| 返回 | 课程列表数据（JSON格式字符串，需要转成对象才能在程序中使用） |
| 返回数据说明 | 需要显示的字段如下：{ &quot;totalCount&quot;: 80,//返回的数据总数 &quot;totalPage&quot;: 8,//返回的数据总页数 &quot;pagination&quot;: {&quot;pageIndex&quot; : 1, //当前页码&quot;pageSize&quot; : 10, //每页的数据个数&quot;totlePageCount&quot;: //总页数             }, &quot;list&quot; : [{&quot;id&quot;:&quot;967019&quot;,//课程ID &quot;name&quot;:&quot;和秋叶一起学职场技能&quot;,//课程名称 &quot;bigPhotoUrl&quot;:&quot;http://img1.ph.126.net/eg62.png&quot;,//课程大图 &quot; middlePhotoUrl &quot;:&quot;http://img1.ph.126.net/eg62.png&quot;,//课程中图 &quot;smallPhotoUrl&quot;:&quot; http://img1.ph.126.net/eg62.png &quot;,//课程小图 &quot; provider &quot;:&quot;秋叶&quot;,//机构发布者 &quot; learnerCount &quot;:&quot;23&quot;,//在学人数 &quot; price &quot;:&quot;128&quot;,//课程价格，0为免费 &quot;categoryName &quot;:&quot;办公技能&quot;,//课程分类 &quot;description &quot;:&quot;适用人群：最适合即将实习、求职、就职的大学生，入职一、二三年的新人。别以为那些职场老人都知道！&quot;//课程描述}]}   |


固定用户帐号：studyOnline ;  
固定用户密码：study.163.com ;  
使用Md5加密该用户数据 ;  

