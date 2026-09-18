document.addEventListener('DOMContentLoaded', function () {
  var thumbs = document.querySelectorAll('.news-photos img');
  if (!thumbs.length) return;

  var overlay = null;

  function closeLightbox() {
    if (overlay) {
      overlay.remove();
      overlay = null;
      document.removeEventListener('keydown', onKeydown);
    }
  }

  function onKeydown(e) {
    if (e.key === 'Escape') closeLightbox();
  }

  function openLightbox(src, alt) {
    overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';

    var closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      closeLightbox();
    });

    var img = document.createElement('img');
    img.src = src;
    img.alt = alt || '';

    overlay.appendChild(closeBtn);
    overlay.appendChild(img);
    overlay.addEventListener('click', closeLightbox);
    document.body.appendChild(overlay);
    document.addEventListener('keydown', onKeydown);
  }

  thumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      openLightbox(thumb.src, thumb.alt);
    });
  });
});
