// Calendar.js - Funcionalidades específicas do calendário
document.addEventListener('DOMContentLoaded', function() {
    initializeCalendar();
});

function initializeCalendar() {
    const calendarEl = document.getElementById('calendar');
    
    if (!calendarEl) return;
    
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'pt-br',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,listWeek'
        },
                events: [
                    // Feriados Nacionais 2025 - Dados reais
                    {
                        title: 'Confraternização Universal',
                        start: '2025-01-01',
                        color: '#DC2626',
                        classNames: ['holiday']
                    },
                    {
                        title: 'Carnaval',
                        start: '2025-03-04',
                        color: '#DC2626',
                        classNames: ['holiday']
                    },
                    {
                        title: 'Carnaval',
                        start: '2025-03-05',
                        color: '#DC2626',
                        classNames: ['holiday']
                    },
                    {
                        title: 'Paixão de Cristo',
                        start: '2025-04-18',
                        color: '#DC2626',
                        classNames: ['holiday']
                    },
                    {
                        title: 'Tiradentes',
                        start: '2025-04-21',
                        color: '#DC2626',
                        classNames: ['holiday']
                    },
                    {
                        title: 'Dia do Trabalhador',
                        start: '2025-05-01',
                        color: '#DC2626',
                        classNames: ['holiday']
                    },
                    {
                        title: 'Independência do Brasil',
                        start: '2025-09-07',
                        color: '#DC2626',
                        classNames: ['holiday']
                    },
                    {
                        title: 'Nossa Senhora Aparecida',
                        start: '2025-10-12',
                        color: '#DC2626',
                        classNames: ['holiday']
                    },
                    {
                        title: 'Finados',
                        start: '2025-11-02',
                        color: '#DC2626',
                        classNames: ['holiday']
                    },
                    {
                        title: 'Proclamação da República',
                        start: '2025-11-15',
                        color: '#DC2626',
                        classNames: ['holiday']
                    },
                    {
                        title: 'Natal',
                        start: '2025-12-25',
                        color: '#DC2626',
                        classNames: ['holiday']
                    }
                ],
        eventClick: function(info) {
            showEventDetails(info.event);
        },
        height: 'auto',
        aspectRatio: 1.8
    });
    
    calendar.render();
}

function showEventDetails(event) {
    const modal = new bootstrap.Modal(document.getElementById('eventModal'));
    document.getElementById('eventTitle').textContent = event.title;
    document.getElementById('eventDate').textContent = event.start.toLocaleDateString('pt-BR');
    document.getElementById('eventDescription').textContent = event.extendedProps.description || 'Sem descrição disponível.';
    modal.show();
}
