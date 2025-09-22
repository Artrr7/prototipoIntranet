document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar');
  const listView = new FullCalendar.Calendar(calendarEl, {
    initialView: 'listWeek',
    locale: 'pt-br',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: ''
    },
    events: []
  });
  listView.render();
});