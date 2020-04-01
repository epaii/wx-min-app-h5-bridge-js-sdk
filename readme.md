#  wxMinAppH5 介绍文档
此项目是基于通用版微信webview小程序，通过小程序webview组件快速构建小程序App

## 引入

1.下载 [**wx-min-app-h5.js**][epiijslink],并在网页中引用

```html
<script src="path/to/wx-min-app-h5.js"></script>
<script>
    wxMinAppH5.openWindow("page2.html")
</script>
```
> 如果在nodejs环境中使用，可以通过npm包管理安装

```
npm install wx-min-app-h5
```
 

## 支持的方法

| 方法             | 作用                             |
| :--------------- | :------------------------------- |
| openWindow       | 打开新页面                       |
| closeThisWindow  | 关闭当前页面                     |
| evalInWindow     | 在其它窗口页面中执行函数         |
| closeAndCallBack | 关闭当前页面并在上个页面执行方法 |
| getPhoneNumber   | 获取微信授权手机号               |
| navigateTo       | 打开其它小程序页面               |
| redirectTo       |                                  |
| wx               | wx的其它方法                     |


原型
```
        openWindow: function (url) {
          
        },
        closeAndCallBack: function (params, fun_name, pre_page_index) {
          
        },
        closeThisWindow: function () {
          
        },
        evalInWindow: function (pre_page_index, fun_name, params) {
        },
        getPhoneNumber: function (page_title, page_logo, session_api, decrypt_api, callback) {

        }
```


[epiijslink]:https://gitee.com/epii/wx-min-app-h5-bridge-js-sdk/raw/master/wx-min-app-h5.js