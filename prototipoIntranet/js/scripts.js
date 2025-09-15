/*!
 * Intranet Softhair - JavaScript
 * Design elegante e minimalista
 */

// Dados mockados para demonstração
const mockData = {
    aniversariantes: [
        { nome: "Ana Silva", data: "15/12", departamento: "Produção", cargo: "Operadora", genero: "F" },
        { nome: "Carlos Santos", data: "20/12", departamento: "Escritório", cargo: "Analista", genero: "M" },
        { nome: "Maria Oliveira", data: "22/12", departamento: "Qualidade", cargo: "Inspetora", genero: "F" },
        { nome: "João Costa", data: "25/12", departamento: "Comercial", cargo: "Vendedor", genero: "M" },
        { nome: "Fernanda Lima", data: "28/12", departamento: "Produção", cargo: "Supervisora", genero: "F" },
        { nome: "Pedro Alves", data: "30/12", departamento: "TI", cargo: "Desenvolvedor", genero: "M" }
    ],
    
    lancamentos: [
        { nome: "Shampoo Hidratante", descricao: "Novo shampoo com tecnologia de hidratação profunda", categoria: "Cabelo" },
        { nome: "Creme Anti-idade", descricao: "Creme facial com ácido hialurônico para redução de rugas", categoria: "Rosto" },
        { nome: "Protetor Solar FPS 60", descricao: "Proteção solar de longa duração para todo tipo de pele", categoria: "Proteção" },
        { nome: "Máscara Capilar", descricao: "Máscara nutritiva para cabelos danificados", categoria: "Cabelo" }
    ],
    
    ramais: [
        { nome: "Ana Silva", ramal: "1001", email: "ana.silva@softhair.com", departamento: "Produção", cargo: "Operadora" },
        { nome: "Carlos Santos", ramal: "1002", email: "carlos.santos@softhair.com", departamento: "Administrativo", cargo: "Analista" },
        { nome: "Maria Oliveira", ramal: "1003", email: "maria.oliveira@softhair.com", departamento: "Qualidade", cargo: "Inspetora" },
        { nome: "João Costa", ramal: "1004", email: "joao.costa@softhair.com", departamento: "Comercial", cargo: "Vendedor" },
        { nome: "Fernanda Lima", ramal: "1005", email: "fernanda.lima@softhair.com", departamento: "Produção", cargo: "Supervisora" },
        { nome: "Pedro Alves", ramal: "1006", email: "pedro.alves@softhair.com", departamento: "TI", cargo: "Desenvolvedor" },
        { nome: "Lucia Ferreira", ramal: "1007", email: "lucia.ferreira@softhair.com", departamento: "RH", cargo: "Assistente" },
        { nome: "Roberto Silva", ramal: "1008", email: "roberto.silva@softhair.com", departamento: "Financeiro", cargo: "Contador" }
    ],
    
    agendamentos: [
        { tema: "Reunião de Produção", data: "2024-12-20", horario: "09:00", prioridade: "alta" },
        { tema: "Treinamento de Segurança", data: "2024-12-21", horario: "14:00", prioridade: "media" },
        { tema: "Apresentação de Resultados", data: "2024-12-22", horario: "10:30", prioridade: "alta" },
        { tema: "Reunião de Equipe", data: "2024-12-23", horario: "15:00", prioridade: "baixa" }
    ]
};

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Inicializar componentes
    initNavigation();
    initCampaignBanner();
    initChat();
    initScrollAnimations();
}

// Navegação suave
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remover classe active de todos os links
            navLinks.forEach(l => l.classList.remove('active'));
            // Adicionar classe active ao link clicado
            this.classList.add('active');
        });
    });
    
    // Navbar shrink effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 1)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });
}

// Banner de campanhas
function initCampaignBanner() {
    // Verificar se é setembro para mostrar o banner
    const currentMonth = new Date().getMonth() + 1;
    if (currentMonth === 9) {
        const banner = document.getElementById('campaign-banner');
        if (banner) {
            banner.style.display = 'block';
        }
    }
}

// Chat
function initChat() {
    const chatToggle = document.querySelector('.chat-toggle');
    const chatContainer = document.getElementById('chat-container');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    
    if (!chatToggle || !chatContainer || !chatInput || !chatMessages) return;
    
    let isOpen = false;
    
    chatToggle.addEventListener('click', function() {
        isOpen = !isOpen;
        chatContainer.classList.toggle('show', isOpen);
        
        if (isOpen) {
            chatInput.focus();
        }
    });
    
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            chatInput.value = '';
            
            // Simular resposta automática
            setTimeout(() => {
                const responses = [
                    'Entendi sua solicitação. Vou verificar isso para você.',
                    'Obrigado pelo contato! Nossa equipe irá analisar sua mensagem.',
                    'Vou encaminhar sua solicitação para o responsável.',
                    'Estamos trabalhando para resolver isso o mais rápido possível.'
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessage(randomResponse, 'support');
            }, 1000);
        }
    }
    
    function addMessage(text, sender) {
        const messageEl = document.createElement('div');
        messageEl.className = `message ${sender}`;
        messageEl.innerHTML = `
            <p>${text}</p>
            <span class="time">${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
        `;
        
        chatMessages.appendChild(messageEl);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Expor função globalmente
    window.sendMessage = sendMessage;
}

// Animações de scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const elementsToAnimate = document.querySelectorAll('.card, .aviso-card');
    elementsToAnimate.forEach(el => observer.observe(el));
}

// Funções globais
function toggleChat() {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
        const isOpen = chatContainer.classList.contains('show');
        chatContainer.classList.toggle('show', !isOpen);
    }
}

function sendMessage() {
    // Esta função é chamada pelo botão do chat
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        const message = chatInput.value.trim();
        if (message) {
            // Simular envio de mensagem
            console.log('Mensagem enviada:', message);
        }
    }
}

function showNotification(message, type = 'info') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Remover automaticamente após 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
}

// Funções para páginas específicas
function initAniversariantes() {
    const container = document.getElementById('aniversariantes-scroll');
    if (!container) return;
    
    const hoje = new Date();
    const diaHoje = hoje.getDate();
    const mesHoje = hoje.getMonth() + 1;
    
    mockData.aniversariantes.forEach(pessoa => {
        const [dia, mes] = pessoa.data.split('/').map(Number);
        const isToday = dia === diaHoje && mes === mesHoje;
        
        const avatarClass = getAvatarClass(pessoa.departamento);
        const avatarIcon = getAvatarIcon(pessoa.departamento, pessoa.genero);
        
        const aniversarianteItem = document.createElement('div');
        aniversarianteItem.className = `aniversariante-item ${isToday ? 'today' : ''}`;
        aniversarianteItem.innerHTML = `
            <div class="aniversariante-avatar ${avatarClass}">
                <i class="${avatarIcon}"></i>
            </div>
            <div class="aniversariante-info">
                <h6>${pessoa.nome}</h6>
                <p>${pessoa.cargo}</p>
            </div>
            <div class="aniversariante-data">
                <div class="data">${pessoa.data}</div>
                <div class="departamento">${pessoa.departamento}</div>
            </div>
        `;
        
        container.appendChild(aniversarianteItem);
    });
}

function getAvatarClass(departamento) {
    const classes = {
        'Produção': 'avatar-producao',
        'Escritório': 'avatar-escritorio',
        'Administrativo': 'avatar-escritorio',
        'Qualidade': 'avatar-qualidade',
        'Comercial': 'avatar-comercial',
        'TI': 'avatar-escritorio'
    };
    return classes[departamento] || 'avatar-escritorio';
}

function getAvatarIcon(departamento, genero) {
    const icons = {
        'Produção': 'fas fa-industry',
        'Escritório': 'fas fa-building',
        'Administrativo': 'fas fa-building',
        'Qualidade': 'fas fa-clipboard-check',
        'Comercial': 'fas fa-handshake',
        'TI': 'fas fa-laptop-code'
    };
    return icons[departamento] || 'fas fa-user';
}

function initLancamentos() {
    const container = document.getElementById('lancamentos-grid');
    if (!container) return;
    
    mockData.lancamentos.forEach(lancamento => {
        const lancamentoCard = document.createElement('div');
        lancamentoCard.className = 'col-lg-3 col-md-6';
        lancamentoCard.innerHTML = `
            <div class="card h-100 lancamento-card">
                <div class="lancamento-image">
                    <i class="fas fa-star"></i>
                </div>
                <div class="lancamento-content">
                    <h6>${lancamento.nome}</h6>
                    <p>${lancamento.descricao}</p>
                    <span class="lancamento-badge">${lancamento.categoria}</span>
                </div>
            </div>
        `;
        
        container.appendChild(lancamentoCard);
    });
}

function initRamais() {
    const container = document.getElementById('ramais-scroll');
    const searchInput = document.getElementById('ramal-search');
    const departamentoFilter = document.getElementById('departamento-filter');
    
    if (!container) return;
    
    function renderRamais(ramais) {
        container.innerHTML = '';
        
        ramais.forEach(ramal => {
            const ramalItem = document.createElement('div');
            ramalItem.className = 'ramal-item';
            ramalItem.innerHTML = `
                <div class="ramal-avatar">
                    ${ramal.nome.split(' ').map(n => n[0]).join('')}
                </div>
                <div class="ramal-info">
                    <h6>${ramal.nome}</h6>
                    <p>${ramal.email}</p>
                </div>
                <div class="ramal-details">
                    <div class="ramal-number">${ramal.ramal}</div>
                    <div class="ramal-departamento">${ramal.departamento}</div>
                </div>
            `;
            
            container.appendChild(ramalItem);
        });
    }
    
    function filterRamais() {
        if (!searchInput || !departamentoFilter) return;
        
        const searchTerm = searchInput.value.toLowerCase();
        const selectedDept = departamentoFilter.value;
        
        let filteredRamais = mockData.ramais.filter(ramal => {
            const matchesSearch = ramal.nome.toLowerCase().includes(searchTerm) ||
                                ramal.ramal.includes(searchTerm) ||
                                ramal.departamento.toLowerCase().includes(searchTerm);
            const matchesDept = !selectedDept || ramal.departamento === selectedDept;
            
            return matchesSearch && matchesDept;
        });
        
        renderRamais(filteredRamais);
    }
    
    if (searchInput) searchInput.addEventListener('input', filterRamais);
    if (departamentoFilter) departamentoFilter.addEventListener('change', filterRamais);
    
    // Renderizar inicial
    renderRamais(mockData.ramais);
}

function initAgendamentos() {
    const container = document.getElementById('agendamentos-list');
    const form = document.getElementById('agendamento-form');
    
    if (!container) return;
    
    function renderAgendamentos() {
        container.innerHTML = '';
        
        mockData.agendamentos.forEach(agendamento => {
            const agendamentoItem = document.createElement('div');
            agendamentoItem.className = 'agendamento-item';
            agendamentoItem.innerHTML = `
                <div class="agendamento-priority priority-${agendamento.prioridade}"></div>
                <div class="agendamento-info">
                    <h6>${agendamento.tema}</h6>
                    <p>Agendado para ${agendamento.data}</p>
                </div>
                <div class="agendamento-details">
                    <div class="agendamento-data">${agendamento.horario}</div>
                    <div class="agendamento-horario">${agendamento.prioridade}</div>
                </div>
            `;
            
            container.appendChild(agendamentoItem);
        });
    }
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const novoAgendamento = {
                tema: document.getElementById('agendamento-tema').value,
                data: document.getElementById('agendamento-data').value,
                horario: document.getElementById('agendamento-horario').value,
                prioridade: document.getElementById('agendamento-prioridade').value
            };
            
            mockData.agendamentos.push(novoAgendamento);
            renderAgendamentos();
            form.reset();
            
            showNotification('Agendamento criado com sucesso!', 'success');
        });
    }
    
    renderAgendamentos();
}

// Exportar funções para uso global
window.toggleChat = toggleChat;
window.sendMessage = sendMessage;
window.initAniversariantes = initAniversariantes;
window.initLancamentos = initLancamentos;
window.initRamais = initRamais;
window.initAgendamentos = initAgendamentos;