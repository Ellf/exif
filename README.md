# [Exif](https://github.com/fengyuanchen/exif)

> JavaScript Exif reader (only available in the browser).

- [Demo](http://fengyuanchen.github.io/exif)
- [Exif standard version 2.3 (2012)](http://www.cipa.jp/std/documents/e/DC-008-2012_E.pdf)


## Install

```
npm install @fengyuanchen/exif
```

```html
<script src="/path/to/exif.js"></script>
```


## Usage

Four available usages:
  - `new Exif(HTMLImageElement, options)`
  - `new Exif(HTMLImageElement.src, options)`
  - `new Exif(File, options)`
  - `new Exif(Blob, options)`

Example:

```html
<img id="image" src="image.jpg">
```

```js
var image = document.getElementById('image');
var exif = new Exif(image, {
  done: function(tags) {
    console.log(tags);
  }
});
```



## Options

You may set cropper options with `new Exif(image, options)`.


### exif

- Type: `Boolean`
- Default: `true`

Read Exif tags.


### gps

- Type: `Boolean`
- Default: `true`

Read GPS tags.


### interoperability

- Type: `Boolean`
- Default: `true`

Read interoperability tags.


### ignored

- Type: `Array` or `Boolean`
- Default: `['MakerNote', 'UserComment']`

Assign the ignored tags. Set `false` to disable it.


### done

- Type: `Function`
- Default: `null`

Read success callback.

```js
new Exif(image, {
  done: function(tags) {
    console.log(tags);
  }
});
```


### fail

- Type: `Function`
- Default: `null`

Read error callback.

```js
new Exif(image, {
  fail: function(message) {
    console.log(message);
  }
});
```


## No conflict

If you have to use other global function with the same namespace, just call the `Exif.noConflict` static method to revert to it.

```html
<script src="other-exif.js"></script>
<script src="exif.js"></script>
<script>
  Exif.noConflict();
  // Code that uses other `Exif` can follow here.
</script>
```



## Browser support

- Chrome (latest 2)
- Firefox (latest 2)
- Internet Explorer 10+
- Opera (latest 2)
- Safari (latest 2)



## License

[MIT](http://opensource.org/licenses/MIT) © [Fengyuan Chen](http://chenfengyuan.com)
