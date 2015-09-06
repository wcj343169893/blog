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
				<li><?php echo $this->Html->link("修改文章", array('plugin' => 'admin', 'action' => 'edit',$data["Article"]["oId"])); ?></li>
				<li><a href="/admin/article_types">文章类型列表</a></li>
				<li><a href="/admin/article_types/add">新增文章类型</a></li>
			</ul>
		</div>
	</div>
	<div class="span10">
			<fieldset>
				<legend>查看文章</legend>
				<div class="control-group">
					<label for="ArticleArticleContent">标题</label>
					<div><?php echo $data["Article"]["articleTitle"]?></div>
				</div>
				<div class="control-group">
					<label for="ArticleArticleContent">分类</label>
					<div><?php echo $data["ArticleType"]["name"]?></div>
				</div>
				<div class="control-group">
					<label for="ArticleArticleTags">标签</label>
					<div><?php echo $data["Article"]["articleTags"]?></div>
				</div>
				<hr>
				<div class="control-group">
					<label for="ArticleArticleContent">正文</label>
					<div><?php echo $data["Article"]["articleContent"]?></div>
				</div>
				
			</fieldset>  
	</div>
</div>