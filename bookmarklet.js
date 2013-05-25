/*
    Yelp2Gcal - Javascript Bookmarklet to create a Google Calendar event using metadata from Yelp
    Copyright (C) 2012  Pratik Tandel <first_name + last_name + 99 [at] gmail.com>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
*/

(function() {
  function getAddress() {
      var a = document.querySelector('address').querySelectorAll('span');
      var res = [];
      for (var i=0; i < a.length; i++) { 
          res.push(a[i].textContent.strip());
      }
      return res.join(", ");
  }
  function getText(selector) {
    var node = document.querySelector(selector);
    if (node) {
      return node.textContent;
    }
    return '';
  }
  var addr          = getAddress();
  var phone         = getText('span[itemprop=telephone]');
  var url           = getText('#bizUrl a');
  var name          = getText('h1[itemprop=name]').strip();
  var businessHours = getText('dd.attr-BusinessHours');

  var baseUrl = 'http://www.google.com/calendar/event?action=TEMPLATE';
  var parts = {
      'text': name,
      'location': addr,
      'sprop': '',
    };
  if (url) {
    parts['sprop'] = 'website' + ":" + url;
  }
  parts['details'] = '';
  if (phone) {
    parts['details'] = "Phone number: " + phone + "\n";
  }
  if (businessHours) {
    parts['details'] += "Business Hours \n" + businessHours + "\n";
  }
  for (var key in parts) {
    baseUrl += "&" + encodeURIComponent(key) + "=" + encodeURIComponent(parts[key]);
  }
  window.location = baseUrl;
})();
