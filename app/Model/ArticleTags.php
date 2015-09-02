<?php
class ArticleTags extends AppModel {
	var $name = 'ArticleTags';
	var $useTable = 'tag_article';
	public $belongsTo = array (
			'Article' => array (
					'className' => 'Article',
					'foreignKey' => 'article_oId' 
			),
			'Tag' => array (
					'className' => 'Tag',
					'foreignKey' => 'tag_oId' 
			)
	);
}