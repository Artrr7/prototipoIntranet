// Tables.js - Funcionalidades específicas das tabelas
document.addEventListener('DOMContentLoaded', function() {
    initializeTables();
});

// Dados dos ramais - Será carregado dinamicamente
const ramais = [
    // Os dados dos ramais serão carregados de uma fonte externa
    // ou inseridos manualmente pela administração
];

function initializeTables() {
    initializeRamaisTable();
}

function initializeRamaisTable() {
    // Se não há dados, mostrar mensagem
    if (ramais.length === 0) {
        const tableContainer = document.querySelector('.dataTables_wrapper');
        if (tableContainer) {
            tableContainer.innerHTML = `
                <div class="text-center text-muted py-5">
                    <i class="fas fa-phone fs-1 mb-3 d-block"></i>
                    <h4 class="mb-3">Lista de Ramais</h4>
                    <p class="mb-0">A lista de ramais será carregada pela administração</p>
                </div>
            `;
        }
        return;
    }
    
    const table = $('#ramaisTable').DataTable({
        data: ramais,
        columns: [
            { data: 'name' },
            { data: 'ramal' },
            { data: 'email' },
            { data: 'department' },
            { data: 'cargo' }
        ],
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/pt-BR.json'
        },
        responsive: true,
        pageLength: 10,
        order: [[0, 'asc']],
        dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>' +
             '<"row"<"col-sm-12"tr>>' +
             '<"row"<"col-sm-12 col-md-5"i><"col-sm-12 col-md-7"p>>',
        initComplete: function() {
            this.api().table().container().classList.add('ramais-container');
        }
    });
}

function exportRamaisData() {
    const csv = convertToCSV(ramais);
    downloadCSV(csv, 'ramais_empresa.csv');
}

function convertToCSV(data) {
    if (!data.length) return '';
    
    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(header => `"${row[header]}"`).join(','))
    ].join('\n');
    
    return csvContent;
}

function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}
