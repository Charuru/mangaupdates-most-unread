// ==UserScript==
// @name         Mangaupdates Most Unread
// @version      0.0.3
// @description  A userscript to sort the mangaupdates mylist page to show the manga with highest number of unread chapters first.
// @author       Charuru
// @homepage     https://github.com/Charuru/mangaupdates-most-unread
// @updateURL    https://raw.githubusercontent.com/Charuru/mangaupdates-most-unread/master/userscript.js
// @downloadURL  https://raw.githubusercontent.com/Charuru/mangaupdates-most-unread/master/userscript.js
// @match        https://www.mangaupdates.com/mylist.html
// @match        https://mangaupdates.com/mylist.html
// @icon         https://mangaupdates.com/favicon.ico
// @require      https://code.jquery.com/jquery-2.2.4.min.js
// @grant        GM_xmlhttpRequest
// @grant        GM.setValue
// @grant        GM.getValue
// ==/UserScript==

(function() {
  
  
  function sortUL(selector) {
    $(selector).children(".lrow").sort(function(a, b) {
      var diff = function (which) {
        var readUpTo = $(which).find('.newlist').text().replace(/[^\d]/g, "")

        if (!readUpTo)
          return 0


        var scanUpTo = $(which).find('a[title="Increment Chapter"]').text().replace(/[^\d]/g, "");

        console.log(scanUpTo)
        console.log(readUpTo)

        return parseInt(scanUpTo, 10) - parseInt(readUpTo, 10)
      }


      var upA = diff(a)
      var upB = diff(b)


      return (upA < upB) ? -1 : (upA > upB) ? 1 : 0;
    }).prependTo(selector);
  }
  
  $(function() {
    const btn = $('<span class="button">Click to sort by unreads</span>')
    
    $("#list_table").prepend(btn)
    btn.click(function () {
      sortUL("#list_table");
    })
  });


  

})();
