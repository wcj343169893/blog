<section class="c_cont f_left">
	<ul class="link">
      	<h5 class="c_t">标签</h5>
          <li class="link_cont tag_wall">
          	<?php if(!empty($alltag)){?>
          	<?php foreach ($alltag as $tag){
          		echo $this->Html->link($tag["Tag"]["tagTitle"]."({$tag["Tag"]["tagPublishedRefCount"]})",array('controller' => 'pages','action'=>'tag',"ext"=>"html",$tag["Tag"]["tagTitle"]));
          	}}?>
          </li>
      </ul>
</section>