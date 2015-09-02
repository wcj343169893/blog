<span>
<?php if(!empty($data)){?>
	<?php 
		$tags = explode(" ", $data);
		foreach($tags as $ta){
			if(!empty($ta)){
				echo '<a href="/tag/'.$ta.'.html" title="">'.$ta.'</a> ';
			}
		}
	?>
<?php }?>
</span> 