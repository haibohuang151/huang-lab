document.addEventListener('DOMContentLoaded', function () {
  var container = document.getElementById('home-news-list');
  if (!container) return;

  fetch('news.html')
    .then(function (res) {
      if (!res.ok) throw new Error('fetch failed');
      return res.text();
    })
    .then(function (html) {
      var doc = new DOMParser().parseFromString(html, 'text/html');
      var items = doc.querySelectorAll('.news-item');
      var latest = Array.prototype.slice.call(items, 0, 5);
      if (!latest.length) return;

      var ul = document.createElement('ul');
      latest.forEach(function (item) {
        var dateEl = item.querySelector('.news-date');
        var textEl = item.querySelector('.news-text p');
        if (!dateEl || !textEl) return;

        var li = document.createElement('li');
        var dateSpan = document.createElement('strong');
        dateSpan.className = 'home-news-date';
        dateSpan.textContent = dateEl.textContent.trim() + ': ';
        li.appendChild(dateSpan);
        li.appendChild(document.createTextNode(textEl.textContent.trim()));
        ul.appendChild(li);
      });

      container.innerHTML = '';
      container.appendChild(ul);
    })
    .catch(function () {
      // Leave the fallback link in place if the fetch fails (e.g. opened via file://).
    });
});
