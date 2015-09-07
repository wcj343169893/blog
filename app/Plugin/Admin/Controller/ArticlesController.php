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
					'fields' => array (
							"Article.oId",
							"Article.articleTitle",
							"Article.articleViewCount",
							"Article.articleIsPublished",
							"Article.articleCreateDate",
							"ArticleType.name" 
					),
					'limit' => 10,
					'order' => array (
							'Article.oId' => 'desc' 
					) 
			) 
	);
	public function index() {
		$this->Paginator->settings = $this->paginate;
		// similar to findAll(), but fetches paged results
		$data = $this->Paginator->paginate ( 'Article' );
		$this->set ( 'data', $data );
	}
	public function add() {
		if ($this->request->is ( "post" )) {
			$user = $this->Session->read ( 'User' );
			$data = $this->request->data;
			// 默认值
			$default = array (
					"oId" => time () . rand ( 100, 999 ),
					"articleAuthorEmail" => $user ["User"] ["email"],
					"articleCommentCount" => "0",
					"articleViewCount" => "0",
					"articlePermalink" => " ",
					"articleHadBeenPublished" => "1",
					"articleIsPublished" => "1",
					"articlePutTop" => " ",
					"articleCreateDate" => date ( "Y-m-d H:i:s" ),
					"articleUpdateDate" => date ( "Y-m-d H:i:s" ),
					"articleRandomDouble" => "0",
					"articleSignId" => " ",
					"articleCommentable" => "1",
					"articleViewPwd" => " ",
					"articleEditorType" => "ckeditor",
					"source" => " " 
			);
			$content = $data ["Article"] ["articleContent"];
			$default ["articleAbstract"] = String::truncate ( strip_tags ( $content ), 200, array (
					"html" => true 
			) );
			$this->Article->save ( array_merge ( $default, $data ["Article"] ) );
			// 删除原标签，新建标签
			$this->saveArticleTags ( $this->Article->id, $data ["Article"] ["articleTags"] );
			$this->redirect(array("action"=>"index"));
		}
	}
	public function edit($id = 0) {
		if ($this->request->is ( "post" )) {
			$data = $this->request->data;
			// 默认值
			$default = array (
					"oId" => $id,
					"articleUpdateDate" => date ( "Y-m-d H:i:s" ),
			);
			$content = $data ["Article"] ["articleContent"];
			$default ["articleAbstract"] = String::truncate ( strip_tags ( $content ), 200 );
			$this->Article->id = $id;
			$this->Article->save ( array_merge ( $default, $data ["Article"] ) );
			$this->saveArticleTags ( $this->Article->id, $data ["Article"] ["articleTags"] );
			$this->redirect(array("action"=>"index"));
			return ;
		}
		$data = $this->Article->find ( "first", array (
				"conditions" => array (
						"Article.oId" => $id 
				) 
		) );
		$this->set ( 'data', $data );
	}
	public function view($id = 0) {
		$data = $this->Article->find ( "first", array (
				"conditions" => array (
						"Article.oId" => $id 
				) 
		) );
		$this->set ( 'data', $data );
	}
	/**
	 * 保存文章标签，用空格分隔开
	 */
	private function saveArticleTags($id, $tags) {
		if (! empty ( $id ) && ! empty ( $tags )) {
			// 查询原标签
			$old_tag = $this->ArticleTags->find ( "all", array (
					"conditions" => array (
							"ArticleTags.article_oId" => $id 
					) 
			) );
			$tag_arr = explode ( " ", $tags );
			$artTag = array ();
			foreach ( $tag_arr as $v ) {
				if (! empty ( $v )) {
					$artTag [] = $v;
				}
			}
			if (empty ( $artTag )) {
				$this->ArticleTags->deleteAll ( array (
						"ArticleTags.article_oId" => $id 
				) );
				return false;
			}
			$tag_save = array ();
			$tag_update_count = array ();
			if (! empty ( $old_tag )) {
				// 删除原标签关联，并减去标签的统计数量
				foreach ( $old_tag as $v ) {
					$tagTitle = $v ["Tag"] ["tagTitle"];
					// 删除已经没有了的标签
					if (in_array ( $v ["Tag"] ["tagTitle"], $artTag )) {
						$t_index = array_search ( $tagTitle, $artTag );
						unset ( $artTag [$t_index] );
					} else {
						// 需要删除旧标签信息
						if ($v ["Tag"] ["tagReferenceCount"] == 1) {
							$this->Tag->delete ( $v ["Tag"] ["oId"] );
							$this->ArticleTags->delete ( $v ["ArticleTags"] ["oId"] );
						} else {
							// 更新tag数量
							$tag_update_count [] = $v ["Tag"] ["oId"];
						}
					}
				}
				if (! empty ( $tag_update_count )) {
					$sql = "update " . $this->Tag->useTable . " set tagReferenceCount=tagReferenceCount-1,
							tagPublishedRefCount=tagPublishedRefCount-1 where
							oId in(" . implode ( ",", $tag_update_count ) . ")";
					$this->Tag->query ( $sql );
				}
			}
			$artTag_old = $artTag = array_unique ( $artTag );
			if (empty ( $artTag )) {
				return false;
			}
			
			
			$this->Tag->hasMany=array();
			// 查询已经存在的tag
			$tag_data = $this->Tag->find ( "all", array (
					"conditions" => array (
							"Tag.tagTitle" => $artTag 
					) 
			) );
			$article_tag = array ();
			if (! empty ( $tag_data )) {
				// 每个数量+1
				foreach ( $tag_data as $v ) {
					$tagTitle = $v ["Tag"] ["tagTitle"];
					// 移除存在的标签
					$t_index = array_search ( $tagTitle, $artTag );
					unset ( $artTag [$t_index] );
					$v ["Tag"] ["tagPublishedRefCount"] = $v ["Tag"] ["tagPublishedRefCount"] + 1;
					$v ["Tag"] ["tagReferenceCount"] = $v ["Tag"] ["tagReferenceCount"] + 1;
					$tag_save [] = $v;
				}
				$this->Tag->saveMany ( $tag_save, array (
						"validate" => true 
				) );
			}
			// 新增tag
			if (! empty ( $artTag )) {
				$artTag_save = array ();
				foreach ( $artTag as $v ) {
					$oid = time () . rand ( 100, 999 );
					$artTag_save [] = array (
							"oId" => $oid,
							"tagPublishedRefCount" => 1,
							"tagReferenceCount" => 1,
							"tagTitle" => $v 
					);
					$article_tag [] = array (
							"oId" => time () . rand ( 100, 999 ),
							"article_oId" => $id,
							"tag_oId" => $oid 
					);
				}
				$this->Tag->saveMany ( $artTag_save, array (
						"validate" => true 
				) );
				$this->ArticleTags->saveMany ( $article_tag, array (
						"validate" => true 
				) );
			}
		}
	}
}