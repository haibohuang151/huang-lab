document.addEventListener('DOMContentLoaded', function () {
  var container = document.getElementById('home-news-list');
  if (!container) return;

  fetch('news.html', { cache: 'no-cache' })
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
        var body = document.createElement('div');
        body.className = 'home-news-body';
        var dateSpan = document.createElement('strong');
        dateSpan.className = 'home-news-date';
        dateSpan.textContent = dateEl.textContent.trim() + ': ';
        body.appendChild(dateSpan);
        body.appendChild(document.createTextNode(textEl.textContent.trim()));
        li.appendChild(body);

        var photo = item.querySelector('.news-photos img');
        if (photo && photo.getAttribute('src')) {
          var thumb = document.createElement('a');
          thumb.className = 'home-news-thumb';
          if (photo.closest('.news-ga')) thumb.className += ' is-graphic';
          thumb.href = 'news.html';
          var img = document.createElement('img');
          img.src = photo.getAttribute('src');
          img.alt = photo.getAttribute('alt') || '';
          img.loading = 'lazy';
          thumb.appendChild(img);
          li.appendChild(thumb);
        }
        ul.appendChild(li);
      });

      container.innerHTML = '';
      container.appendChild(ul);
    })
    .catch(function () {
      // Leave the fallback link in place if the fetch fails (e.g. opened via file://).
    });
});
