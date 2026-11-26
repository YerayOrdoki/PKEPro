(function () {
  var KEY = 'gralAukerak';
  var MODUAK = ['lehenetsia', 'protan', 'deutan', 'tritan'];
  var o = JSON.parse(localStorage.getItem(KEY) || '{}');
  if (typeof o.t !== 'number') o.t = 100;
  o.k = !!o.k;
  if (MODUAK.indexOf(o.c) === -1) o.c = 'lehenetsia';
  var kBtn;

  function aplikatu() {
    var h = document.documentElement;
    h.style.fontSize = o.t + '%';
    h.classList.toggle('kontraste-altua', o.k);
    MODUAK.forEach(function (m) { h.classList.remove('kolore-' + m); });
    h.classList.remove('kolore-laguntza');
    if (o.c !== 'lehenetsia') {
      h.classList.add('kolore-' + o.c);
      h.classList.add('kolore-laguntza');
    }
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
      '<label for="koloreIkusmena" class="small fw-semibold ms-2 mb-0">Kolore-ikusmena:</label>' +
      '<select id="koloreIkusmena" class="form-select form-select-sm w-auto">' +
      '<option value="lehenetsia">Lehenetsia</option>' +
      '<option value="protan">Protanopia</option>' +
      '<option value="deutan">Deuteranopia</option>' +
      '<option value="tritan">Tritanopia</option>' +
      '</select>' +
      '</div>';
    document.body.insertBefore(barra, document.body.firstChild);
    kBtn = barra.querySelector('[data-a="kontrastea"]');
    var sel = barra.querySelector('#koloreIkusmena');
    sel.value = o.c;

    barra.addEventListener('click', function (e) {
      var a = e.target.getAttribute('data-a');
      if (a === 'txikitu') o.t = Math.max(80, o.t - 10);
      if (a === 'handitu') o.t = Math.min(150, o.t + 10);
      if (a === 'kontrastea') o.k = !o.k;
      aplikatu();
    });
    sel.addEventListener('change', function () {
      o.c = sel.value;
      aplikatu();
    });
    aplikatu();
  });
})();
