var JCP = {
	setup : {
		download : "http://print.jatools.com/jcp/setup.exe",
		noSetupMessage : "杰表云打印（JCP）未安装, 请下载安装之."
	}
}
var _hmt = _hmt || [];//#########//不要去掉
//var LIC = {
//key : "kYWRjOTFiMGIzYWFiZGMWUwMDFlNTEwMTU5MDYwZDdlMDk1MjU4NDYyNDBkMDE1MTVjNjU1YzA0NWNjOWIzZGU4MTVkNzkyZDI3ZDg5ZWJjOGQ2MDExMTgxYjUyZGRjZDkxYjBkOTkyYmViZWZlYWFkNmRjYTViNWE0ZGI5NjkwYTE5MmEzYWJlM2M5YWM4ZmJmYWFhM2QxOWM5MmI3ZDlkNWE2OWJiN2IyYTRhMGIxZDVkOGU1ZDY0OTRjYWE4YmU3OTFkNGQxYTFkNGQ2YmU5NjllYWRhN2QxOTRmYWQzYWJjZGJjYWM0MDUzZTBjZGIwYjNkZGI3OTJkNTRmYzliM2RiZDhiYmMzZDQ5YmJmZDliY2ZjZGE4N2JjYzc0ZjFiMDQ1OTQ2MGYwZDE4MDA0MzA2MTI1YTBjMDAwMTc5NGExYjU4NWQ1YjVkMDI1ODU5NWE1ZjQxNWQ0NzAyNWY1ZTVkNWI1ZDAyNTg1OTVhNWY0MTVhNWYxOTUzNTQ1ZTViNDExYzQ0NTE1YTVlNDM1YjQ4",
//copyrights : '本控件已依法授权给宁夏希望信息产业股份有限公司, 其他单位和个人禁止使用, 违者必究.杰创软件拥有版权 www.jatools.com'
//}
var EXPORT_HOST = "www.jatools.com";// "127.0.0.1";//192.168.0.101";
function Jcp(ip, forward, password) {
	// implement JSON.parse de-serialization
	var JSONparse = JSON.parse || function(str) {
		if (str === "")
			str = '""';
		eval("var p=" + str + ";");
		return p;
	};
	function log(e) {
		//window.console && console.log(e);
	}
	function ajax(url, data, callback, result/*只取 data.result的值，type=service时用*/) {
		try {
			if (data && typeof(data) === 'object') {
				data.tab = tab_id || "";
				data = JSONstringify(data);
			}
			//XDomainRequest is an implementation of HTTP access control (CORS) that worked in Internet Explorer 8 and 9. 
			//It was removed in Internet Explorer 10 in favor of using XMLHttpRequest with proper CORS; 
			//if you are targeting Internet Explorer 10 or later, or wish to support any other browser, you need to use standard HTTP access control.
			var x = new (window.XDomainRequest || window.XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
			//x.timeout = 1000 * 60;
			//	x = createCORSRequest(data ? 'POST' : 'GET', url);
			x.open(data ? 'POST' : 'GET', url, 1);
			//x.timeout = 1000 * 60;
			if (window.XDomainRequest) {
				x.onload = function() {
					//$("#console").text($("#console").text() + "\n" + x.responseText);
					var data = JSONparse(x.responseText || "{}");
					if (result) {
						data = typeof(data.result) == "undefined" ? "" : data.result;
					}
					callback && callback(data, x.responseText, 200);
				}
				x.ontimeout = function() {
					callback && callback(data, x.responseText, 404);
				};
				x.onerror = function() {
					callback && callback(data, x.responseText, 404);
				};
				//		setTimeout(function() {
				x.send(data)
				//			}, 0);
			} else {
				x.onreadystatechange = function() {
					//$("#console").text($("#console").text() + "\n" + x.responseText);
					try {
						var data = JSONparse(x.responseText || "{}");
						if (result) {
							data = typeof(data.result) == "undefined" ? "" : data.result;
						}
						x.readyState > 3 && callback && callback(data, x.responseText, x.status);
					} catch (e) {
						log(e);
					}
				};
				x.send(data)
			}
			//	x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			//	x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			//x.send(data)
		} catch (e) {
			log(e);
		}
	};
	// 取得 documents 属性
	function ___(doc, id) {
		return doc.getElementById(id);
	}
	function ___getCSS(d) {
		var b = "";
		var e = d.styleSheets;
		for (var g = 0; g < e.length; g++) {
			var h = e[g];
			try {
				var c = h.cssRules;
				if (c) {
					for (var a = 0; a < c.length; a++) {
						b += c[a].cssText || ""
					}
				} else {
					if (h.cssText) {
						b += h.cssText
					}
				}
			} catch (f) {
			}
		}
		return (b + "").replace(/[\s]*\n/gm, "");
	}
	function ___outerHTML(doc, node, ins) {
		if (doc.doctype)
			node.setAttribute('_strict', 'true');
		return node.outerHTML || (function(n) {
			var div = doc.createElement('div'), h;
			div.appendChild(n.cloneNode(true));
			h = div.innerHTML;
			div = null;
			return h;
		})(node);
	}
	var thisdone;
	function ___getDocumentItem(doc, myDoc) {
		var ins = myDoc.inputs || false;
		if (typeof(doc.getElementById) != 'undefined') {
			if (ins) {
				var inps = doc.getElementsByTagName("input");
				for (var i = 0; i < inps.length; i++) {
					var inp = inps[i];
					if (inp.type == 'checkbox' || inp.type == 'radio') {
						if (inp.checked) {
							inp.setAttribute("checked", inp.checked);
						} else {
							inp.removeAttribute("checked");
						}
					} else {
						inp.setAttribute("value", inp.value);
					}
				}
				inps = doc.getElementsByTagName("textarea");
				for (var i = 0; i < inps.length; i++) {
					var inp = inps[i];
					inp.innerHTML = inp.value.replace('\n', '&#13;&#10;');
				}
			}
			var html = '';
			var result = {
				style : ___getCSS(doc)
			};
			if (myDoc.pages) {
				for (var i = 0; i < myDoc.pages.length; i++) {
					var page = myDoc.pages[i];
					if (typeof(page.substring) != 'undefined') {
						page = ___(doc, page);
					}
					html += ("<div id='page" + (i + 1) + "'>" + ___outerHTML(doc, page, ins) + "</div>");
				}
			} else {
				if (myDoc.jobPages) {
					if (!myDoc.jobBase) {
						myDoc.jobBase = 0;
						thisdone = myDoc.done || null;
						var i = 0;
						while (true) {
							var page = ___(doc, (myDoc.pagePrefix || '') + 'page' + (i + 1));
							if (!page)
								break;
							i++;
						}
						myDoc.totalPages = i;
					}
					for (var i = 0; i < myDoc.jobPages; i++) {
						var page = ___(doc, (myDoc.pagePrefix || '') + 'page' + (i + myDoc.jobBase + 1));
						if (!page)
							break;
						html += ___outerHTML(doc, page, ins);
					}
					if (myDoc.done) {
						myDoc.done = function() {
							var page = ___(doc, (myDoc.pagePrefix || '') + 'page' + (i + myDoc.jobBase + 1));
							if (!page && thisdone) {
								thisdone();
							} else {
								myDoc.jobBase = myDoc.jobBase + myDoc.jobPages;
								myDoc.documents = document;
								self.print(myDoc, false);
							}
						}
					}
				} else {
					var i = 0;
					while (true) {
						var page = ___(doc, (myDoc.pagePrefix || '') + 'page' + (i + 1));
						if (!page)
							break;
						html += ___outerHTML(doc, page, ins);
						i++;
					}
					result.valid = true;
				}
			}
			if (ins)
				result.inputs = html;
			else {
				result.pages = html;
			}
			return result;
		} /*else if (doc.html && doc.all) {
		var result = "NSAPI://*" + doc.html;
		return result;
		} else if (doc.html) {
		var result = "NSAPI:// --\n\n\n--";
		if (!doc.html.push) {
		doc.html = [doc.html];
		}
		for (var i = 0; i < doc.html.length; i++) {
		result += ("<div id='page" + (i + 1) + "'>" + doc.html[i] + "</div>");
		}
		return result;
		} */else
			return doc;
	}
	function ___myDoc(myDoc) {
		myDoc.documents = ___getPrintedHTML(myDoc);
		if (myDoc.footer && myDoc.footer.html.innerHTML) {
			__inlineStyle(myDoc.footer.html);
			myDoc.footer.html = myDoc.footer.html.innerHTML;
		}
		if (myDoc.header && myDoc.header.html.innerHTML) {
			__inlineStyle(myDoc.header.html);
			myDoc.header.html = myDoc.header.html.innerHTML;
		}
		return myDoc;
	}
	function ___loadDocuments(myDoc, callback) {
		var docs = myDoc.documents;
		var isurl = false;
		if (docs.substring) {
			isurl = true;
			docs = [docs];
		}
		var needs = 0;
		var wrapper = document.getElementById("_jp_wrapper");
		if (!wrapper) {
			wrapper = document.createElement("div");
			wrapper.style.position = 'absolute';
			wrapper.style.left = '-3000px';
			wrapper.style.width = '2500px';
			wrapper.id = '_jp_wrapper';
			document.body.appendChild(wrapper);
		} else
			wrapper.innerHTML = '';
		var loaded = function() {
			// alert("aaaaaaaaaa");
			if (true || (event.srcElement.readyState || '') == "complete") {
				docs[event.srcElement.ownerIndex] = event.srcElement.contentWindow.document;
				needs--;
				if (needs == 0) {
					if (isurl) {
						myDoc.documents = docs[0];
					}
					callback();
				}
			}
		}
		if (typeof(docs.push) != 'undefined') {
			for (var i = 0; i < docs.length; i++) {
				if (docs[i].substring) {
					needs++;
					var frame = document.createElement("iframe");
					frame.ownerIndex = i;
					// frame.onreadystatechange= loaded;
					if (frame.attachEvent) {
						frame.attachEvent("onload", loaded);
					} else {
						frame.onload = loaded;
					}
					frame.src = docs[i];
					wrapper.appendChild(frame);
				}
			}
		} else {
			if (isurl) {
				myDoc.documents = docs[0];
			}
			callback();
		}
	}
	function __inlineStyle(target) {
		var properties = ['border', 'border-radius', 'box-shadow', 'height', 'margin', 'padding', 'width2', 'max-width', 'min-width', 'border-collapse', 'border-spacing',
				'caption-side', 'empty-cells', 'table-layout', 'direction', 'font', 'font-family', 'font-style', 'font-variant', 'font-size', 'font-weight', 'letter-spacing',
				'line-height', 'text-align', 'text-decoration', 'text-indent', 'text-overflow', 'text-shadow', 'text-transform', 'white-space', 'word-spacing', 'word-wrap',
				'vertical-align', 'color', 'background', 'background-color', 'background-image', 'background-position', 'background-repeat', 'Opacity', 'bottom', 'clear', 'clip',
				'cursor', 'display', 'float', 'left', 'opacity', 'outline ', 'overflow', 'position', 'resize ', 'right', 'top', 'visibility', 'z-index', 'list-style-image',
				'list-style-position', 'list-style-type'];
		var elements = target.getElementsByTagName('*');
		for (var e = 0; e < elements.length; e++) {
			var el = elements.item(e);
			if (el.tagName == 'IMG') {
				el.src = el.src;
			}
			var thisProps = (el.getAttribute("style") || '').split(";");
			for (var p = 0; p < properties.length; p++) {
				var thisProp = properties[p];
				var thisValue = null;
				if (el.currentStyle) {
					thisValue = el.currentStyle[thisProp];// margin;
				} else if (window.getComputedStyle) {
					if (window.getComputedStyle.getPropertyValue) {
						thisValue = window.getComputedStyle(el, null).getPropertyValue(thisProp)
					} else {
						thisValue = window.getComputedStyle(el)[thisProp]
					};
				}
				if (thisValue) {
					el.style[thisProp] = thisValue;
				}
			}
		}
	};
	function ___getPrintedHTML(myDoc) {
		var docs = myDoc.documents, result = null;
		if (typeof(docs.push) != 'undefined') {
			result = [];
			for (var i = 0; i < docs.length; i++) {
				result.push(___getDocumentItem(docs[i], myDoc));
			}
			return result;
		} else {
			return ___getDocumentItem(docs, myDoc);
		}
	}
	function ___getDocumentHTML(target) {
		var result = "<html><head><style>" + ___getCSS(target.ownerDocument) + "</style></head><body>" + ___outerHTML(target.ownerDocument, target) + '</body></html>';
		return result;
	}
	function ___getWholeDocumentHTML(doc) {
		var result = "<html><head><base href='" + doc.URL + "'/><style>" + ___getCSS(doc) + "</style></head><body>" + doc.body.innerHTML + '</body></html>';
		return result;
	}
	var lut = [];
	for (var i = 0; i < 256; i++) {
		lut[i] = (i < 16 ? '0' : '') + (i).toString(16);
	}
	function e7() {
		var d0 = Math.random() * 0xffffffff | 0;
		var d1 = Math.random() * 0xffffffff | 0;
		var d2 = Math.random() * 0xffffffff | 0;
		var d3 = Math.random() * 0xffffffff | 0;
		return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' + lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40]
				+ lut[d1 >> 24 & 0xff] + '-' + lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] + lut[d3 & 0xff]
				+ lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
	}
	function empty(json) {
		for (p in json) {
			return false;
		}
		return true;
	}
	function registerMyDocListeners(myDoc) {
		var events = ["done", "onState", "listener", "onPagePrinted"];
		for (var i = 0; i < events.length; i++) {
			var e = events[i];
			if (myDoc[e]) {
				myDoc[e] = registerCallback(myDoc[e], false, i > 0 /*除了done外，其他事件都不能删除*/);
				myDoc._hasCallback = true;
			}
		}
		if (myDoc.dragDesigner && myDoc.dragDesigner.ok) {
			myDoc.dragDesigner.ok = registerCallback(myDoc.dragDesigner.ok);
			myDoc._hasCallback = true;
		}
	}
	var common_url;
	var private_url;
	var urls = [];
	urls[3] = "http://" + ip + ":31227/api?type=service&";
	urls[4] = "http://" + ip + ":31227/api?type=admin&";
	var callbacks = {};
	var eventIndex = 0;
	var tab_id;
	var pulling;
	function tick() {
		setTimeout(function() {
					ajax(urls[1] + 'type=TICK&', {}, function(data, text, status) {
								if (status != 200 || data["api-error"]) { //  {"api-error":"NO_TAB"}
									on = false;
									return;
								}
								tick();
							});
				}, 30000);
	}
	function pull() {
		pulling = true;
		ajax(urls[1] + 'type=PULL&', {}, function(data, text, status) {
					if (status != 200 || data["api-error"]) { //  {"api-error":"NO_TAB"}
						on = false;
						return;
					}
					try {
						if (data.event) {
							callbacks[data.event].apply(null, data.params || [data.data])
							if (data.event.indexOf("fixed") != 0) {
								delete callbacks[data.event];
							}
						}
					} catch (e) {
					}
					if (empty(callbacks)) {
						//	console.log("callback empty,stop pull");
						pulling = false;
					} else {
						pull();
					}
				});
	}
	var on = false;
	var downloading = false;
	var delays = [];
	function login(callback) {
		callback && delays.push(callback);
		if (delays.length == 1 || !callback) {
			var newdata = {
				method : "new",
				lic : typeof(LIC) != 'undefined' ? LIC.key : "",
				base : document.URL
			};
			var forw = ""
			if (forward) {
				newdata.password = password;
				forw = "forward=" + forward + "&";
			}
			ajax("http://" + ip + ":31227/api?type=NEW&" + forw, newdata, function(data, r, status) {
						if (status != 200) {
							// data={"api-error":"BROWSER_NOT_SUPPORT"}
							//delays.length = 0;
							var error = ' 杰表云打印（JCP）未安装或未运行.';
							if (!opts.silent) {
								if (ip !== '127.0.0.1') {
									alert(error = "无法连接 JCP 站：" + ip);
									return log(error);
								}
								if (JCP.setup) {
									if (JCP.setup.noSetupHandle) {
										JCP.setup.noSetupHandle();
									} else if (!downloading) { //  避免重复提示
										if (JCP.setup.noSetupMessage)
											error = JCP.setup.noSetupMessage;
										alert(error);
										if (JCP.setup.download) {
											downloading = true;
											document.location.href = JCP.setup.download;
											var checkverion = function() {
												ajax("http://" + ip + ":31227/api?type=service&", {
															method : "getVersion"
														}, function(data, r, status) {
															if (data.result) {
																login(null);
															} else
																setTimeout(checkverion, 3000);
														});
											}
											setTimeout(checkverion, 10000);
										}
									}
								} else
									alert(error);
							}
							return log(error);
						} else if (data["api-result"]) {
							on = true;
							tab_id = data["api-result"];
							urls[0] = "http://" + ip + ":31227/api?tab=" + tab_id + "&use=common" + "&" + forw;
							urls[1] = "http://" + ip + ":31227/api?tab=" + tab_id + "&" + forw;
							urls[2] = "http://" + ip + ":31227/api?type=UPDATE&";
							urls[3] = "http://" + ip + ":31227/api?type=service&";
							self.tab = tab_id;
							tick();
							pull();
							if (JCP.setup.version && JCP.setup.version != data["version"]) {
								var checkverion = function() {
									ajax(urls[3], {
												method : "getVersion"
											}, function(data, r, status) {
												//console.log(data);
												if (data.result != JCP.setup.version) {
													setTimeout(checkverion, 3000);
												} else {
													login(null);
												}
											});
								}
								getJCP().update(JCP.setup.download, JCP.setup.version);
								setTimeout(checkverion, 3000);
							} else {
								while (delays.length) {
									delays.shift()();
								}
							}
							//	callback();
						} else {
							// data={"api-error":"BROWSER_NOT_SUPPORT"}
							delays.length = 0;
							alert(data["api-error"]);
							return log(data["api-error"]);
						}
					});
		}
	}
	function registerCallback(callback, json, fixed) {
		if (callback) {
			var index = fixed ? "fixed" : "event-" + eventIndex++;
			callbacks[index] = !json ? callback : function(result) {
				result = eval("(" + result + ")");
				callback(result);
			};
			return tab_id + ":" + index;
		} else
			return "";
	}
	function _call(callback) {
		if (!on) {
			login(callback);
		} else {
			callback();
		}
	}
	function messagecallback(data, text, status) {
		if (status != 200 || data["api-error"]) { //  {"api-error":"NO_TAB",}
			if (status == 200 && (data["api-error"] == 1003 || data["api-error"] == 'NO_LICENSED_HOST')) {
				var ec = data["ec"] || 0;
				if (ec == 0)
					alert("未经绑定的主机：" + data["host"]);
				else if (ec == 1) {
					alert("本版本为试用版，不支持在 " + data["host"] + " 上试用，请在 127.0.0.1 上试用.");
				} else if (ec == 2) {
					alert("本版本为试用版，在 127.0.0.1上试用到期，购买请联系手机: (0)18969037811 .");
				} else if (ec == 3) {
					alert("受限版本，不支持当前浏览器.");
				} else if (ec == 4) {
					alert("不要以本地文件方式打开页面，请以 HTTP 或 HTTPS 方式打开（即通过web服务器）.");
				} else if (ec == 5) {
					alert("错误的访问令牌.");
				} else if (ec == 6) {
					alert("This JCP supports chinese simplified OS only.");
				}
				callbacks = {};
			}
			on = false;
			return;
		}
	}
	function send_message(target, param, data) {
		(!pulling) && pull();
		ajax(urls[target] + (param || ''), data, messagecallback);
	}
	var new_ = true;
	var opts = {};
	var self = null;
	return ((self = {
		"initialize" : function() {
			return this;
		},
		"options" : function(o) {
			if (o) {
				opts = o;
				return this;
			} else {
				return opts;
			}
		},
		"print" : function(myDoc, prompt) {
			_call(function() {
						//							___loadDocuments(myDoc, function() {
						myDoc = ___myDoc(myDoc);
						registerMyDocListeners(myDoc);
						send_message(1, null, {
									method : "print",
									params : [myDoc, prompt ? true : false]
								});
					});
			//	})
		},
		"printPreview" : function(myDoc, prompt) {
			_call(function() {
						//		___loadDocuments(myDoc, function() {
						myDoc = ___myDoc(myDoc);
						registerMyDocListeners(myDoc);
						send_message(1, null, {
									method : "printPreview",
									params : [myDoc, prompt ? true : false]
								});
					});
			//})
		},
		"getVersion" : function(callback) {
			_call(function() {
						send_message(0, "tq=1&", {
									method : "getVersion",
									event : registerCallback(callback)
								});
					})
		},
		"getDefaultPrinter" : function(callback) {
			_call(function() {
						send_message(0, null, {
									method : "getDefaultPrinter",
									event : registerCallback(callback)
								});
					})
		},
		"getPrinterCapability" : function(printer, cap, callback) {
			var callback2 = function(result) {
				result = eval("(" + result + ")");
				callback(result.result);
			}
			_call(function() {
						send_message(0, null, {
									method : "getPrinterCapability",
									params : [printer, cap],
									event : registerCallback(callback2)
								});
					})
		},
		"about" : function() {
			_call(function() {
						send_message(1, "tq=1&", {
									method : "about"
								});
					})
		},
		"exit" : function() {
			_call(function() {
						send_message(1, null, {
									method : "exit"
								});
					})
		},
		"emptyCallback" : function() {
		},
		"getPrinters" : function(callback) {
			_call(function() {
						send_message(0, null, {
									method : "getPrinters",
									event : registerCallback(callback)
								});
					})
		},
		"getPrinterJobs" : function(printer, callback) {
			_call(function() {
						send_message(0, null, {
									method : "getPrinterJobs",
									params : [printer],
									event : registerCallback(callback)
								});
					})
		},
		"isPrinterError" : function(printer, callback) {
			_call(function() {
						send_message(0, null, {
									method : "isPrinterError",
									params : [printer],
									event : registerCallback(callback)
								});
					})
		},
		"getPapers" : function(printer, callback) {
			_call(function() {
						send_message(0, null, {
									method : "getPapers",
									params : [printer],
									event : registerCallback(callback)
								});
					})
		},
		"getCaptureSources" : function(callback) {
			_call(function() {
						send_message(1, null, {
									method : "getCaptureSources",
									event : registerCallback(callback, true)
								});
					})
		},
		"getCaptureSources" : function(callback) {
			_call(function() {
						send_message(1, null, {
									method : "getCaptureSources",
									event : registerCallback(callback, true)
								});
					})
		},
		"getCaptureSettings" : function(source, callback) {
			_call(function() {
						send_message(1, null, {
									method : "getCaptureSettings",
									event : registerCallback(callback, true)
								});
					})
		},
		"capture" : function(source, callback) {
			_call(function() {
						send_message(1, null, {
									method : "capture",
									params : [source || '', {}],
									event : registerCallback(function(url) {
												callback(url);
												
											})
								});
					});
		},
		"isCustomPaperSupported" : function(printer, callback) {
			_call(function() {
						send_message(0, null, {
									method : "isCustomPaperSupported",
									params : [printer],
									event : registerCallback(callback)
								});
					})
		},
		"addPaper" : function(printer, name, width, height, callback) {
			_call(function() {
						send_message(0, null, {
									method : "addPaper",
									params : [printer, name, width, height],
									event : registerCallback(callback)
								});
					})
		},
		/*	"isExcelInstalled" : function(callback) {
				_call(function() {
							send_message(0, null, {
										method : "isExcelInstalled",
										event : registerCallback(callback)
									});
						})
			},*/
		"isImplemented" : function(method, callback) {
			_call(function() {
						send_message(0, null, {
									method : "isImplemented",
									params : [method],
									event : registerCallback(callback)
								});
					})
		},
		"getLocalMacAddress" : function(callback) {
			_call(function() {
						send_message(0, null, {
									method : "getLocalMacAddress",
									event : registerCallback(callback)
								});
					})
		},
		"getCPUSerialNo" : function(callback) {
			_call(function() {
						send_message(0, null, {
									method : "getCPUSerialNo",
									event : registerCallback(callback)
								});
					})
		},
		"setOffsetPage" : function(offset, callback) {
			_call(function() {
						send_message(0, null, {
									method : "setOffsetPage",
									params : [offset],
									event : registerCallback(callback)
								});
					})
		},
		"isInstalled" : function(filetype, callback) {
			_call(function() {
						send_message(0, null, {
									method : "isInstalled",
									params : [filetype],
									event : registerCallback(callback)
								});
					})
		},
		"setDragCSS" : function(settingid, styles, callback) {
			_call(function() {
						send_message(0, null, {
									method : "setDragCSS",
									params : [settingid, styles],
									event : registerCallback(callback)
								});
					})
		},
		"clearSettings" : function(settingid, callback) {
			_call(function() {
						send_message(0, null, {
									method : "clearSettings",
									params : [settingid],
									event : registerCallback(callback)
								});
					})
		},
		"getSettingsIds" : function(callback) {
			_call(function() {
						send_message(0, null, {
									method : "getSettingsIds",
									event : registerCallback(callback, true)
								});
					})
		},
		"printTIFF" : function(url, margins, how, callback) {
			_call(function() {
						send_message(1, null, {
									method : "printTIFF",
									params : [url, margins, how],
									event : registerCallback(callback)
								});
					})
		},
		"printDocument" : function(file, sets, callback) {
			_call(function() {
						registerMyDocListeners(sets);
						//	if (sets["fileType"] == "pdf" || sets[""]) {
						sets.setup = JCP.setup.download;
						//	}
						send_message(1, null, {
									method : "printDocument",
									params : [file, sets],
									event : registerCallback(callback)
								});
					})
		},
		"exportAsExcel" : function(tableEl, path, showProgress, callback) {
			_call(function() {
						var html = ___getDocumentHTML(tableEl);
						send_message(1, null, {
									method : "exportAsExcel",
									params : [html, path, showProgress],
									event : registerCallback(callback)
								});
					})
		},
		"setupNormalOffset" : function(settingid, callback) {
			_call(function() {
						send_message(1, null, {
									method : "setupNormalOffset",
									params : [settingid],
									event : registerCallback(callback)
								});
					})
		},
		"download" : function(url, file, callback) {
			_call(function() {
						send_message(0, null, {
									method : "download",
									params : [url, file],
									event : registerCallback(callback)
								});
					})
		},
		"printToImage" : function(myDoc, path, callback) {
			_call(function() {
						myDoc = ___myDoc(myDoc);
						registerMyDocListeners(myDoc);
						send_message(1, null, {
									method : "printToImage",
									params : [myDoc, path],
									event : registerCallback(callback)
								});
					})
		},
		"exportAsImage" : function(myDoc, type, callback) {
			if (ip == EXPORT_HOST) {
				_call(function() {
							myDoc = ___myDoc(myDoc);
							//myDoc.printer = 'PDFLite';
							send_message(1, null, {
										method : "exportAsImage",
										params : [myDoc, type],
										event : registerCallback(function(file) {
													var url = "http://" + ip + ":31227/api?type=download&file=" + file;
													callback(url);
												})
									});
						});
			} else
				getJCP(EXPORT_HOST).exportAsImage(myDoc, type, callback);
		},
		"exportAsPDF" : function(myDoc, callback) {
			if (ip == EXPORT_HOST) {
				_call(function() {
							myDoc = ___myDoc(myDoc);
							//myDoc.printer = 'PDFLite';
							send_message(1, null, {
										method : "exportAsPDF",
										params : [myDoc],
										event : registerCallback(function(file) {
													var url = "http://" + ip + ":31227/api?type=download&file=" + file;
													callback(url);
												})
									});
						});
			} else
				getJCP(EXPORT_HOST).exportAsPDF(myDoc, callback);
		},
		"exportAsTIFF" : function(myDoc, callback) {
			if (ip == EXPORT_HOST) {
				_call(function() {
							myDoc = ___myDoc(myDoc);
							//	myDoc.printer = 'PDFLite';
							send_message(1, null, {
										method : "exportAsTIFF",
										params : [myDoc],
										event : registerCallback(function(file) {
													var url = "http://" + ip + ":31227/api?type=download&file=" + file;
													callback(url);
												})
									});
						});
			} else
				getJCP(EXPORT_HOST).exportAsTIFF(myDoc, callback);
		},
		"configUpdate" : function(config, updateNow, callback) {
			_call(function() {
						send_message(2, null, {
									method : "configUpdate",
									params : [config, updateNow],
									event : registerCallback(callback)
								});
					})
		},
		"update" : function(url, version, callback) {
			_call(function() {
						send_message(2, null, {
									method : "update",
									params : [url, version],
									event : registerCallback(callback)
								});
					})
		},
		"getFonts" : function(callback) {
			_call(function() {
						send_message(0, null, {
									method : "getFonts",
									event : registerCallback(callback)
								});
					})
		},
		"copy" : function(data, format, callback) {
			_call(function() {
						send_message(0, null, {
									method : "copy",
									params : [data, format],
									event : registerCallback(callback)
								});
					})
		},
		"copied" : function(format, callback) {
			_call(function() {
						send_message(0, null, {
									method : "copied",
									params : [format],
									event : registerCallback(callback)
								});
					})
		},
		"writeString" : function(file, encode, data, callback) {
			_call(function() {
						send_message(0, null, {
									method : "writeString",
									params : [file, encode, data],
									event : registerCallback(callback)
								});
					})
		},
		"writeBase64" : function(file, data, callback) {
			_call(function() {
						send_message(0, null, {
									method : "writeBase64",
									params : [file, data],
									event : registerCallback(callback)
								});
					})
		},
		"readString" : function(file, encode, callback) {
			_call(function() {
						send_message(0, null, {
									method : "readString",
									params : [file, encode],
									event : registerCallback(callback)
								});
					})
		},
		"readBase64" : function(file, callback) {
			_call(function() {
						send_message(0, null, {
									method : "readBase64",
									params : [file],
									event : registerCallback(callback)
								});
					})
		},
		"readHTML" : function(file, defencode, callback) {
			_call(function() {
						send_message(0, null, {
									method : "readHTML",
									params : [file, defencode],
									event : registerCallback(callback)
								});
					})
		},
		"chooseFile" : function(ext, defext, saveselect, callback) {
			_call(function() {
						send_message(1, null, {
									method : "chooseFile",
									params : [ext, defext, saveselect],
									event : registerCallback(callback)
								});
					})
		},
		"showPageSetupDialog" : function(callback) {
			var callback2 = function(result) {
				callback(result ? eval("(" + result + ")") : null);
			}
			_call(function() {
						send_message(0, null, {
									method : "showPageSetupDialog",
									event : registerCallback(callback2)
								});
					})
		},
		"getLastSettings" : function(settingid, callback) {
			_call(function() {
						send_message(0, null, {
									method : "getLastSettings",
									params : [settingid],
									event : registerCallback(callback)
								});
					})
		},
		"getAbsoluteURL" : function(relative, base, callback) {
			var stack = base.split("/"), parts = relative.split("/");
			stack.pop(); // remove current file name (or empty string)
			// (omit if "base" is the current folder without trailing slash)
			for (var i = 0; i < parts.length; i++) {
				if (parts[i] == ".")
					continue;
				if (parts[i] == "..")
					stack.pop();
				else
					stack.push(parts[i]);
			}
			(callback || this.nothing).call(this, stack.join("/"));
		},
		"setLastSettings" : function(settingid, doc, callback) {
			_call(function() {
						send_message(0, null, {
									method : "setLastSettings",
									params : [settingid, doc],
									event : registerCallback(callback)
								});
					})
		},
		"setDefaultPrinter" : function(printer, callback) {
			_call(function() {
						send_message(0, null, {
									method : "setDefaultPrinter",
									params : [printer],
									event : registerCallback(callback)
								});
					})
		},
		"openFile" : function(file, callback) {
			_call(function() {
						send_message(1, null, {
									method : "openFile",
									params : [file],
									event : registerCallback(callback)
								});
					})
		},
		"getPrinterInfo" : function(printer, callback) {
			_call(function() {
						send_message(0, null, {
									method : "getPrinterInfo",
									params : [printer],
									event : registerCallback(callback)
								});
					})
		},
		"showHTMLDialog" : function(url, width, height, resizable) {
			_call(function() {
						var options = [];
						if (width)
							options.push("dialogWidth:" + width);
						if (height)
							options.push("dialogHeight:" + height);
						if (!resizable) // 默认可以大小
							options.push("resizable:yes");
						send_message(1, null, {
									method : "showHTMLDialog",
									params : [0, url, options.join(";")]
								});
					})
		},
		"getPrinterStatus" : function(printer, as_number, callback) {
			_call(function() {
						send_message(0, null, {
									method : "getPrinterStatus",
									params : [printer, as_number],
									event : registerCallback(callback)
								});
					})
		},
		"nothing" : function() {
		},
		"setPrintBackground" : function(back, callback) {
			_call(function() {
						send_message(0, null, {
									method : "setPrintBackground",
									params : [back],
									event : registerCallback(callback)
								});
					})
		},
		"getMessage" : function(callback) {
			_call(function() {
						callbacks["fixed-message"] = function(result) {
							result = eval("(" + result + ")");
							callback(result);
						};
						send_message(3, null, {
									method : "getMessage"
								});
					});
		},
		"postMessage" : function(tab, data) {
			_call(function() {
						data = JSON.stringify({
									"event" : "fixed-message",
									"data" : data
								});
						send_message(3, null, {
									method : "postMessage",
									params : [tab, data]
								});
					});
		},
		"findJCPs" : function(callback, seconds) {
			_call(function() {
						ajax(urls[3], {
									method : "findJCPs",
									seconds : seconds || 5
								}, callback, true);
					});
		},
		"connect" : function(server, jcpid, callback) {
			_call(function() {
						ajax(urls[4], {
									method : "connect",
									server : server,
									jcp : jcpid
								}, callback, true);
					});
		}
	})).initialize();
};
var _jcps = {};
function getJCP(ip, forward, password) {
	ip = ip || "127.0.0.1";
	var id = ip + (forward || "");
	if (!_jcps[id]) {
		_jcps[id] = new Jcp(ip, forward || "", password || "");
	}
	return _jcps[id];
}
function jpExit() {
	getJP().exit()
}
var JSON = JSON || {};
var JSONstringify = JSON.stringify || (function() {
	"use strict";
	var rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
	function f(n) {
		// Format integers to have at least two digits.
		return n < 10 ? "0" + n : n;
	}
	function this_value() {
		return this.valueOf();
	}
	if (typeof Date.prototype.toJSON !== "function") {
		Date.prototype.toJSON = function() {
			return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":"
					+ f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null;
		};
		Boolean.prototype.toJSON = this_value;
		Number.prototype.toJSON = this_value;
		String.prototype.toJSON = this_value;
	}
	var gap;
	var indent;
	var meta;
	var rep;
	function quote(string) {
		// If the string contains no control characters, no quote characters, and no
		// backslash characters, then we can safely slap some quotes around it.
		// Otherwise we must also replace the offending characters with safe escape
		// sequences.
		rx_escapable.lastIndex = 0;
		return rx_escapable.test(string) ? "\"" + string.replace(rx_escapable, function(a) {
					var c = meta[a];
					return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
				}) + "\"" : "\"" + string + "\"";
	}
	function str(key, holder) {
		// Produce a string from holder[key].
		var i; // The loop counter.
		var k; // The member key.
		var v; // The member value.
		var length;
		var mind = gap;
		var partial;
		var value = holder[key];
		// If the value has a toJSON method, call it to obtain a replacement value.
		if (value && typeof value === "object" && typeof value.toJSON === "function") {
			value = value.toJSON(key);
		}
		// If we were called with a replacer function, then call the replacer to
		// obtain a replacement value.
		if (typeof rep === "function") {
			value = rep.call(holder, key, value);
		}
		// What happens next depends on the value's type.
		switch (typeof value) {
			case "string" :
				return quote(value);
			case "number" :
				// JSON numbers must be finite. Encode non-finite numbers as null.
				return isFinite(value) ? String(value) : "null";
			case "boolean" :
			case "null" :
				// If the value is a boolean or null, convert it to a string. Note:
				// typeof null does not produce "null". The case is included here in
				// the remote chance that this gets fixed someday.
				return String(value);
				// If the type is "object", we might be dealing with an object or an array or
				// null.
			case "object" :
				// Due to a specification blunder in ECMAScript, typeof null is "object",
				// so watch out for that case.
				if (!value) {
					return "null";
				}
				// Make an array to hold the partial results of stringifying this object value.
				gap += indent;
				partial = [];
				// Is the value an array?
				if (Object.prototype.toString.apply(value) === "[object Array]") {
					// The value is an array. Stringify every element. Use null as a placeholder
					// for non-JSON values.
					length = value.length;
					for (i = 0; i < length; i += 1) {
						partial[i] = str(i, value) || "null";
					}
					// Join all of the elements together, separated with commas, and wrap them in
					// brackets.
					v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
					gap = mind;
					return v;
				}
				// If the replacer is an array, use it to select the members to be stringified.
				if (rep && typeof rep === "object") {
					length = rep.length;
					for (i = 0; i < length; i += 1) {
						if (typeof rep[i] === "string") {
							k = rep[i];
							v = str(k, value);
							if (v) {
								partial.push(quote(k) + (gap ? ": " : ":") + v);
							}
						}
					}
				} else {
					// Otherwise, iterate through all of the keys in the object.
					for (k in value) {
						if (Object.prototype.hasOwnProperty.call(value, k)) {
							v = str(k, value);
							if (v) {
								partial.push(quote(k) + (gap ? ": " : ":") + v);
							}
						}
					}
				}
				// Join all of the member texts together, separated with commas,
				// and wrap them in braces.
				v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
				gap = mind;
				return v;
		}
	}
	// If the JSON object does not yet have a stringify method, give it one.
	if (typeof JSON.stringify !== "function") {
		meta = { // table of character substitutions
			"\b" : "\\b",
			"\t" : "\\t",
			"\n" : "\\n",
			"\f" : "\\f",
			"\r" : "\\r",
			"\"" : "\\\"",
			"\\" : "\\\\"
		};
		JSON.stringify = function(value, replacer, space) {
			// The stringify method takes a value and an optional replacer, and an optional
			// space parameter, and returns a JSON text. The replacer can be a function
			// that can replace values, or an array of strings that will select the keys.
			// A default replacer method can be provided. Use of the space parameter can
			// produce text that is more easily readable.
			var i;
			gap = "";
			indent = "";
			// If the space parameter is a number, make an indent string containing that
			// many spaces.
			if (typeof space === "number") {
				for (i = 0; i < space; i += 1) {
					indent += " ";
				}
				// If the space parameter is a string, it will be used as the indent string.
			} else if (typeof space === "string") {
				indent = space;
			}
			// If there is a replacer, it must be a function or an array.
			// Otherwise, throw an error.
			rep = replacer;
			if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
				throw new Error("JSON.stringify");
			}
			// Make a fake root object containing our value under the key of "".
			// Return the result of stringifying the value.
			return str("", {
						"" : value
					});
		};
	}
	return JSON.stringify;
}());
var LOADING = null;
function showLoading(by) {
	if (!LOADING) {
		LOADING = document.createElement("img");
		LOADING.src = "http://print.jatools.com/jcp/0.99/image/loading1.gif";
		LOADING.style.verticalAlign = "middle";
	}
	LOADING.style.display = "inline";
	var sitby = document.getElementById(by);
	sitby.parentNode.insertBefore(LOADING, sitby.nextSibling);
}
function hideLoading() {
	if (LOADING) {
		LOADING.style.display = "none";
	}
}
if ((document.referrer || "").indexOf("print.jatools.com") > -1) {
	(function() {
		var hm = document.createElement("script");
		hm.src = "https://hm.baidu.com/hm.js?d741f9d5528ec69713548d20a69531cf";
		var s = document.getElementsByTagName("script")[0];
		s.parentNode.insertBefore(hm, s);
	})();
}
