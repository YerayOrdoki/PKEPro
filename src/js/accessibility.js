(function () {
  var MODUAK = ['lehenetsia', 'protan', 'deutan', 'tritan'];
  var GAKOA = 'pke-irisgarritasuna';
  var FILTROAK = {
    protan: '1.0000 0.0000 0.0000 0.0000 0.0000  0.4789 0.4769 0.0442 0.0000 0.0000  0.5973 -0.6887 1.0914 0.0000 0.0000  0 0 0 1 0',
    deutan: '1.0000 0.0000 0.0000 0.0000 0.0000  0.1628 0.7250 0.1122 0.0000 0.0000  0.4547 -0.6454 1.1907 0.0000 0.0000  0 0 0 1 0',
    tritan: '0.7412 -0.4072 0.6660 0.0000 0.0000  0.0751 0.5852 0.3397 0.0000 0.0000  0.0000 0.0000 1.0000 0.0000 0.0000  0 0 0 1 0'
  };
  var o = { t: 100, k: false, c: 'lehenetsia' };
  var kBtn;

  function kargatu() {
    try {
      var g = JSON.parse(localStorage.getItem(GAKOA));
      if (g && typeof g === 'object') {
        if (typeof g.t === 'number' && g.t >= 80 && g.t <= 150) o.t = g.t;
        if (typeof g.k === 'boolean') o.k = g.k;
        if (MODUAK.indexOf(g.c) !== -1) o.c = g.c;
      }
    } catch (e) {}
  }

  function gorde() {
    try {
      localStorage.setItem(GAKOA, JSON.stringify(o));
    } catch (e) {}
  }

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
  }

  kargatu();
  aplikatu();

  document.addEventListener('DOMContentLoaded', function () {
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0;overflow:hidden"><defs>';
    Object.keys(FILTROAK).forEach(function (m) {
      svg += '<filter id="daltonize-' + m + '" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="' + FILTROAK[m] + '"/></filter>';
    });
    svg += '</defs></svg>';
    document.body.insertAdjacentHTML('afterbegin', svg);

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
      if (!a) return;
      if (a === 'txikitu') o.t = Math.max(80, o.t - 10);
      if (a === 'handitu') o.t = Math.min(150, o.t + 10);
      if (a === 'kontrastea') o.k = !o.k;
      aplikatu();
      gorde();
    });
    sel.addEventListener('change', function () {
      o.c = sel.value;
      aplikatu();
      gorde();
    });
    aplikatu();
  });
})();
