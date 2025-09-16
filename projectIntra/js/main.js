// Main.js - Funcionalidades principais da intranet
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Configurar navegação
    setupNavigation();
    
    // Configurar eventos
    setupEventListeners();
}

function setupNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Efeito de scroll na navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Ativar link ativo baseado na seção visível
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

function setupEventListeners() {
    // Event listener para formulário de agendamento
    const schedulingForm = document.getElementById('schedulingForm');
    if (schedulingForm) {
        schedulingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSchedulingSubmit();
        });
    }
    
}

// Sistema de agendamentos persistente
function getMeetings() {
    const meetings = localStorage.getItem('meetings');
    return meetings ? JSON.parse(meetings) : [];
}

function saveMeetings(meetings) {
    localStorage.setItem('meetings', JSON.stringify(meetings));
}

function loadMeetings() {
    const container = document.getElementById('meetingsList');
    if (!container) return;
    
    const meetings = getMeetings();
    
    if (meetings.length === 0) {
        container.innerHTML = `
            <div class="text-center text-muted py-4">
                <i class="fas fa-calendar-plus fs-4 mb-2 d-block"></i>
                <p class="mb-0">Nenhuma reunião agendada</p>
            </div>
        `;
        return;
    }
    
    // Ordenar por data
    const sortedMeetings = meetings.sort((a, b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time));
    
    container.innerHTML = sortedMeetings.map(meeting => {
        const priorityClass = `meeting-card ${meeting.priority}-priority`;
        const statusClass = `status-${meeting.priority}`;
        const meetingDate = new Date(meeting.date + ' ' + meeting.time);
        const isUpcoming = meetingDate > new Date();
        
        return `
            <div class="${priorityClass}">
                <div class="d-flex justify-content-between align-items-start">
                    <div class="flex-grow-1">
                        <h6 class="mb-2">
                            <span class="status-indicator ${statusClass}"></span>
                            ${meeting.title}
                        </h6>
                        <p class="mb-1 text-muted">
                            <i class="fas fa-calendar me-1"></i>
                            ${formatDate(meeting.date)} às ${meeting.time}
                        </p>
                        <small class="text-muted">
                            <i class="fas fa-users me-1"></i>
                            ${meeting.participants}
                        </small>
                        ${meeting.createdBy ? `
                            <small class="text-muted d-block">
                                <i class="fas fa-user me-1"></i>
                                ${meeting.createdBy}
                            </small>
                        ` : ''}
                    </div>
                    <div class="text-end">
                        <span class="badge ${getPriorityBadgeClass(meeting.priority)}">
                            ${getPriorityText(meeting.priority)}
                        </span>
                        ${isUpcoming ? `
                            <div class="mt-2">
                                <button class="btn btn-outline-danger btn-sm" onclick="cancelMeeting(${meeting.id})" title="Cancelar">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function getPriorityBadgeClass(priority) {
    const classes = {
        high: 'bg-danger',
        medium: 'bg-warning',
        low: 'bg-success'
    };
    return classes[priority] || 'bg-secondary';
}

function getPriorityText(priority) {
    const texts = {
        high: 'Alta',
        medium: 'Média',
        low: 'Baixa'
    };
    return texts[priority] || 'Normal';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

function openDocument(type) {
    // Simular abertura de documento
    showNotification(`Abrindo documento: ${type === 'termo' ? 'Termo de Responsabilidade' : 'Empréstimo Consignado'}`, 'info');
    
    // Aqui você pode implementar a lógica real de download
    setTimeout(() => {
        showNotification('Documento baixado com sucesso!', 'success');
    }, 2000);
}

function openSystem(system) {
    if (system === 'sics') {
        showNotification('Redirecionando para o SICS...', 'info');
        // window.open('https://sics.empresa.com', '_blank');
    } else if (system === 'relatorios') {
        showNotification('Acessando sistema de relatórios...', 'info');
        // window.open('https://relatorios.empresa.com', '_blank');
    }
}

function openSchedulingModal() {
    const modal = new bootstrap.Modal(document.getElementById('schedulingModal'));
    modal.show();
}

function handleSchedulingSubmit() {
    const formData = new FormData(document.getElementById('schedulingForm'));
    const meetingData = {
        id: Date.now(),
        title: formData.get('title'),
        date: formData.get('date'),
        time: formData.get('time'),
        priority: formData.get('priority'),
        participants: formData.get('participants'),
        createdBy: 'Usuário Atual', // Em produção, pegar do sistema de autenticação
        createdAt: new Date().toISOString()
    };
    
    // Salvar no localStorage
    const meetings = getMeetings();
    meetings.push(meetingData);
    saveMeetings(meetings);
    
    // Atualizar lista
    loadMeetings();
    
    // Fechar modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('schedulingModal'));
    modal.hide();
    
    // Limpar formulário
    document.getElementById('schedulingForm').reset();
    
    showNotification('Reunião agendada com sucesso!', 'success');
}

function cancelMeeting(meetingId) {
    if (confirm('Tem certeza que deseja cancelar esta reunião?')) {
        const meetings = getMeetings();
        const updatedMeetings = meetings.filter(meeting => meeting.id !== meetingId);
        saveMeetings(updatedMeetings);
        loadMeetings();
        showNotification('Reunião cancelada!', 'info');
    }
}

function showNotification(message, type = 'info') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Remover automaticamente após 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Funções utilitárias
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}



// Inicializar dados quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Carregar reuniões se o elemento existir
    if (document.getElementById('meetingsList')) {
        loadMeetings();
    }
});