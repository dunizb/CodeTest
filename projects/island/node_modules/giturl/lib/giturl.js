/**!
 * giturl - lib/giturl.js
 *
 * Copyright(c) 2014
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 */

"use strict";

/**
 * Module dependencies.
 */

// host[:/]n1/n2
var RE = /^([^:\/]+)[:\/](.+)$/i;

var HTTPS_HOSTS = {
  'github.com': 1,
  'gitcafe.com': 1,
  'gist.github.com': 1,
};

exports.parse = function parse(sourceURL) {
  if (!sourceURL || typeof sourceURL !== 'string') {
    return '';
  }

  var url = sourceURL;
  if (url.indexOf('@') >= 0) {
    url = url.replace(/^[^@]+@/, '');    // `git@`` || `https://jpillora@` => ""
  }
  url = url.replace(/^[\w+]+:\/\//, '')    // `git://` || `git+https://` => ""
    .replace(/\.git$/, '');             // .git => ""
  var item = RE.exec(url);
  if (!item) {
    return sourceURL;
  }

  var host = item[1];
  var protocol = HTTPS_HOSTS[host] ? 'https' : 'http';

  // p1/p2/.../pn[.xxx]
  var isContainGit = /\.git$/.test(sourceURL);
  var url = isContainGit ? item[2] : item[2].split('/', 2).join('/');
  return protocol + '://' + host + '/' + url;
};
