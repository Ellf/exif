window.onload = function () {

  'use strict';

  var Exif = window.Exif;
  var URL = window.URL || window.webkitURL;
  var checkbox = document.getElementsByClassName('docs-checkbox')[0];
  var preview = document.getElementsByClassName('docs-preview')[0];
  var dropzone = document.getElementsByClassName('docs-dropzone')[0];
  var showcase = document.getElementsByClassName('docs-showcase')[0];
  var fileInput = dropzone.getElementsByTagName('input')[0];
  var options = {
        done: function (tags) {
          var segments = [];
          var tag;

          for (tag in tags) {
            if (tags.hasOwnProperty(tag)) {
              segments.push('<strong>' + tag + '</strong>: ' + tags[tag]);
            }
          }

          showcase.innerHTML = '<p>' + segments.join('</p><p>') + '</p>';
        },
        fail: function (message) {
          showcase.innerHTML = '<p>' + message + '</p>';
        }
      };

  function readExif() {
    return new Exif(preview.getElementsByTagName('img')[0], options);
  }

  function readExifFromFile(file) {
    var image;

    if (file.type === 'image/jpeg') {
      if (URL) {
        image = new Image();

        image.onload = function () {
          this.onload = null;
          URL.revokeObjectURL(file);
        };

        image.src = URL.createObjectURL(file);

        // Clear existing image
        preview.innerHTML = '';

        preview.appendChild(image);
      }

      // Clear chosen file
      fileInput.value = '';

      // Clear previous Exif tags
      showcase.innerHTML = '';

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
