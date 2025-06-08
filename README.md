
# NIFFER Invoice Generator

![Electron](https://img.shields.io/badge/Electron-2B2E3A?style=for-the-badge&logo=electron&logoColor=9FEAF9) ![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)

Aplicação cross-platform construída com Electron, que oferece configuração de base de dados e atualizações automáticas via GitHub Releases.

## ✨ Funcionalidades

- **Assistente de configuração** na primeira execução
- **Suporte a duas bases de dados**: PostgreSQL e MySQL
- **Atualizações automáticas** via GitHub
- **Empacotamento multiplataforma**:
  - Windows: instalador `.exe`
  - Linux: pacote `.deb` + arquivo `.tar.gz`
- Armazenamento seguro de credenciais com `electron-store`
- Validação da conexão antes de salvar configurações
- Arquitetura moderna do Electron com separação entre main e renderer

## 🚀 Primeiros Passos

### Pré-requisitos

- Node.js v14 ou superior
- npm ou yarn
- Git (para publicação de updates)

### Instalação

```bash
git clone https://github.com/psyfr0st/niffer.git
cd niffer
npm install
npm start
```

### 🔨 Comandos de Build

| Plataforma | Comando              | Saída                   |
|-----------|----------------------|--------------------------|
| Windows   | `npm run build:win`  | Instalador `.exe`        |
| Linux     | `npm run build:linux`| `.deb` + `.tar.gz`       |

### 📦 Publicar para GitHub Releases

```bash
npm run publish
```

## 🏗️ Estrutura do Projeto

```
electron-db-manager/
├── src/
│   ├── main/               # Processo principal
│   │   ├── main.js         # Ciclo de vida da app
│   │   ├── updater.js      # Lógica de atualização
│   │   └── database.js     # Conexões com BD
│   ├── renderer/
│   │   ├── setup/          # Wizard inicial
│   │   ├── index/          # UI principal
│   │   └── styles/         # Estilos
│   └── shared/             # Utilitários
├── build/                  # Recursos visuais
│   ├── icon.ico            # Ícone Windows
│   └── icon.png            # Ícone Linux
├── package.json            # Configuração do projeto
└── electron-builder.yml    # Configuração de build
```

## ⚙️ Configuração Necessária

### `package.json`

```json
"repository": {
  "type": "git",
  "url": "https://github.com/seu-usuario/seu-repo.git"
},
"build": {
  "publish": {
    "owner": "seu-usuario",
    "repo": "seu-repo"
  }
}
```

### `electron-builder.yml`

```yaml
publish:
  provider: github
  repo: seu-repo
  owner: seu-usuario
```

## 🗃️ Suporte a Bases de Dados

| Recurso           | PostgreSQL     | MySQL          |
|------------------|----------------|----------------|
| Conexão          | Pool           | Única          |
| Suporte a SSL    | Sim            | Sim            |
| Versão mínima    | 9.6+           | 5.7+           |

## 🔄 Fluxo de Atualização

1. A aplicação verifica atualizações no GitHub Releases ao iniciar
2. Baixa atualizações silenciosamente em background
3. Notifica o utilizador quando a atualização está pronta
4. Instala no próximo reinício ou com confirmação do utilizador

## 🎨 Personalização

### Adicionar lógica personalizada

```js
// src/renderer/index/index.js
ipcRenderer.on('custom-event', () => {
  // Sua lógica personalizada
});
```

### Estilizar a interface

```css
/* src/renderer/styles/main.css */
.custom-element {
  background: #2c3e50;
}
```

### Extender operações da base de dados

```js
// src/main/database.js
async function customQuery(query) {
  return pool.query(query);
}
```

## 📜 Licença

MIT License – Veja o ficheiro `LICENSE` para detalhes.

## 📌 Nota

Substitua os ícones da pasta `build/`:

- `icon.png` (512x512) para Linux
- `icon.ico` (256x256) para Windows
