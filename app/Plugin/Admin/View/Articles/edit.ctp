<?php
/**
 * Scaffold Form
 *
 * PHP 5
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the below copyright notice.
 *
 * @author     Yusuf Abdulla Shunan <shunan@maldicore.com>
 * @copyright  Copyright 2012, Maldicore Group Pvt Ltd. (http://maldicore.com)
 * @license    MIT License (http://www.opensource.org/licenses/mit-license.php)
 * @since      CakePHP(tm) v 2.1.1
 */
?>
<div class="row-fluid">
	<div class="span2"><?php $pluralHumanName="文章";$modelClass="article";?>
        <div>
			<P class="nav-header"><?php echo __d('cake', 'Actions'); ?></P>
			<ul class="nav nav-tabs nav-stacked">
				<li><?php echo $this->Html->link("文章列表", array('plugin' => 'admin', 'action' => 'index')); ?></li>
				<li><?php echo $this->Html->link("新增文章", array('plugin' => 'admin', 'action' => 'add')); ?></li>
				<li><a href="/admin/article_types">文章类型列表</a></li>
				<li><a href="/admin/article_types/add">新增文章类型</a></li>
			</ul>
		</div>
	</div>
	<div class="span10">
        <?php echo $this->Session->flash(); ?>
        <?php echo $this->BSForm->create($modelClass); ?>
			<fieldset>
				<legend>修改文章</legend>
				<?php echo $this->BSForm->input("Article.articleTitle", array('created', 'modified', 'updated',"value"=>$data["Article"]["articleTitle"])); ?>
				<?php echo $this->BSForm->input("Article.articleTypeId", array('created', 'modified', 'updated',"value"=>$data["Article"]["articleTypeId"])); ?>
				<div class="control-group">
					<label for="ArticleArticleContent">正文</label>
					<textarea name="data[Article][articleContent]" class="ckeditor"
						required="required" cols="30" rows="6" id="ArticleArticleContent"><?php echo $data["Article"]["articleContent"]?></textarea>
				</div>
				<div class="control-group">
					<label for="ArticleArticleTags">标签</label>
					<input name="data[Article][articleTags]" required="required" cols="30" rows="6" id="ArticleArticleTags" value="<?php echo $data["Article"]["articleTags"]?>"/>
				</div>
			</fieldset>  
        <?php echo $this->BSForm->end(__d('cake', 'Save')); ?>
    
	
	</div>
</div>
<?php echo $this->Html->script('jquery.validate.min'); ?>
<?php echo $this->Html->script('/ckeditor/ckeditor'); ?>
<script type="text/javascript">
$(document).ready(function(){
	$("form").validate();
});
</script>