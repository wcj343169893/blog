<section class="c_cont f_left">
	<ul class="link">
		<li>
	      	<h5 class="c_t">友情链接</h5>
      	</li>
          <li class="link_cont">
          	<?php if(!empty($links)){?>
          	<?php foreach ($links as $link){?>
              <a href="<?php echo $link["Link"]["linkAddress"]?>" title="<?php echo $link["Link"]["linkDescription"]?>"><?php echo $link["Link"]["linkTitle"]?></a>
              <?php }}?>
          </li>
      </ul>
</section>