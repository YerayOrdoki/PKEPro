document.addEventListener('DOMContentLoaded', function () {
  var HILABETEAK = ['urtarrila','otsaila','martxoa','apirila','maiatza','ekaina','uztaila','abuztua','iraila','urria','azaroa','abendua'];
  var EGUNAK = ['igandea','astelehena','asteartea','asteazkena','osteguna','ostirala','larunbata'];
  var EGUN_LABURRAK = ['ig.','al.','ar.','az.','og.','ol.','lr.'];

  var gehi1 = function (s) {
    var d = new Date(s + 'T12:00:00');
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  };
  var gertaerak = EKITALDIAK.map(function (e) {
    return {
      title: e.m + ' \u00b7 ' + e.t,
      start: e.d,
      end: e.h ? gehi1(e.h) : undefined,
      allDay: true,
      classNames: ['ev-' + e.m]
    };
  });

  new FullCalendar.Calendar(document.getElementById('fcEgutegia'), {
    locale: 'eu',
    initialView: 'dayGridMonth',
    initialDate: '2026-11-26',
    firstDay: 1,
    validRange: { start: '2026-10-01', end: '2027-11-01' },
    headerToolbar: { left: 'prev,next today', center: 'title', right: 'dayGridMonth,listMonth' },
    buttonText: { today: 'Gaur', dayGridMonth: 'Hilabetea', listMonth: 'Zerrenda', month: 'Hilabetea', list: 'Zerrenda' },
    buttonHints: { prev: 'Aurrekoa', next: 'Hurrengoa', today: 'Gaur' },
    noEventsText: 'Ez dago gertaerarik hilabete honetan',
    allDayText: 'Egun osoa',
    titleFormat: function (arg) {
      var d = arg.date.marker;
      return d.getUTCFullYear() + 'ko ' + HILABETEAK[d.getUTCMonth()];
    },
    dayHeaderContent: function (arg) {
      return EGUN_LABURRAK[arg.date.getDay()];
    },
    listDayFormat: function (arg) {
      var d = arg.date.marker;
      return EGUNAK[d.getUTCDay()];
    },
    listDaySideFormat: function (arg) {
      var d = arg.date.marker;
      return d.getUTCFullYear() + 'ko ' + HILABETEAK[d.getUTCMonth()] + 'ren ' + d.getUTCDate() + 'a';
    },
    events: gertaerak,
    height: 'auto'
  }).render();
});
