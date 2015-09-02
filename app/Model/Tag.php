<?php
class Tag extends AppModel {
	var $name = 'Tag';
	var $useTable = 'tag';
	public $hasMany = array (
			'ArticleTags' 
	);
}