biojs-io-mitab
==============

[![Build Status](https://travis-ci.org/jmvillaveces/biojs-io-mitab.svg?branch=master)](https://travis-ci.org/jmvillaveces/biojs-io-mitab)

Methods
------

```
var MITab = require('biojs-io-mitab');
```

#### `read(url)`

Parses an url an calls your `parse` method with the returned body.

```
MITab.read("https://cdn.rawgit.com/jmvillaveces/biojs-io-mitab/master/test/interactions.txt", function(err, model) {
	// model is the parsed url
});
```
If callback is undefined, `read` returns a promise.

```
var p = MITab.read("https://cdn.rawgit.com/jmvillaveces/biojs-io-mitab/master/test/interactions.txt");
// ...
p.then(function(model) {
	// model is the parsed url
}, function(err){
	console.error("err happened during downloading", err);
});
```

### `parse(str)`

```
var seqs = MITab.parse(str);
```
