<?php
App::uses ( 'AdminAppController', 'Admin.Controller' );
App::uses ( 'AppController', 'Controller' );
class ArticlesController extends AdminAppController {
	var $helpers = array (
			'Form' 
	);
	public $uses = array (
			"Article",
			"Tag",
			"Link",
			"Preference",
			"ArticleTags" 
	);
	public $components = array (
			'Paginator',
			'DebugKit.Toolbar' 
	);
	public $paginate = array (
			"Article" => array (
					'fields'=>array(
						"Article.oId",
						"Article.articleTitle",
						"Article.articleViewCount",
						"Article.articleIsPublished",
						"Article.articleCreateDate",
						"ArticleType.name",
					),
					'limit' => 10,
					'order' => array (
							'Article.oId' => 'desc' 
					) 
			) 
	)
	;
	public function index() {
		$this->Paginator->settings = $this->paginate;
		// similar to findAll(), but fetches paged results
		$data = $this->Paginator->paginate ( 'Article' );
		$this->set ( 'data', $data );
	}
	public function add() {
		if($this->request->is("post")){
			$user=$this->Session->read('User');
			$data = $this->request->data;
			//默认值
			$default=array(
				"oId"=>time().rand(100, 999),
				"articleAuthorEmail"=>$user["User"]["email"],
				"articleCommentCount"=>"0",
				"articleViewCount"=>"0",
				"articlePermalink"=>" ",
				"articleHadBeenPublished"=>"1",
				"articleIsPublished"=>"1",
				"articlePutTop"=>" ",
				"articleCreateDate"=>date("Y-m-d H:i:s"),
				"articleUpdateDate"=>date("Y-m-d H:i:s"),
				"articleRandomDouble"=>"0",
				"articleSignId"=>" ",
				"articleCommentable"=>"1",
				"articleViewPwd"=>" ",
				"articleEditorType"=>"ckeditor",
				"source"=>" ",
			);
			$content = $data["Article"]["articleContent"];
			$default["articleAbstract"] = String::truncate(strip_tags($content),200,array("html"=>true));
			$this->Article->save(array_merge($default,$data["Article"]));
			$this->redirect(array("action"=>"index"));
		}
	}
	public function edit($id=0) {
		if($this->request->is("post")){
			$data = $this->request->data;
			//默认值
			$default=array(
					"oId"=>$id,
					"articleAuthorEmail"=>" ",
					"articleCommentCount"=>"0",
					"articleViewCount"=>"0",
					"articlePermalink"=>" ",
					"articleHadBeenPublished"=>"1",
					"articleIsPublished"=>"1",
					"articlePutTop"=>" ",
					"articleCreateDate"=>date("Y-m-d H:i:s"),
					"articleUpdateDate"=>date("Y-m-d H:i:s"),
					"articleRandomDouble"=>"0",
					"articleSignId"=>" ",
					"articleCommentable"=>"1",
					"articleViewPwd"=>" ",
					"articleEditorType"=>"ckeditor",
					"source"=>" ",
			);
			$content = $data["Article"]["articleContent"];
			$default["articleAbstract"] = String::truncate(strip_tags($content),200);
			$this->Article->id=$id;
			$this->Article->save(array_merge($default,$data["Article"]));
			$this->redirect(array("action"=>"index"));
			return ;
		}
		$data = $this->Article->find("first",array("conditions"=>array("Article.oId"=>$id)));
		$this->set ( 'data', $data );
	}
}