(function () {
  var KEY = 'gralAukerak';
  var o = JSON.parse(localStorage.getItem(KEY) || '{"t":100,"k":false}');
  var kBtn;

  function aplikatu() {
    document.documentElement.style.fontSize = o.t + '%';
    document.documentElement.classList.toggle('kontraste-altua', o.k);
    if (kBtn) kBtn.setAttribute('aria-pressed', o.k);
    localStorage.setItem(KEY, JSON.stringify(o));
  }

  aplikatu();

  document.addEventListener('DOMContentLoaded', function () {
    var barra = document.createElement('div');
    barra.className = 'bg-secondary-subtle border-bottom';
    barra.innerHTML =
      '<div class="container py-2 d-flex flex-wrap align-items-center gap-2">' +
      '<span class="small fw-semibold me-2">Irisgarritasuna:</span>' +
      '<button type="button" class="btn btn-sm btn-outline-dark" data-a="txikitu" aria-label="Letra txikitu">A-</button>' +
      '<button type="button" class="btn btn-sm btn-outline-dark" data-a="handitu" aria-label="Letra handitu">A+</button>' +
      '<button type="button" class="btn btn-sm btn-outline-dark" data-a="kontrastea" aria-pressed="false">Kontraste altua</button>' +
      '</div>';
    document.body.insertBefore(barra, document.body.firstChild);
    kBtn = barra.querySelector('[data-a="kontrastea"]');

    barra.addEventListener('click', function (e) {
      var a = e.target.getAttribute('data-a');
      if (a === 'txikitu') o.t = Math.max(80, o.t - 10);
      if (a === 'handitu') o.t = Math.min(150, o.t + 10);
      if (a === 'kontrastea') o.k = !o.k;
      aplikatu();
    });
    aplikatu();
  });
})();
