/**
 * Created by Lanxi on 2020/3/6.
 */
(function () {
    var runtime_tmp = {};
    var that = this;


    var u = navigator.userAgent;

    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;

    var isiOS =  !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);


    var native = {
        openWindow: function (url) {
            wx.miniProgram.navigateTo({url: "index?url=" + encodeURIComponent(url)});
        },
        closeThisWindow: function () {
            wx.miniProgram.navigateBack({delta: 1})
        },
        evalInWindow: function (pre_page_index, fun_name, params) {
            var data = {callback: fun_name, args: params, pre_page_index: pre_page_index};
            if (isiOS) {

                data.pre_url = encodeURIComponent(window.location.href);
            }
            wx.miniProgram.postMessage({data: data});
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
            wx.miniProgram.navigateTo({url: "/pages/login/login?" + query});
        }
    };


    if (("onhashchange" in window) && ((typeof document.documentMode === "undefined") || document.documentMode == 8)) {
        window.onhashchange = function () {
            var eval_string = window.location.href.substr(window.location.href.indexOf("#") + 1).split("_epii_")[0];

            if (eval_string.indexOf("if(") === 0) {
                var myreg = /\((.*?)\)/gi;
                var res = eval_string.match(myreg);
                var fun_name = decodeURIComponent(res[0].substr(1, res[0].length - 2));

                var fun_args = decodeURIComponent(res[1].substr(1, res[1].length - 2));


                if (window[fun_name + ""])
                    window[fun_name + ""](fun_args ? JSON.parse(fun_args) : "");
                else {
                    alert("没有接收函数")
                }
                window.history.go(-1)
            }

        };
    }


    this.native_xcx = function () {
        return native;
    };
    this._xcx_runtime_tmp = runtime_tmp;

}).call(this || (typeof window !== 'undefined' ? window : global));