window.onload = function () {

  'use strict';

  var Exif = window.Exif;
  var URL = window.URL || window.webkitURL;
  var checkbox = document.querySelector('.docs-checkbox');
  var preview = document.querySelector('.docs-preview');
  var dropzone = document.querySelector('.docs-dropzone');
  var showcase = document.querySelector('.docs-showcase');
  var fileInput = dropzone.querySelector('input[type="file"]');
  var options = {
        done: function (tags) {
          var html = [];
          var tag;

          for (tag in tags) {
            if (tags.hasOwnProperty(tag)) {
              html.push('<strong>' + tag + '</strong>: ' + tags[tag]);
            }
          }

          showcase.innerHTML = '<p>' + html.join('</p><p>') + '</p>';
        },
        fail: function (message) {
          showcase.innerHTML = '<p>' + message + '</p>';
        }
      };

  function empty(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  function readExif() {
    return new Exif(preview.querySelector('img'), options);
  }

  function readExifFromFile(file) {
    var image;

    if (file.type === 'image/jpeg') {
      if (URL) {
        image = document.createElement('img');

        image.onload = function () {
          URL.revokeObjectURL(file);
          image.onload = null;
        };

        image.src = URL.createObjectURL(file);

        // Clear existing image
        empty(preview);

        preview.appendChild(image);
      }

      // Clear chosen file
      fileInput.value = '';

      // Clear previous Exif tags
      empty(showcase);

      return new Exif(file, options);
    } else {
      window.alert('Please upload a JPEG image.');
    }
  }

  readExif();

  checkbox.onchange = function (e) {
    var target = e.target;

    options[target.name] = target.checked;
    readExif();
  };

  fileInput.onchange = function (e) {
    var files = e.target.files;

    if (files && files.length) {
      readExifFromFile(files[0]);
    }
  };

  dropzone.ondragover = function (e) {
    e.preventDefault();
  };

  dropzone.ondrop = function (e) {
    var files = e.dataTransfer.files;

    e.preventDefault();

    if (files && files.length) {
      readExifFromFile(files[0]);
    }
  };
};
