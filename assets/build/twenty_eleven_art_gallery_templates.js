this["artgallery"] = this["artgallery"] || {};

this["artgallery"]["assets/js/templates/gallery_featured_image.tmpl"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape, __j = Array.prototype.join;function print() { __p += __j.call(arguments, '') }with (obj) {__p += '<a class="artwork-image" href="' +((__t = ( url )) == null ? '' : __t) +'" title="' +((__t = ( permalink )) == null ? '' : __t) +'" rel="bookmark">\n\t' +((__t = ( image )) == null ? '' : __t) +'\n</a>\n<div class="artwork-information">\n\t<h3>\n\t\t<a href="' +((__t = ( url )) == null ? '' : __t) +'" title="' +((__t = ( permalink )) == null ? '' : __t) +'" rel="bookmark">\n\t\t\t' +((__t = ( title )) == null ? '' : __t) +'\n\t\t</a>\n\t</h3>\n\t'; if ( content ) { ;__p +=((__t = ( content )) == null ? '' : __t); } ;__p += '\n\t<div class="entry-meta">\n\t\t<p>' +((__t = ( artist )) == null ? '' : __t) +'</p>\n\t\t'; if ( dimensions ) { ;__p += '<p>' +((__t = ( dimensions )) == null ? '' : __t) +'</p>'; } ;__p += '\n\t\t'; if ( media ) {      ;__p += '<p>' +((__t = ( media      )) == null ? '' : __t) +'</p>'; } ;__p += '\n\t</div>\n</div>\n';}return __p};