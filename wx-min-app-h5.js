(function (root, factory, library) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var wx = require('weixin-js-sdk')
        module.exports = factory(wx);
    } else if (typeof define === 'function' && define.amd) {
        define(['wx'], factory)
    } else if (typeof define === 'function' && define.cmd) {
        define(function (require, exports, module) {
            var wx = require('weixin-js-sdk')
            module.exports = factory(wx)
        })
    } else {
        root[library] = factory(root.wx);
    }
}(this, function (wx) {

    var that = window;

    var u = navigator.userAgent;
    var isiOS = true; //!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

    var funcRef = function () {


        var eval_string = decodeURIComponent(window.location.href.substr(window.location.href.indexOf("#") + 1));

        if (eval_string.indexOf("_epii_s_=") >= 0) {
            eval_string = eval_string.split("_epii_s_=");

            if (eval_string.length != 2) {
                return;
            }
        }


        eval_string = eval_string[1].split("_epii_")[0];


        if (eval_string.indexOf("if(") === 0) {
            var myreg = /\((.*?)\)/gi;
            var res = eval_string.match(myreg);
            var fun_name = decodeURIComponent(res[0].substr(1, res[0].length - 2));

            var fun_args = decodeURIComponent(res[1].substr(1, res[1].length - 2));

            if (window[fun_name + ""])
                window[fun_name + ""](fun_args ? JSON.parse(fun_args) : "");
            else {
                //alert("没有接收函数")
            }
            window.history.go(-1)
        }

    };

    function GetAbsUrlPath(url) {
        if (url.indexOf("http") === 0) {
            return url;
        }
        if (url.indexOf("/") === 0) {
            return document.location.origin + url;
        }
        var path = document.location.href.toString();
        if (path.indexOf("/") != -1) {
            path = path.substring(0, path.lastIndexOf("/"));
        }

        return path + "/" + url;
    }

    function wxgoto(fun, page) {
        if (page.indexOf("?") > 0) {
            page = page + "&pre_url=" + encodeURIComponent(window.location.href);
        } else {
            page = page + "?pre_url=" + encodeURIComponent(window.location.href);
        }
        wx.miniProgram[fun]({
            url: page
        });
    }
    var native = {
        navigateTo: function (page) {
            wxgoto("navigateTo", page)
        },
        redirectTo: function (page) {
            wxgoto("redirectTo", page)
        },
        openWindow: function (url) {
            wx.miniProgram.navigateTo({
                url: "index?url=" + encodeURIComponent(GetAbsUrlPath(url))
            });
        },
        closeAndCallBack: function (params, fun_name, pre_page_index) {
            if (!fun_name) fun_name = "onShow";
            if (!pre_page_index) pre_page_index = 1;
            native.evalInWindow(pre_page_index, fun_name, params);
            native.closeThisWindow();
        },
        closeThisWindow: function () {
            wx.miniProgram.navigateBack({
                delta: 1
            })
        },
        evalInWindow: function (pre_page_index, fun_name, params) {
            var data = {
                callback: fun_name,
                args: params,
                pre_page_index: pre_page_index
            };
            wx.miniProgram.postMessage({
                data: data
            });
        },
        getPhoneNumber: function (page_title, page_logo, session_api, decrypt_api, callback) {

            that._xcx_phone_back = function (data) {
                callback(data);

            };

            var config = {
                session_api: session_api,
                decrypt_api: decrypt_api,
                callback: "_xcx_phone_back",
                title: page_title,
                logo: page_logo ? page_logo : ""
            };
            if (isiOS) {

                config.pre_url = window.location.href;
            }
            var query = "";
            for (var index in config) {
                query += "&" + index + "=" + encodeURIComponent(config[index]);
            }
            wx.miniProgram.navigateTo({
                url: "/pages/login/login?" + query
            });

        }
    };
    if (isiOS)
        if (("onhashchange" in window) && ((typeof document.documentMode === "undefined") || document.documentMode == 8)) {
            window.addEventListener("hashchange", funcRef, false);
        }

    return native;
}, "wxMinAppH5"))