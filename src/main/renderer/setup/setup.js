const { ipcRenderer } = require('electron');

document.getElementById('dbConfigForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const dbConfig = {
        dbType: document.getElementById('dbType').value,
        host: document.getElementById('host').value,
        port: parseInt(document.getElementById('port').value),
        database: document.getElementById('database').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    ipcRenderer.send('save-db-config', dbConfig);
});

document.getElementById('testConnection').addEventListener('click', async () => {
    const dbConfig = {
        dbType: document.getElementById('dbType').value,
        host: document.getElementById('host').value,
        port: parseInt(document.getElementById('port').value),
        database: document.getElementById('database').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    if (!dbConfig.dbType) {
        document.getElementById('testResult').textContent = 'Selecione um tipo de banco de dados';
        return;
    }

    document.getElementById('testResult').textContent = 'Testando conexão...';

    const result = await ipcRenderer.invoke('test-db-connection', dbConfig);

    if (result.success) {
        document.getElementById('testResult').textContent = 'Conexão bem-sucedida!';
        document.getElementById('testResult').style.color = 'green';
    } else {
        document.getElementById('testResult').textContent = `Erro: ${result.error}`;
        document.getElementById('testResult').style.color = 'red';
    }
});