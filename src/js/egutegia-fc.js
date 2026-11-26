document.addEventListener('DOMContentLoaded', function () {
  var HILABETEAK = ['urtarrila','otsaila','martxoa','apirila','maiatza','ekaina','uztaila','abuztua','iraila','urria','azaroa','abendua'];
  var EGUN_LABURRAK = ['ig.','al.','ar.','az.','og.','ol.','lr.'];
  var MOTA_IZENAK = { E: 'Epea', D: 'Defentsa', K: 'Kalifikazioa' };
  var panela = document.getElementById('fcXehetasuna');

  var dataTestua = function (s) {
    var p = s.split('-');
    return p[0] + 'ko ' + HILABETEAK[parseInt(p[1], 10) - 1] + 'ren ' + parseInt(p[2], 10) + 'a';
  };
  var gehi1 = function (s) {
    var d = new Date(s + 'T12:00:00');
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  };
  var gertaerak = EKITALDIAK.map(function (e) {
    return {
      title: e.m + e.t.charAt(0),
      start: e.d,
      end: e.h ? gehi1(e.h) : undefined,
      allDay: true,
      classNames: ['ev-' + e.m],
      extendedProps: {
        xehetasuna: MOTA_IZENAK[e.m] + ' \u00b7 ' + dataTestua(e.d) + (e.h ? ' \u2192 ' + dataTestua(e.h) : '') + ' \u00b7 ' + e.t
      }
    };
  });

  new FullCalendar.Calendar(document.getElementById('fcEgutegia'), {
    themeSystem: 'bootstrap5',
    locale: 'eu',
    initialView: 'dayGridMonth',
    initialDate: '2026-11-26',
    firstDay: 1,
    validRange: { start: '2026-10-01', end: '2027-11-01' },
    headerToolbar: { left: 'prev,next today', center: 'title', right: '' },
    buttonText: { today: 'Gaur' },
    buttonHints: { prev: 'Aurreko hilabetea', next: 'Hurrengo hilabetea', today: 'Gaur' },
    titleFormat: function (arg) {
      var d = arg.date.marker;
      return d.getUTCFullYear() + 'ko ' + HILABETEAK[d.getUTCMonth()];
    },
    dayHeaderContent: function (arg) {
      return EGUN_LABURRAK[arg.date.getDay()];
    },
    eventInteractive: true,
    eventDidMount: function (info) {
      var testua = info.event.extendedProps.xehetasuna;
      info.el.setAttribute('title', testua);
      info.el.setAttribute('aria-label', testua);
    },
    eventClick: function (info) {
      info.jsEvent.preventDefault();
      if (panela) { panela.textContent = info.event.extendedProps.xehetasuna; }
    },
    events: gertaerak,
    height: 'auto'
  }).render();
});
