<?php
class Article extends AppModel {
	var $name = 'Article';
	public $primaryKey = "oId";
	var $useTable = 'article';
	var $adminSettings = array (
			"icon" => "blog" 
	);
	public $belongsTo = array (
			'ArticleType' => array (
					'className' => 'ArticleType',
					'foreignKey' => 'articleTypeId' 
			) 
	);
}