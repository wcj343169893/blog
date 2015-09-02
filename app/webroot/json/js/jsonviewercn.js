/*global Ext, document, jsonviewer */

/*
 * TODO:
 * keresés eltüntetéséhez gomb
 * keresésnél írjuk ki, hogy hány találat van (akár dinamikusan, hogy pörögjön felfelé)
 * about JSON Viewer ablak
 * "Format..." finomítása
 * Editable Grid
 * Griden dupla katt egy object-en, akkor válassza ki azt.
 * be lehessen állítani, hogy a kis és nagybetű számít-e?
 * tree.contextmenu (kinyít, becsuk, ?)
 * 
 */

Ext.override(Ext.tree.TreeNode, {
	removeAllChildren: function () {
		while (this.hasChildNodes()) {
			this.removeChild(this.firstChild);
		}
		return this;
	},
	setIcon: function (icon) {
		this.getUI().setIcon(icon);
	},
	setIconCls: function (icon) {
		this.getUI().setIconCls(icon);
	}
});

Ext.override(Ext.tree.TreeNodeUI, {
	setIconCls: function (iconCls) {
		if (this.iconNode) {
			Ext.fly(this.iconNode).replaceClass(this.node.attributes.iconCls, iconCls);
		}
		this.node.attributes.iconCls = iconCls;
	},
	setIcon: function (icon) {
		if (this.iconNode) {
			this.iconNode.src = icon || this.emptyIcon;
			Ext.fly(this.iconNode)[icon ? 'addClass' : 'removeClass']('x-tree-node-inline-icon');
		}
		this.node.attributes.icon = icon;
	}
});

Ext.override(Ext.Panel, {
	hideBbar: function () {
		if (!this.bbar) {
			return;
		}
		this.bbar.setVisibilityMode(Ext.Element.DISPLAY);
		this.bbar.hide();
		this.getBottomToolbar().hide();
		this.syncSize();
		if (this.ownerCt) {
			this.ownerCt.doLayout();
		}
	},
	showBbar: function () {
		if (!this.bbar) {
			return;
		}
		this.bbar.setVisibilityMode(Ext.Element.DISPLAY);
		this.bbar.show();
		this.getBottomToolbar().show();
		this.syncSize();
		if (this.ownerCt) {
			this.ownerCt.doLayout();
		}
	}
});

Ext.ux.iconCls = function () {
	var styleSheetId = 'styleSheetIconCls';
	var cssClasses = {};
	Ext.util.CSS.createStyleSheet('/* Ext.ux.iconCls */', styleSheetId);
	return {
		get: function (icon) {
			if (!icon) {
				return null;
			}
			if (typeof cssClasses[icon] === 'undefined') {
				cssClasses[icon] = 'icon_' + Ext.id();
				var styleBody = '\n.' + cssClasses[icon] + ' { background-image: url(' + icon + ') !important; }';
				if (Ext.isIE) {
					document.styleSheets[styleSheetId].cssText += styleBody;
				} else {
					Ext.get(styleSheetId).dom.sheet.insertRule(styleBody, 0);
				}
			}
			return cssClasses[icon];
		}
	};
}();

String.space = function (len) {
	var t = [], i;
	for (i = 0; i < len; i++) {
		t.push(' ');
	}
	return t.join('');
};

function aboutWindow() {
	var tabs = [];
	Ext.getBody().select('div.tab').each(function(div) {
		tabs.push({
			title: div.select('h2').first().dom.innerHTML,
			html: div.select('div').first().dom.innerHTML.replace('{gabor}', '如果觉得好用,请按Ctrl+D收藏！谢谢！')
		});
	});
	var win = new Ext.Window({
		title: document.title,
		width: 640,
		height: 400,
		modal: true,
		layout: 'fit',
		items: new Ext.TabPanel({
			defaults: {
				autoScroll: true,
				bodyStyle: 'padding: 5px;'
			},
			activeTab: 0,
			items: tabs
		})
	});
	win.show();
}


Ext.onReady(function () {

	Ext.BLANK_IMAGE_URL = 'img/s.gif';	
	Ext.QuickTips.init();

	var ctrlF = new Ext.KeyMap(document, [{
		key: Ext.EventObject.F,
		ctrl: true,
		stopEvent: true,
		fn: function () {
			jsonviewer.ctrlF();
		}
	}, {
		key: Ext.EventObject.H,
		ctrl: true,
		stopEvent: true,
		fn: function () {
			jsonviewer.hideToolbar();
		}
	}]);
	ctrlF.disable();
	
	var grid = {
		xtype: 'propertygrid',
		id: 'grid',
		region: 'east',
		width: 300,
		split: true,
	    listeners: {
	    	beforeedit: function () {
	    		return false;
	    	}
	    },
	    selModel: new Ext.grid.RowSelectionModel(),
	    onRender: Ext.grid.PropertyGrid.superclass.onRender
	};
    var tree = {
    	id: 'tree',
    	xtype: 'treepanel',
    	region: 'center',
		loader: new Ext.tree.TreeLoader(),
		lines: true, 
        root: new Ext.tree.TreeNode({text: 'JSON'}),
        autoScroll: true,
        trackMouseOver: false,
        listeners: {
        	render: function (tree) {
        		tree.getSelectionModel().on('selectionchange', function (tree, node) {
        			jsonviewer.gridbuild(node);
        		});
        	}
        },
        bbar: [
        	'Search:',
        	new Ext.form.TextField({
				xtype: 'textfield',
				id: 'searchTextField'
	        }),
	        new Ext.Button({
	        	text: 'GO!',
	        	handler:  function () {
	        		jsonviewer.searchStart();
	        	}
	        }),
	        new Ext.form.Label({
	        	id: 'searchResultLabel',
	        	style: 'padding-left:10px;font-weight:bold'
	        }), {
	        	iconCls: Ext.ux.iconCls.get('img/arrow_down.png'),
	        	text: 'Next',
	        	handler: function () {
	        		jsonviewer.searchNext();
	        	}
	        }, {
	        	iconCls: Ext.ux.iconCls.get('img/arrow_up.png'),
	        	text: 'Previous',
	        	handler: function () {
	        		jsonviewer.searchPrevious();
	        	}
	        }
		]
    };
	var edit = {
		id: 'edit',
		xtype: 'textarea',
		style: 'font-family:monospace',
		emptyText: '将JSON数据粘贴到这里!',
		selectOnFocus: true
	};
	var viewerPanel = {
		id: 'viewerPanel',
		layout: 'border',
		title: '视图',
		items: [tree, grid]
	};
	var textPanel = {
		id: 'textPanel',
		layout: 'fit',
		title: 'JSON数据',
		tbar: [
			{text: '获取网络json', handler: function () {
				jsonviewer.getJsonByUrl();
			}},
			'-',
			{text: '粘贴', handler: function () {
				jsonviewer.pasteText();
			}},
			{text: '复制', handler: function () {
				jsonviewer.copyText();
			}},
			'-',
			{text: '格式化', handler: function () {
				jsonviewer.format();
			}},
			'-',
			{text: '删除空格', handler: function () {
				jsonviewer.removeWhiteSpace();
			}},
			'-',
			{text: '删除空格并转义', handler: function () {
				jsonviewer.removeWhiteSpace2();
			}},
			'->',
			{text: '回到首页', handler: function(){
				window.location.href="http://www.choujone.com/";
			}},
			{text: '关于', handler: aboutWindow}
		],
		items: edit
	};
	var vp = new Ext.Viewport({
		layout: 'fit',
		items: {
			xtype: 'tabpanel',
			items: [viewerPanel, textPanel],
			activeTab: 'textPanel',
			listeners: {
				beforetabchange: function (tabpanel, tab) {
					if (tab.id === 'viewerPanel') {
						return jsonviewer.check();
					}
				},
				tabchange: function (tabpanel, tab) {
					if (tab.id === 'viewerPanel') {
						ctrlF.enable();
					} else {
						ctrlF.disable();
					}
				}
			}
		}
	});

	var jsonviewer = function () {
		var edit = Ext.getCmp('edit');
		var tree = Ext.getCmp('tree');
		var root = tree.getRootNode();
		var grid = Ext.getCmp('grid');
		var searchTextField = Ext.getCmp('searchTextField');
		var searchResultLabel = Ext.getCmp('searchResultLabel');
		var json = {};
		var lastText = null;
		var task = null;
		var searchList = null;
		var searchIndex = null;
		return {
			check: function () {
				// üres sorok törlése:
				var text = edit.getValue().split("\n").join(" ");
				try {
					json = Ext.util.JSON.decode(text);
				} catch (e) {
					Ext.MessageBox.show({
						title: 'JSON 错误',
						msg: 'JSON 格式错误',
						icon: Ext.MessageBox.ERROR,
						buttons: Ext.MessageBox.OK,
						closable: false
					});
					return false;
				}
				if (lastText === text) {
					return;
				}
				lastText = text;
				this.treebuild();
			},
			treebuild: function () {
				root.removeAllChildren();
				root.appendChild(this.json2leaf(json));
				root.setIcon(Ext.isArray(json) ? 'img/array.gif' : 'img/object.gif');
				this.gridbuild(root);
			},
			gridbuild: function (node) {
				if (node.isLeaf()) {
					node = node.parentNode;
				}
				// elofordulhat, hogy nincsen még kifejtve:
				if (!node.childNodes.length) {
					node.expand(false, false);
					node.collapse(false, false);
				}
				var source = {};
				for (var i = 0; i < node.childNodes.length; i++) { 
					var t = node.childNodes[i].text.split(':');
					if (t.length > 1) {
						source[t[0]] = t[1];
					} else {
						source[t[0]] = '...';
					}
				}
				grid.setSource(source);
			},
			json2leaf: function (json) {
				var ret = [];
				for (var i in json) {
					if (json.hasOwnProperty(i)) {
						if (json[i] === null) {
							ret.push({text: i + ' : null', leaf: true, icon: 'img/red.gif'});
						} else if (typeof json[i] === 'string') {
							ret.push({text: i + ' : "' + json[i] + '"', leaf: true, icon: 'img/blue.gif'});
						} else if (typeof json[i] === 'number') {
							ret.push({text: i + ' : ' + json[i], leaf: true, icon: 'img/green.gif'});
						} else if (typeof json[i] === 'boolean') {
							ret.push({text: i + ' : ' + (json[i] ? 'true' : 'false'), leaf: true, icon: 'img/yellow.gif'});
						} else if (typeof json[i] === 'object') {
							ret.push({text: i, children: this.json2leaf(json[i]), icon: Ext.isArray(json[i]) ? 'img/array.gif' : 'img/object.gif'});
						} else if (typeof json[i] === 'function') {
							ret.push({text: i + ' : function', leaf: true, icon: 'img/red.gif'});
						}
					}
				}
				return ret;
			},
			copyText: function () {
				if (!edit.getValue()) {
					return;
				}
				Ext.ux.Clipboard.set(edit.getValue());
			},
			pasteText: function () {
				edit.setValue(Ext.ux.Clipboard.get());
			},
			searchStart: function () {
				if (!task) {
					task = new Ext.util.DelayedTask(this.searchFn, this);
				}
				task.delay(150);
			},
			searchFn: function () {
				searchList = [];
				if (!searchTextField.getValue()) {
					return;
				}
				this.searchInNode(root, searchTextField.getValue());
				if (searchList.length) {
					searchResultLabel.setText('');
					searchIndex = 0;
					this.selectNode(searchList[searchIndex]);
					searchTextField.focus();
				} else {
					searchResultLabel.setText('Phrase not found!');
				}
			},
			searchInNode: function (node, text) {
				if (node.text.toUpperCase().indexOf(text.toUpperCase()) !== -1) {
					searchList.push(node);
					//return true;
				}
				var isExpanded = node.isExpanded();
				node.expand(false, false);
				for (var i = 0; i < node.childNodes.length; i++) {
					if (this.searchInNode(node.childNodes[i], text)) {
						//return true;
					}
				}
				if (!isExpanded) {
					node.collapse(false, false);
				}
				//return false;
			},
			selectNode: function (node) {
				node.select();
				tree.fireEvent('click', node);
				while (node !== root) {
					node = node.parentNode;
					node.expand(false, false);
				}				
			},
			searchNext: function () {
				if (!searchList || !searchList.length) {
					return;
				}
				searchIndex = (searchIndex + 1) % searchList.length;
				this.selectNode(searchList[searchIndex]);
			},
			searchPrevious: function () {
				if (!searchList || !searchList.length) {
					return;
				}
				searchIndex = (searchIndex - 1 + searchList.length) % searchList.length;
				this.selectNode(searchList[searchIndex]);
			},
			ctrlF: function () {
				if (!tree.getBottomToolbar().isVisible()) {
					tree.showBbar();
				}
				searchTextField.focus(true);
			},
			hideToolbar: function () {
				tree.hideBbar();
			},
			format: function () {
				var text = edit.getValue().split("\n").join(" ");
				var t = [];
				var tab = 0;
				var inString = false;
				for (var i = 0, len = text.length; i < len; i++) {
					var c = text.charAt(i);
					if (inString && c === inString) {
						// TODO: \\"
						if (text.charAt(i - 1) !== '\\') {
							inString = false;
						}
					} else if (!inString && (c === '"' || c === "'")) {
						inString = c;
					} else if (!inString && (c === ' ' || c === "\t")) {
						c = '';
					} else if (!inString && c === ':') {
						c += ' ';
					} else if (!inString && c === ',') {
						c += "\n" + String.space(tab * 2);
					} else if (!inString && (c === '[' || c === '{')) {
						tab++;
						c += "\n" + String.space(tab * 2);
					} else if (!inString && (c === ']' || c === '}')) {
						tab--;
						c = "\n" + String.space(tab * 2) + c;
					}
					t.push(c);
				}
				edit.setValue(t.join(''));
			},
			removeWhiteSpace:function(){
				edit.setValue(jsonviewer.getRemoveWhiteSpace());
			}
			,
			getRemoveWhiteSpace: function () {
				var text = edit.getValue().split("\n").join(" ");
				var t = [];
				var inString = false;
				for (var i = 0, len = text.length; i < len; i++) {
					var c = text.charAt(i);
					if (inString && c === inString) {
						// TODO: \\"
						if (text.charAt(i - 1) !== '\\') {
							inString = false;
						}
					} else if (!inString && (c === '"' || c === "'")) {
						inString = c;
					} else if (!inString && (c === ' ' || c === "\t")) {
						c = '';
					}
					t.push(c);
				}
				return t.join('');
			},
			removeWhiteSpace2: function (){
				var a = jsonviewer.getRemoveWhiteSpace().replace(/\"/g,"\\\"");
				edit.setValue(a);
			},
			getJsonByUrl:function(){
				 Ext.MessageBox.show({
			           title: '获取Json网络数据',
			           msg: '请输入Json网络地址:<br/>'+
			           	   '<span style="color:red;">例如：</span>http://www.choujone.com/test.json<br/>'+
			        	   '<span style="color:red;">注意：</span>此数据是Google云服务器采集，请不要输入您的本地或者局域网json地址，如果长时间没有动静，请刷新重试<br/>'+
			        	   '<span style="color:red;">申明：</span>本站绝对不保留您的任何json数据，请放心使用',
			           width:450,
			           buttons: Ext.MessageBox.OKCANCEL,
			           multiline: true,
			           fn: function(btn, text){
			        	   if(text){jsonviewer.ajaxCall(text);}
			           },
			           animateTarget: 'mb3'
			       });
			},
			ajaxCall:function(urlStr) {
				/**
				 * 异步调用ajax，成功后返回值，作为回调函数的参数 调用失败会提示
				 * 
				 * @param {}
				 *            urlStr
				 */
				 Ext.MessageBox.show({
			           msg: '正则获取数据，请等待...',
			           progressText: '请等待...',
			           width:300,
			           wait:true,
			           waitConfig: {interval:200},
			           icon:'ext-mb-download',
			           animateTarget: 'mb7'
			       });
				 Ext.Ajax.request({
					 url:"/crawl",
					 params:{"url":urlStr},
					 success: function(resp,opts) {
						 if(resp.responseText){
							 edit.setValue(resp.responseText);
							 jsonviewer.format();
							 Ext.MessageBox.hide();
						 }
					 },
					 failure:function(){
						 Ext.Msg.alert("提示", "方法调用失败");
					 } 
				 });
			},Obj2str: function(o) {//json转字符串
                if (o == undefined) {
                    return "''";
                }
                var r = [];
                if (typeof o == "string") return "\"" + o.replace(/([\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
                if (typeof o == "object") {
                    if (!o.sort) {
                        for (var i in o)
                            r.push("\"" + i + "\":" + jsonviewer.Obj2str(o[i]));
                        if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
                            r.push("toString:" + o.toString.toString());
                        }
                        r = "{" + r.join() + "}"
                    } else {
                        for (var i = 0; i < o.length; i++)
                            r.push(jsonviewer.Obj2str(o[i]))
                        r = "[" + r.join() + "]";
                    }
                    return r;
                }
                return o.toString().replace(/\"\:/g, '":""');
            }

			
		};
	}();
});