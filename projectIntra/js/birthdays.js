// Birthdays.js - Funcionalidades específicas dos aniversariantes
document.addEventListener('DOMContentLoaded', function() {
    initializeBirthdays();
});

// Dados dos aniversariantes - Será carregado dinamicamente
const birthdays = [
    // Os dados dos aniversariantes serão carregados de uma fonte externa
    // ou inseridos manualmente pela administração
];

function initializeBirthdays() {
    loadBirthdays();
}

function loadBirthdays() {
    const container = document.getElementById('birthdayList');
    if (!container) return;
    
    // Se não há dados, mostrar mensagem
    if (birthdays.length === 0) {
        container.innerHTML = `
            <div class="text-center text-muted py-4">
                <i class="fas fa-birthday-cake fs-4 mb-2 d-block"></i>
                <p class="mb-0">Lista de aniversariantes será carregada pela administração</p>
            </div>
        `;
        return;
    }
    
    const today = new Date().toISOString().split('T')[0];
    
    // Ordenar por data
    const sortedBirthdays = [...birthdays].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    container.innerHTML = sortedBirthdays.map(birthday => {
        const isToday = birthday.date === today;
        const avatarClass = `avatar-${birthday.avatar}`;
        const avatarIcon = getAvatarIcon(birthday.avatar, birthday.gender);
        
        return `
            <div class="birthday-item ${isToday ? 'today' : ''}" data-date="${birthday.date}" data-name="${birthday.name}" data-department="${birthday.department}">
                <div class="birthday-avatar ${avatarClass}">
                    <i class="${avatarIcon}"></i>
                </div>
                <div class="flex-grow-1">
                    <h6 class="mb-1">${birthday.name}</h6>
                    <p class="mb-1 text-muted">
                        <i class="fas fa-calendar-day me-1"></i>
                        ${formatDate(birthday.date)}
                    </p>
                    <small class="text-muted">
                        <i class="fas fa-building me-1"></i>
                        ${birthday.department}
                    </small>
                </div>
                ${isToday ? '<span class="badge bg-warning">Hoje!</span>' : ''}
            </div>
        `;
    }).join('');
}

function getAvatarIcon(avatar, gender) {
    const icons = {
        producao: gender === 'female' ? 'fas fa-hard-hat' : 'fas fa-hard-hat',
        escritorio: gender === 'female' ? 'fas fa-user-tie' : 'fas fa-user-tie',
        ti: gender === 'female' ? 'fas fa-laptop-code' : 'fas fa-laptop-code',
        qualidade: gender === 'female' ? 'fas fa-clipboard-check' : 'fas fa-clipboard-check',
        vendas: gender === 'female' ? 'fas fa-chart-line' : 'fas fa-chart-line'
    };
    return icons[avatar] || 'fas fa-user';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: 'long' 
    });
}

function sortBirthdays(sortBy) {
    const container = document.getElementById('birthdayList');
    if (!container) return;
    
    const items = Array.from(container.children);
    
    items.sort((a, b) => {
        switch(sortBy) {
            case 'date':
                return new Date(a.dataset.date) - new Date(b.dataset.date);
            case 'name':
                return a.dataset.name.localeCompare(b.dataset.name);
            case 'department':
                return a.dataset.department.localeCompare(b.dataset.department);
            default:
                return 0;
        }
    });
    
    // Limpar container e adicionar itens ordenados
    container.innerHTML = '';
    items.forEach(item => container.appendChild(item));
    
    // Mostrar feedback visual
    showNotification(`Lista ordenada por ${sortBy === 'date' ? 'data' : sortBy === 'name' ? 'nome' : 'departamento'}`, 'success');
}
