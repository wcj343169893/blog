<!DOCTYPE html> 
<html lang="zh-CN"> 
<head> 
<?php echo $this->Html->charset(); ?>
<meta http-equiv="Content-Language" content="zh-cn" />
<meta http-equiv="imagetoolbar" content="no" />
<meta name="MSSmartTagsPreventParsing" content="true" />
<title><?php echo $title_for_layout; ?></title>
<meta name="keywords" content="<?php echo $keywords_for_layout; ?>" />
<meta name="description" content="<?php echo $description_for_layout; ?>" />
<meta name="author" content="<?php echo $auth_for_layout?>" />
<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,initial-scale=1.0,user-scalable=no"/>
<link href="/favicon.ico" rel="shortcut icon" />
<link href="/favicon.ico" rel="Bookmark" />
<link rel="apple-touch-icon" sizes="57x57" href="touch-icon-iphone.png" />
<link rel="apple-touch-icon" sizes="72x72" href="touch-icon-ipad.png" />
<link rel="apple-touch-icon" sizes="114x114" href="touch-icon-iphone4.png" />  
<link rel="apple-touch-icon" sizes="144x144" href="apple-touch-icon-ipad3-144.png" />
<?php 
echo $this->Html->meta('icon');
// echo $this->Html->css('base');
// echo $this->Html->css('layout');
// echo $this->Html->css('master');
echo $this->Html->css('blog');
echo $this->Html->script('http://file2.mofing.com/js/b/jquery.js');
echo $this->Html->script('http://file2.mofing.com/js/b/plugins.js');
echo $this->Html->script('http://file2.mofing.com/js/b/sly.min.js');

echo $this->fetch('css');
echo $this->fetch('script');
?>
<!-- <link href='http://fonts.googleapis.com/css?family=Open+Sans|Satisfy' rel='stylesheet' type='text/css'> -->
<!--[if IE]>
<script src="http://file2.mofing.com/js/b/html5.js"></script>
<![endif]-->
</head>
<?php $action=$this->request->params["action"];$nav_index=1;switch ($action) {case "about":	$nav_index=2;break;	case "tag":	$nav_index=4;break;	case "link":$nav_index=3;break;}?>
<body>
<div class="bg"></div>
<!--bg end-->
<aside class="l_t_box"></aside>
<!--l_t_box end-->
<nav class="nav">
	<ul>
    	<li>
        	<a href="/" title="朝军的博客" class="n1 <?php echo $nav_index==1?"cu":""?>"><span class="n_01"></span><h4 class="nav-t">朝军的博客</h4></a>
            <a href="/tag/cakephp.html" title="cakephp" class="n2 <?php echo $nav_index==4?"cu":""?>"><span class="n_02"></span><h4 class="nav-t">cakephp</h4></a>
            <a href="/json/" title="json格式化"class="n3 <?php echo $nav_index==2?"cu":""?>"><span class="n_03"></span><h4 class="nav-t">json格式化</h4></a>
            <a href="/link.html" title="友情链接"class="n4 <?php echo $nav_index==3?"cu":""?>"><span class="n_04"></span><h4 class="nav-t">友情链接</h4></a>
        </li>
    </ul>
</nav>
<!--nav end-->                           
<?php if(!empty($toptags)){?>
<aside class="tags">
	<ul>
    	<li>
    	<?php foreach($toptags as $tag){
    	echo $this->Html->link($tag["Tag"]["tagTitle"],"/tag/{$tag["Tag"]["tagTitle"]}.html");
         }?>
        <a href="/tags.html" title="其他">其他</a> 
        </li>
    </ul>
</aside>
<?php }?>
<!--Tags end-->
<div class="main w_24 relative">
<hgroup class="logo_area f_left">
   	<h2 class="sentence"><?php echo $this->Html->image('hua.png',array('alt' => '走自己的路看自己的风景，找一种最合适自己的生活速度', 'border' => '0', 'width' => '76','height'=>'353'));?></h2>
   	<h1 class="logo"><a href="/">Chaojun'blog</a></h1>
</hgroup>
<?php echo $this->Session->flash(); ?>
<?php echo $this->fetch('content'); ?>
<?php //echo $this->element('sql_dump'); ?>
</div>
<!--main end-->
<footer class="footer">
	<p>Copyright ©2013-2015 www.cjblog.org</p>
</footer>
<!--footer end-->
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?9471111af14ca15e4d154634e66c0336";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>
</body>
</html>
