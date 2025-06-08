const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
    const dbConfig = ipcRenderer.sendSync('get-db-config');
    console.log('Configuração do banco de dados:', dbConfig);

    document.getElementById('checkUpdate').addEventListener('click', () => {
        ipcRenderer.send('check-for-update');
    });
});

ipcRenderer.on('update_available', () => {
    document.getElementById('updateStatus').textContent = 'Atualização disponível! Baixando...';
});

ipcRenderer.on('update_downloaded', () => {
    document.getElementById('updateStatus').textContent = 'Atualização baixada. Reinicie a aplicação para instalar.';
    if (confirm('Atualização pronta para instalar. Reiniciar agora?')) {
        ipcRenderer.send('restart_app');
    }
});