(function() {
	var j = "http://s1.bdstatic.com/r/www/cache/hongbao/";
	var d, a = d = a || {
		version : "1.5.2.2"
	};
	a.guid = "$1$";
	a.$$ = window[a.guid] = window[a.guid] || {
		global : {}
	};
	a.dom = a.dom || {};
	a.dom.g = function(k) {
		if (!k) {
			return null
		}
		if ("string" == typeof k || k instanceof String) {
			return document.getElementById(k)
		} else {
			if (k.nodeName && (k.nodeType == 1 || k.nodeType == 9)) {
				return k
			}
		}
		return null
	};
	a.g = a.G = a.dom.g;
	a.lang = a.lang || {};
	a.lang.guid = function() {
		return "TANGRAM$" + a.$$._counter++
	};
	a.$$._counter = a.$$._counter || 1;
	a.lang.Class = function() {
		this.guid = a.lang.guid();
		!this.__decontrolled && (a.$$._instances[this.guid] = this)
	};
	a.$$._instances = a.$$._instances || {};
	a.lang.Class.prototype.dispose = function() {
		delete a.$$._instances[this.guid];
		for ( var k in this) {
			typeof this[k] != "function" && delete this[k]
		}
		this.disposed = true
	};
	a.lang.Class.prototype.toString = function() {
		return "[object " + (this.__type || this._className || "Object") + "]"
	};
	window.baiduInstance = function(k) {
		return a.$$._instances[k]
	};
	a.lang.isString = function(k) {
		return "[object String]" == Object.prototype.toString.call(k)
	};
	a.isString = a.lang.isString;
	a.lang.Event = function(k, l) {
		this.type = k;
		this.returnValue = true;
		this.target = l || null;
		this.currentTarget = null
	};
	a.lang.Class.prototype.fire = a.lang.Class.prototype.dispatchEvent = function(
			q, k) {
		a.lang.isString(q) && (q = new a.lang.Event(q));
		!this.__listeners && (this.__listeners = {});
		k = k || {};
		for ( var m in k) {
			q[m] = k[m]
		}
		var m, s, o = this, l = o.__listeners, r = q.type;
		q.target = q.target || (q.currentTarget = o);
		r.indexOf("on") && (r = "on" + r);
		typeof o[r] == "function" && o[r].apply(o, arguments);
		if (typeof l[r] == "object") {
			for (m = 0, s = l[r].length; m < s; m++) {
				l[r][m] && l[r][m].apply(o, arguments)
			}
		}
		return q.returnValue
	};
	a.lang.Class.prototype.on = a.lang.Class.prototype.addEventListener = function(
			o, n, m) {
		if (typeof n != "function") {
			return
		}
		!this.__listeners && (this.__listeners = {});
		var l, k = this.__listeners;
		o.indexOf("on") && (o = "on" + o);
		typeof k[o] != "object" && (k[o] = []);
		for (l = k[o].length - 1; l >= 0; l--) {
			if (k[o][l] === n) {
				return n
			}
		}
		k[o].push(n);
		m && typeof m == "string" && (k[o][m] = n);
		return n
	};
	a.lang.createClass = function(l, s) {
		s = s || {};
		var q = s.superClass || a.lang.Class;
		var r = function() {
			var v = this;
			s.decontrolled && (v.__decontrolled = true);
			q.apply(v, arguments);
			for (t in r.options) {
				v[t] = r.options[t]
			}
			l.apply(v, arguments);
			for ( var t = 0, u = r["\x06r"]; u && t < u.length; t++) {
				u[t].apply(v, arguments)
			}
		};
		r.options = s.options || {};
		var k = function() {
		}, p = l.prototype;
		k.prototype = q.prototype;
		var n = r.prototype = new k();
		for ( var m in p) {
			n[m] = p[m]
		}
		var o = s.className || s.type;
		typeof o == "string" && (n.__type = o);
		n.constructor = p.constructor;
		r.extend = function(u) {
			for ( var t in u) {
				r.prototype[t] = u[t]
			}
			return r
		};
		return r
	};
	a.array = a.array || {};
	a.each = a.array.forEach = a.array.each = function(q, o, l) {
		var n, p, m, k = q.length;
		if ("function" == typeof o) {
			for (m = 0; m < k; m++) {
				p = q[m];
				n = o.call(l || q, p, m);
				if (n === false) {
					break
				}
			}
		}
		return q
	};
	a.string = a.string || {};
	a.string.format = function(m, k) {
		m = String(m);
		var l = Array.prototype.slice.call(arguments, 1), n = Object.prototype.toString;
		if (l.length) {
			l = l.length == 1 ? (k !== null
					&& (/\[object Array\]|\[object Object\]/.test(n.call(k))) ? k
					: l)
					: l;
			return m.replace(/#\{(.+?)\}/g, function(o, q) {
				var p = l[q];
				if ("[object Function]" == n.call(p)) {
					p = p(q)
				}
				return ("undefined" == typeof p ? "" : p)
			})
		}
		return m
	};
	a.format = a.string.format;
	a.browser = a.browser || {};
	a.browser.opera = /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i
			.test(navigator.userAgent) ? +(RegExp["\x246"] || RegExp["\x242"])
			: undefined;
	a.dom.insertHTML = function(n, k, m) {
		n = a.dom.g(n);
		var l, o;
		if (n.insertAdjacentHTML && !a.browser.opera) {
			n.insertAdjacentHTML(k, m)
		} else {
			l = n.ownerDocument.createRange();
			k = k.toUpperCase();
			if (k == "AFTERBEGIN" || k == "BEFOREEND") {
				l.selectNodeContents(n);
				l.collapse(k == "AFTERBEGIN")
			} else {
				o = k == "BEFOREBEGIN";
				l[o ? "setStartBefore" : "setEndAfter"](n);
				l.collapse(o)
			}
			l.insertNode(l.createContextualFragment(m))
		}
		return n
	};
	a.insertHTML = a.dom.insertHTML;
	a.page = a.page || {};
	a.page.getViewHeight = function() {
		var l = document, k = l.compatMode == "BackCompat" ? l.body
				: l.documentElement;
		return k.clientHeight
	};
	a.page.getViewWidth = function() {
		var l = document, k = l.compatMode == "BackCompat" ? l.body
				: l.documentElement;
		return k.clientWidth
	};
	a.dom._styleFixer = a.dom._styleFixer || {};
	a.dom._styleFilter = a.dom._styleFilter || [];
	a.dom._styleFilter.filter = function(l, o, p) {
		for ( var k = 0, n = a.dom._styleFilter, m; m = n[k]; k++) {
			if (m = m[p]) {
				o = m(l, o)
			}
		}
		return o
	};
	a.string.toCamelCase = function(k) {
		if (k.indexOf("-") < 0 && k.indexOf("_") < 0) {
			return k
		}
		return k.replace(/[-_][^-_]/g, function(l) {
			return l.charAt(1).toUpperCase()
		})
	};
	a.dom.setStyle = function(m, l, n) {
		var o = a.dom, k;
		m = o.g(m);
		l = a.string.toCamelCase(l);
		if (k = o._styleFilter) {
			n = k.filter(l, n, "set")
		}
		k = o._styleFixer[l];
		(k && k.set) ? k.set(m, n, l) : (m.style[k || l] = n);
		return m
	};
	a.setStyle = a.dom.setStyle;
	a.dom.setStyles = function(l, m) {
		l = a.dom.g(l);
		for ( var k in m) {
			a.dom.setStyle(l, k, m[k])
		}
		return l
	};
	a.setStyles = a.dom.setStyles;
	a.browser.ie = a.ie = /msie (\d+\.\d+)/i.test(navigator.userAgent) ? (document.documentMode || +RegExp["\x241"])
			: undefined;
	a.cookie = a.cookie || {};
	a.cookie._isValidKey = function(k) {
		return (new RegExp(
				'^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+\x24'))
				.test(k)
	};
	a.cookie.setRaw = function(m, n, l) {
		if (!a.cookie._isValidKey(m)) {
			return
		}
		l = l || {};
		var k = l.expires;
		if ("number" == typeof l.expires) {
			k = new Date();
			k.setTime(k.getTime() + l.expires)
		}
		document.cookie = m + "=" + n + (l.path ? "; path=" + l.path : "")
				+ (k ? "; expires=" + k.toGMTString() : "")
				+ (l.domain ? "; domain=" + l.domain : "")
				+ (l.secure ? "; secure" : "")
	};
	a.cookie.set = function(l, m, k) {
		a.cookie.setRaw(l, encodeURIComponent(m), k)
	};
	a.dom.show = function(k) {
		k = a.dom.g(k);
		k.style.display = "";
		return k
	};
	a.show = a.dom.show;
	a.object = a.object || {};
	a.extend = a.object.extend = function(m, k) {
		for ( var l in k) {
			if (k.hasOwnProperty(l)) {
				m[l] = k[l]
			}
		}
		return m
	};
	a.fx = a.fx || {};
	a.lang.inherits = function(q, o, n) {
		var m, p, k = q.prototype, l = new Function();
		l.prototype = o.prototype;
		p = q.prototype = new l();
		for (m in k) {
			p[m] = k[m]
		}
		q.prototype.constructor = q;
		q.superClass = o.prototype;
		typeof n == "string" && (p.__type = n);
		q.extend = function(s) {
			for ( var r in s) {
				p[r] = s[r]
			}
			return q
		};
		return q
	};
	a.inherits = a.lang.inherits;
	a.fx.Timeline = function(k) {
		a.lang.Class.call(this);
		this.interval = 16;
		this.duration = 500;
		this.dynamic = true;
		a.object.extend(this, k)
	};
	a.lang.inherits(a.fx.Timeline, a.lang.Class, "baidu.fx.Timeline").extend(
			{
				launch : function() {
					var k = this;
					k.dispatchEvent("onbeforestart");
					typeof k.initialize == "function" && k.initialize();
					k["\x06btime"] = new Date().getTime();
					k["\x06etime"] = k["\x06btime"]
							+ (k.dynamic ? k.duration : 0);
					k["\x06pulsed"]();
					return k
				},
				"\x06pulsed" : function() {
					var l = this;
					var k = new Date().getTime();
					l.percent = (k - l["\x06btime"]) / l.duration;
					l.dispatchEvent("onbeforeupdate");
					if (k >= l["\x06etime"]) {
						typeof l.render == "function"
								&& l.render(l.transition(l.percent = 1));
						typeof l.finish == "function" && l.finish();
						l.dispatchEvent("onafterfinish");
						l.dispose();
						return
					}
					typeof l.render == "function"
							&& l.render(l.transition(l.percent));
					l.dispatchEvent("onafterupdate");
					l["\x06timer"] = setTimeout(function() {
						l["\x06pulsed"]()
					}, l.interval)
				},
				transition : function(k) {
					return k
				},
				cancel : function() {
					this["\x06timer"] && clearTimeout(this["\x06timer"]);
					this["\x06etime"] = this["\x06btime"];
					typeof this.restore == "function" && this.restore();
					this.dispatchEvent("oncancel");
					this.dispose()
				},
				end : function() {
					this["\x06timer"] && clearTimeout(this["\x06timer"]);
					this["\x06etime"] = this["\x06btime"];
					this["\x06pulsed"]()
				}
			});
	a.fx.create = function(n, l, m) {
		var o = new a.fx.Timeline(l);
		o.element = n;
		o.__type = m || o.__type;
		o["\x06original"] = {};
		var k = "baidu_current_effect";
		o.addEventListener("onbeforestart", function() {
			var q = this, p;
			q.attribName = "att_" + q.__type.replace(/\W/g, "_");
			p = q.element.getAttribute(k);
			q.element.setAttribute(k, (p || "") + "|" + q.guid + "|", 0);
			if (!q.overlapping) {
				(p = q.element.getAttribute(q.attribName))
						&& window[a.guid]._instances[p].cancel();
				q.element.setAttribute(q.attribName, q.guid, 0)
			}
		});
		o["\x06clean"] = function(r) {
			var q = this, p;
			if (r = q.element) {
				r.removeAttribute(q.attribName);
				p = r.getAttribute(k);
				p = p.replace("|" + q.guid + "|", "");
				if (!p) {
					r.removeAttribute(k)
				} else {
					r.setAttribute(k, p, 0)
				}
			}
		};
		o.addEventListener("oncancel", function() {
			this["\x06clean"]();
			this["\x06restore"]()
		});
		o.addEventListener("onafterfinish", function() {
			this["\x06clean"]();
			this.restoreAfterFinish && this["\x06restore"]()
		});
		o.protect = function(p) {
			this["\x06original"][p] = this.element.style[p]
		};
		o["\x06restore"] = function() {
			var t = this["\x06original"], r = this.element.style, p;
			for ( var q in t) {
				p = t[q];
				if (typeof p == "undefined") {
					continue
				}
				r[q] = p;
				if (!p && r.removeAttribute) {
					r.removeAttribute(q)
				} else {
					if (!p && r.removeProperty) {
						r.removeProperty(q)
					}
				}
			}
		};
		return o
	};
	a.fx.opacity = function(l, k) {
		if (!(l = a.dom.g(l))) {
			return null
		}
		k = a.object.extend({
			from : 0,
			to : 1
		}, k || {});
		var n = l;
		var m = a.fx
				.create(
						n,
						a.object
								.extend(
										{
											initialize : function() {
												a.dom.show(l);
												if (a.browser.ie < 9) {
													this.protect("filter")
												} else {
													this.protect("opacity");
													this
															.protect("KHTMLOpacity")
												}
												this.distance = this.to
														- this.from
											},
											render : function(o) {
												var p = this.distance * o
														+ this.from;
												if (!(a.browser.ie < 9)) {
													n.style.opacity = p;
													n.style.KHTMLOpacity = p
												} else {
													n.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity:"
															+ Math
																	.floor(p * 100)
															+ ")"
												}
											}
										}, k), "baidu.fx.opacity");
		return m.launch()
	};
	a.fx.fadeIn = function(l, k) {
		if (!(l = a.dom.g(l))) {
			return null
		}
		var m = a.fx.opacity(l, a.object.extend({
			from : 0,
			to : 1,
			restoreAfterFinish : true
		}, k || {}));
		m.__type = "baidu.fx.fadeIn";
		return m
	};
	a.dom.hide = function(k) {
		k = a.dom.g(k);
		k.style.display = "none";
		return k
	};
	a.hide = a.dom.hide;
	a.fx.fadeOut = function(l, k) {
		if (!(l = a.dom.g(l))) {
			return null
		}
		var m = a.fx.opacity(l, a.object.extend({
			from : 1,
			to : 0,
			restoreAfterFinish : true
		}, k || {}));
		m.addEventListener("onafterfinish", function() {
			a.dom.hide(this.element)
		});
		m.__type = "baidu.fx.fadeOut";
		return m
	};
	d.undope = true;
	var e = {};
	e.g = a.dom.g;
	e.createClass = a.lang.createClass;
	e.forEach = a.array.each;
	e.formatString = a.string.format;
	e.insertHTML = a.dom.insertHTML;
	e.getViewHeight = a.page.getViewHeight;
	e.getViewWidth = a.page.getViewWidth;
	e.setStyle = a.dom.setStyle;
	e.setStyles = a.dom.setStyles;
	e.isIE = a.browser.ie;
	e.setCookie = a.cookie.set;
	e.setPageCss = function(k, m) {
		k = e.formatString(k, {
			staticUrl : m
		});
		var l = null;
		if (e.isIE) {
			l = document.createStyleSheet();
			l.cssText = k
		} else {
			l = document.createElement("style");
			l.type = "text/css";
			document.getElementsByTagName("head")[0].appendChild(l);
			l.innerHTML = k
		}
	};
	e.removeDom = function(k) {
		k = e.g(k);
		var l = k.parentNode;
		l && l.removeChild(k)
	};
	e.isIpad = /ipad/i.test(navigator.userAgent);
	e.isFF = /firefox\/(\d+\.\d+)/i.test(navigator.userAgent) ? +RegExp["\x241"]
			: undefined;
	e.isOpera = /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i
			.test(navigator.userAgent) ? +(RegExp["\x246"] || RegExp["\x242"])
			: undefined;
	e.isWebkit = /webkit/i.test(navigator.userAgent);
	e.fadeIn = a.fx.fadeIn;
	e.fadeOut = a.fx.fadeOut;
	e
			.setPageCss(
					[
							".red-world { position:fixed; top:50px; height:0; overflow:visible; left:560px; right:0; z-index:9999999;}",
							".red-bag { position:absolute; text-align:center; background:no-repeat center center;}",
							".red-bag-type0 { background-image:url(#{staticUrl}img/red0_af19b435.png);}",
							".red-bag-type1 { background-image:url(#{staticUrl}img/red1_468a2015.png);}",
							".red-bag-type2 { background-image:url(#{staticUrl}img/red2_5d7107fc.png);}",
							".red-plate { position:fixed; bottom:0; right:0; width:257px; height:358px;}",
							".red-plate-gress { position:absolute; bottom:0; left:69px; width:81px; height:119px; background:url(#{staticUrl}img/grass_4641bfa9.png);}",
							".red-plate-layer { position:absolute; bottom:0; right:0; width:256px; height:358px; background:url(#{staticUrl}img/plate_58ac9005.png) no-repeat -19px 0;}",
							".red-plate-close { position:absolute; top:153px; left:81px; width:72px; height:28px; cursor:pointer;}",
							".red-plate-day { position:absolute; left:98px; top:92px; width:40px; height:45px; background:url(#{staticUrl}img/plate_num_2ccaf15a.png) 0 45px no-repeat; cursor:pointer;}" ]
							.join("\n"), j);
	e.Plate = (function() {
		var r = function(u) {
			var v = e.isWebkit ? "webkit" : e.isFF ? "moz" : e.isOpera ? "o"
					: "";
			return "-" + v + "-" + u
		};
		var l = '<div class="red-plate"><div id="red-plate-layer" class="red-plate-layer"><a id="red-plate-day" target="_blank" class="red-plate-day" href="/chunjie/show/act"></a><a id="red-plate-close" class="red-plate-close"></a></div><div class="red-plate-gress" id="red-plate-gress"></div></div>';
		var m = 0.5, k = 0, t = 90, p = 10, o = null;
		var q = function() {
			if (t > 0) {
				k -= m
			} else {
				if (t < 0) {
					k += m
				}
			}
			k += k > 0 ? -0.1 : 0.1;
			if (t * (t + k) < 0) {
				p != 0 && p--
			}
			if (p != 0) {
				t += k
			} else {
				k = 0;
				t = 0
			}
			if (t == 0) {
				e.setStyle("red-plate-layer", r("transform"), "")
			} else {
				e.setStyle("red-plate-layer", r("transform"),
						"perspective(1280px) rotateX(" + t + "deg)")
			}
			o = setTimeout(q, 50)
		};
		var n = function() {
			e.insertHTML("red-world", "beforeEnd", l);
			e.setStyle("red-plate-layer", r("transform-origin-y"), "100%");
			var u = Math.floor(((new Date * 1) - (new Date("2013/2/1"))
					.getTime()) / 86400000);
			if (u < 0) {
				u = 0
			}
			if (!e.isWebkit) {
				e.fadeIn("red-plate-layer")
			} else {
				q()
			}
			e.setStyle("red-plate-day", "background-position", "0 -" + u * 45
					+ "px");
			e.g("red-plate-day").onclick = function() {
				k = (k + 10) / 2;
				p = 10;
				return !e.isWebkit
			};
			e.g("red-plate-close").onclick = function() {
				e.setCookie("CJEGG", 1, {
					path : "/chunjie",
					expires : (24 - (new Date()).getHours()) * 3600000
				});
				clearTimeout(o);
				e.removeDom("red-world")
			}
		};
		var s = function() {
			setTimeout(n, e.isIE ? 10 : 500)
		};
		return {
			init : s
		}
	})();
	e.Model = (function() {
		var n = {
			pointToString : function() {
				return this.x + "," + this.y
			},
			vectorToString : function() {
				return this.dX + "," + this.dY
			}
		};
		var o = function(r, s, q) {
			this.id = o.count++;
			this.x = r || 0;
			this.y = s || 0;
			this.radius = q || 10;
			this.speed = null
		};
		o.count = 0;
		o.prototype = {
			setSpeed : function(q) {
				this.speed = q;
				q.obj = this
			},
			next : function() {
				this.speed.next()
			},
			getPoint : function(s) {
				s = s || 0;
				var q, r;
				switch (s) {
				case 0:
					q = this.x;
					r = this.y;
					break;
				case 1:
					q = this.x;
					r = this.y - this.radius;
					break;
				case 2:
					q = this.x + this.radius;
					r = this.y - this.radius;
					break;
				case 3:
					q = this.x + this.radius;
					r = this.y;
					break;
				case 4:
					q = this.x + this.radius;
					r = this.y + this.radius;
					break;
				case 5:
					q = this.x;
					r = this.y + this.radius;
					break;
				case 6:
					q = this.x - this.radius;
					r = this.y + this.radius;
					break;
				case 7:
					q = this.x - this.radius;
					r = this.y;
					break;
				case 8:
					q = this.x - this.radius;
					r = this.y - this.radius;
					break
				}
				return {
					x : q,
					y : r
				}
			},
			testHit : function(r) {
				var q = this.radius + r.radius;
				if (Math.abs(this.x - r.x) < q && Math.abs(this.y - r.y) < q) {
					return true
				}
				return false
			},
			testPointHit : function(v, s) {
				var t = v.radius * 0.65, q = Math.abs, u = this.getPoint(s);
				return (q(u.x - v.x) < t && q(u.y - v.y))
			},
			toString : n.pointToString
		};
		var m = function(r, q) {
			this.dX = r || 0;
			this.dY = q || 0;
			this.obj = null;
			this.acces = [];
			this.rotation = null
		};
		m.prototype = {
			next : function() {
				if (this.disabled) {
					return
				}
				var q = this;
				e.forEach(this.acces, function(r) {
					r.next()
				});
				this.obj.x += this.dX;
				this.obj.y += this.dY;
				if (this.rotation) {
					this.rotation.next()
				}
			},
			disableSlow : function() {
				if (Math.abs(this.dY) < 4) {
					var q = Math.random() - 0.5;
					this.disable();
					this.dX = q;
					this.rotation.delta = q * 8
				}
			},
			addAcce : function(q) {
				q.speed = this;
				this.acces.push(q)
			},
			revert : function(s, q, r) {
				if (this.disabled) {
					return
				}
				this[s] = -q * this[s];
				if (r) {
					this[s] = Math.abs(this[s]) * r
				}
			},
			touch : function(q) {
				switch (q) {
				case "left":
					this.rotation.delta = (this.rotation.delta + this.dY / 30) / 2;
					this.revert("dX", 1, 1);
					break;
				case "right":
					this.rotation.delta = (this.rotation.delta - this.dY / 30) / 2;
					this.revert("dX", 0.5 + (Math.random() - 0.5) / 2, -1);
					break;
				case "bottom":
					this.rotation.delta = (this.rotation.delta - this.dX / 30) / 2;
					this.revert("dY", 0.5 + (Math.random() - 0.5) / 2, -1);
					this.disableSlow();
					break
				}
			},
			disable : function(q) {
				if (q === undefined) {
					q = true
				}
				this.disabled = q
			},
			setRotation : function(q) {
				this.rotation = q;
				q.speed = this
			},
			toString : n.vectorToString
		};
		var k = function(r, q) {
			this.dX = r || 0;
			this.dY = q || 0;
			this.speed = null
		};
		k.prototype = {
			setSpeed : function(q) {
				this.speed = q
			},
			next : function() {
				if (this.disabled) {
					return
				}
				this.speed.dX += this.dX;
				this.speed.dY += this.dY
			},
			disable : function() {
				this.disabled = true
			}
		};
		var p = function(r, q) {
			this.delta = r || 1;
			this.deg = q || 0;
			this.speed = null;
			this._maxDelta = 25
		};
		p.prototype = {
			next : function() {
				if (this.speed.disabled) {
					return
				}
				if (this.delta > this._maxDelta) {
					this.delta = this._maxDelta
				} else {
					if (this.delta < -this._maxDelta) {
						this.delta = -this._maxDelta
					}
				}
				this.deg += this.delta;
				if (this.deg > 360) {
					this.deg -= 360
				} else {
					if (this.deg < 0) {
						this.deg += 360
					}
				}
			}
		};
		var l = function(r, q) {
			this.width = r;
			this.height = q
		};
		l.prototype = {
			setWidth : function() {
			},
			setHeight : function(q) {
				this.height = q
			},
			isTouchLeft : function(q) {
				return q.x - q.radius < 0
			},
			isTouchRight : function(q) {
				return q.x + q.radius > this.width
			},
			isTouchBottom : function(q) {
				return q.y + q.radius > this.height
			}
		};
		return {
			Obj : o,
			Speed : m,
			Acce : k,
			Rotation : p,
			World : l
		}
	})();
	e.Mgr = (function(r) {
		var q = {
			"0" : 74,
			"1" : 73,
			"2" : 64
		};
		var n = [], p = null, l = 0;
		var t = function(v, x, u, y) {
			l = y;
			p = new r.World(x, u);
			for ( var w = 0; w < v; w++) {
				n.push(s())
			}
		};
		var o = function() {
			for ( var x = 0, v = n.length; x < v; x++) {
				var y = n[x];
				if (p.isTouchLeft(y)) {
					y.speed.rotation.delta += y.speed.dY / 30;
					y.speed.revert("dX", 1, 1)
				} else {
					if (p.isTouchRight(y)) {
						y.speed.rotation.delta += -y.speed.dY / 30;
						y.speed.revert("dX", 0.5, -1)
					}
				}
				var w = false, u = false;
				if (p.isTouchBottom(y)) {
					y.speed.rotation.delta += y.speed.dX / 30;
					y.speed.revert("dY", 0.5 + (Math.random() - 1) / 5, -1);
					y.speed.disableSlow()
				}
				y.next()
			}
		};
		var k = function() {
			var u = s();
			n.push(u);
			return u
		};
		var s = function() {
			var v = Math.floor(Math.random() * 3);
			var x = new r.Obj(Math.random() * -400 * l, 60 * l, q[v] * l / 2), u = new r.Acce(
					0, 10), y = new r.Speed((1 + Math.random()) * p.width / 30,
					(0.3 - Math.random()) * p.height / 100), w = new r.Rotation(
					(Math.random() - 0.5) * 8);
			x.typeid = v;
			y.addAcce(u);
			y.setRotation(w);
			x.setSpeed(y);
			return x
		};
		var m = function(v) {
			p.setHeight(v);
			for ( var w = 0, u = n.length; w < u; w++) {
				var x = n[w];
				if (x.y > v) {
					x.y = v
				}
				x.speed.disable(false)
			}
		};
		return {
			init : t,
			next : o,
			setWorldHeight : m,
			addBag : k,
			getObjs : function() {
				return n
			}
		}
	})(e.Model);
	e.View = (function() {
		var l = {
			stage : "",
			bag : '<div id="red-bag-#{id}" class="red-bag red-bag-type#{typeid}" style="width:#{length}px;height:#{length}px;#{filter}"></div>',
			filter : 'progid:DXImageTransform.Microsoft.Matrix(M11="#{m11}",M12="#{m12}",M21="#{m21}",M22="#{m22}",sizingMethod="auto expand");'
		};
		var n = null, q;
		var p = function(s, u) {
			q = u;
			n = document.createElement("div");
			document.body.appendChild(n);
			n.id = "red-world";
			n.className = "red-world";
			for ( var t = 0, r = s.length; t < r; t++) {
				o(s[t])
			}
		};
		var o = function(r) {
			e.insertHTML("red-world", "beforeEnd", e.formatString(l.bag, {
				id : r.id,
				length : r.radius * q * 2,
				typeid : r.typeid
			}))
		};
		var m = function(s) {
			var t = s.speed.rotation.deg, r = null;
			if (e.isIE) {
				var z = Math.PI / 180, x = t * z, w = Math.sin(x), y = Math
						.cos(x), u = 0;
				var v = Math.abs(parseInt(t) % 90);
				if (v > 45) {
					v = 90 - v
				}
				u = s.radius / Math.cos(v * z);
				r = {
					top : (s.y - u) * q + "px",
					left : (s.x - u) * q + "px",
					filter : e.formatString(l.filter, {
						m11 : y,
						m12 : -w,
						m21 : w,
						m22 : y
					})
				}
			} else {
				r = {
					top : (s.y - s.radius) * q + "px",
					left : (s.x - s.radius) * q + "px",
					"-webkit-transform" : "rotate(" + t + "deg)",
					"-o-transform" : "rotate(" + t + "deg)",
					"-moz-transform" : "rotate(" + t + "deg)"
				}
			}
			e.setStyles("red-bag-" + s.id, r)
		};
		var k = function(s) {
			for ( var t = 0, r = s.length; t < r; t++) {
				m(s[t])
			}
		};
		return {
			init : p,
			drawBags : k,
			addBag : o
		}
	})();
	var b = 10, c = e.isIE ? 3 : 5;
	addtionBag = c * 6;
	if (!e.isIpad) {
		e.Mgr.init(c, (e.getViewWidth() - 560) * b, (e.getViewHeight() - 50)
				* b, b);
		var g = e.Mgr.getObjs();
		e.View.init(g, 1 / b);
		var f = new Date * 1, h = 300 / b;
		var i = function() {
			if (Math.random() < 0.5 && addtionBag > 0) {
				var k = e.Mgr.addBag();
				addtionBag--;
				e.View.addBag(k)
			}
			e.View.drawBags(e.Mgr.getObjs());
			e.Mgr.next();
			setTimeout(i, h);
			var m = new Date * 1, n = m - f, l = (n - h) / h;
			f = m
		};
		window.onresize = function() {
			e.Mgr.setWorldHeight((e.getViewHeight() - 50) * 10)
		};
		i();
		e.Plate.init()
	} else {
	}
})();