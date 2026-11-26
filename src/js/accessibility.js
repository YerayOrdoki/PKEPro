(function () {
  var KEY = 'gralAukerak';
  var MODUAK = ['lehenetsia', 'protan', 'deutan', 'tritan'];
  var FILTROAK = {
    deutan: '0.79507 0.20492 0 0 0  0 1 0 0 0  -0.20492 0.20492 1 0 0  0 0 0 1 0'
  };
  var o = JSON.parse(localStorage.getItem(KEY) || '{}');
  if (typeof o.t !== 'number') o.t = 100;
  o.k = !!o.k;
  o.i = !!o.i;
  if (MODUAK.indexOf(o.c) === -1) o.c = 'lehenetsia';
  var kBtn;
  var iBox;

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
    h.classList.toggle('irudi-zuzenketa', o.i && !!FILTROAK[o.c]);
    if (kBtn) kBtn.setAttribute('aria-pressed', o.k);
    if (iBox) {
      iBox.checked = o.i;
      iBox.disabled = !FILTROAK[o.c];
    }
    localStorage.setItem(KEY, JSON.stringify(o));
  }

  aplikatu();

  document.addEventListener('DOMContentLoaded', function () {
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0;overflow:hidden"><defs>';
    Object.keys(FILTROAK).forEach(function (m) {
      svg += '<filter id="daltonize-' + m + '" color-interpolation-filters="linearRGB"><feColorMatrix type="matrix" values="' + FILTROAK[m] + '"/></filter>';
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
      '<div class="form-check form-switch ms-2 mb-0">' +
      '<input class="form-check-input" type="checkbox" role="switch" id="irudiZuzenketa" aria-describedby="irudiOharra">' +
      '<label class="form-check-label small fw-semibold" for="irudiZuzenketa">Irudiak zuzendu</label>' +
      '</div>' +
      '<span id="irudiOharra" class="visually-hidden">Une honetan deuteranopiarako bakarrik eskuragarri.</span>' +
      '</div>';
    document.body.insertBefore(barra, document.body.firstChild);
    kBtn = barra.querySelector('[data-a="kontrastea"]');
    iBox = barra.querySelector('#irudiZuzenketa');
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
    iBox.addEventListener('change', function () {
      o.i = iBox.checked;
      aplikatu();
    });
    aplikatu();
  });
})();
