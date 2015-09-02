<div id="article_list">
	<!--logo end-->
	<aside class="list_area f_right" id="down">
	   	<?php if(!empty($sumcount)){?>
	   	<?php foreach ($data as $article){?>
	    <section class="list relative item"><?php $link="/blog/".$article["Article"]["oId"];?>
			<h2 class="t"><?php echo $this->Html->link($article["Article"]["articleTitle"]." - ".$article["ArticleType"]["name"],$link)?></h2>
	         <blockquote class="cont">
	         	<?php echo $article["Article"]["articleAbstract"];?>
	         	<?php echo $this->Html->link("查看全文",$link);?>
	         </blockquote>
	         <footer class="article">
	         	<span>Tags:</span>
	             <?php echo $this->element("article_tags",array("data"=>$article["Article"]["articleTags"]))?>
	         </footer>
			<time class="time"><?php echo $this->Time->format("Y-m-d",$article["Article"]["articleCreateDate"])?></time>
	     </section>
	     <?php }?>
	     <?php }?>
	</aside>
	<div id="scrollbar" class="slyscrollbar">
		<div class="handle">
			<div class="mousearea"></div>
		</div>
	</div>
</div>
<div id="page_nav" style="display:none;">
	<?php if($page<$sumPage){
		$nextPage=$page+1;
			echo $this->Html->link($nextPage,array('controller' => 'pages', 'action' => 'display',"ext"=>"html",$nextPage));
	}?>
</div>
<?php echo $this->Html->script("jquery.masonry",array("inline"=>false));?>
<?php echo $this->Html->script("jquery.infinitescroll.min",array("inline"=>false));?>
<?php echo $this->Html->script("infinite",array("inline"=>false));?>