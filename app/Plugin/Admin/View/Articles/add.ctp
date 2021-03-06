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
				<li><a href="/admin/article_types">文章类型列表</a></li>
				<li><a href="/admin/article_types/add">新增文章类型</a></li>
			</ul>
		</div>
	</div>
	<div class="span10">
        <?php echo $this->Session->flash(); ?>
        <?php echo $this->BSForm->create($modelClass); ?>
			<fieldset>
				<legend>新增文章</legend>
				<?php echo $this->BSForm->input("Article.articleTitle", array("label"=>array("text"=>"标题"))); ?>
				<?php echo $this->BSForm->input("Article.articleTypeId", array("label"=>array("text"=>"分类"))); ?>
				<?php echo $this->BSForm->input("Article.articleContent", array("class"=>"ckeditor","label"=>array("text"=>"正文"))); ?>
				<div class="control-group"><label for="ArticleArticleTags">标签</label>
				<input name="data[Article][articleTags]"  required="required" id="ArticleArticleTags" />
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