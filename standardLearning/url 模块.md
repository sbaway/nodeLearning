## URL 模块 ##

引入方式： `require('url')`

- URI: 统一资源标识符
- URL: 统一资源定位符

### URL包含的方法 ###

- url.parse(urlStr[, parseQueryString][, slashesDenoteHost])
- url.format(urlObj)
- url.resolve(from, to)

`parse` : 将url字符串解析为url对象

`format`： 将url对象序列化为url字符串

`resolve` : 将url的两部分拼起来

### URL对象 ###

**例如url： http://user:pass@host.com:8080/p/a/t?query=String#hash/**

- protocol(协议)： `'http:'`
- slashes(双斜线)： `'//'`
- auth(url中身份验证信息)： `'user:pass'`
- host(主机)： `'host.com:8080'`
- hostname(主机名)： `'host.com'`
- post(端口号)： `'8080'`
- hash(锚点)： `'#hash'`
- search(查询字符串)： `'?query=String'`
- query(查询)： 若 `parseQueryString` 为 *false* ---- `'query=String'`，若 `parseQueryString` 为 *true* ---- `'{'query': 'String'}'`
- pathname(请求路径)： `'/p/a/t'`
- path(请求路径，包括查询字符串)： `'/p/a/t?query=Sring'`
- href(原始url)： `'http://user:pass@host.com:8080/p/a/t?query=String#hash/'`



 


