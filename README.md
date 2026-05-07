# projetobuscacep
Meu projeto Busca CEP
# Busca CEP (PWA)

Aplicação web para consulta de endereços por CEP e busca de CEP por rua, usando as APIs públicas **ViaCEP** e **IBGE**.

## 1) Sobre o projeto

### Descrição
O projeto oferece duas formas de consulta:
- **Consulta por CEP**: preenche rua, bairro, cidade, estado e DDD.
- **Consulta por Rua**: busca endereços por UF, cidade e nome da rua.

### Objetivo
Transformar a aplicação de sala em uma versão mais profissional:
- instalável no celular/desktop (PWA);
- com funcionamento parcial offline via cache;
- publicada na internet.

### Tecnologias utilizadas
- HTML5
- CSS3
- JavaScript (ES6+)
- Materialize CSS
- Fetch API
- Service Worker
- Web App Manifest

## 2) Conceitos de PWA

### O que é uma PWA
**PWA (Progressive Web App)** é uma aplicação web que usa recursos modernos do navegador para oferecer experiência próxima de app nativo.

### Principais características
- Instalável
- Responsiva
- Funciona em conexão instável
- Pode ter suporte offline (com Service Worker)

### Instalável
Com o `manifest.json`, o navegador identifica nome, ícone, tema e modo de exibição para instalação.

### Offline (Service Worker)
O arquivo `service-worker.js` faz cache dos arquivos essenciais. Assim, a interface principal carrega mesmo sem internet (consultas de API continuam dependendo de rede).

### Responsividade
A interface usa Materialize e viewport mobile para adaptar layout em telas menores.

### `manifest.json`
Define metadados da aplicação:
- nome e nome curto;
- cores do tema;
- ícone;
- `start_url`, `scope` e `display`.

### `service-worker.js`
- cache inicial dos arquivos da aplicação;
- limpeza de caches antigos;
- estratégia **cache first** para arquivos estáticos.

## 3) Como rodar o projeto localmente

Você pode executar com servidor local simples:

```bash
# opção 1 (Node)
npx serve .

# opção 2 (Python)
python3 -m http.server 5500
```

Depois acesse no navegador:
- `http://localhost:3000` (com `serve`) ou
- `http://localhost:5500` (com Python).

> Observação: Service Worker só funciona em `localhost` ou HTTPS.

## 4) Como fazer o deploy (Netlify)

Passo a passo sugerido:
1. Suba o projeto para um repositório GitHub.
2. No Netlify, clique em **Add new site** > **Import an existing project**.
3. Conecte ao GitHub e selecione o repositório.
4. Configure:
   - **Build command**: (vazio, projeto estático)
   - **Publish directory**: `.`
5. Clique em **Deploy site**.
6. (Opcional) Ajuste o nome do domínio em **Domain settings**.

### Link final da aplicação
Preencha após publicar:
- **URL pública**: `https://SEU-SITE.netlify.app`

## Checklist da atividade

- [x] `manifest.json`
- [x] `service-worker.js`
- [x] Registro do Service Worker no JS principal
- [x] Consulta de CEP funcionando
- [x] Busca por rua funcionando
- [x] Interface responsiva
- [x] README com documentação completa
