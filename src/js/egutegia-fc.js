document.addEventListener('DOMContentLoaded', function () {
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
    events: gertaerak,
    height: 'auto'
  }).render();
});
