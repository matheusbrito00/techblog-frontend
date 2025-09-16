# 📌 Projeto Frontend Angular 19 + TailwindCSS - TechBlog

Este projeto é o **frontend** da aplicação, desenvolvido em **Angular 19** com **TailwindCSS** para estilização.  
Foi projetado para ser simples, moderno e performático, com foco em usabilidade.  

---

## 🚀 Tecnologias Utilizadas

- **[Angular 19](https://angular.dev/)** → Framework robusto e moderno para construção de aplicações web escaláveis.  
- **[TailwindCSS](https://tailwindcss.com/)** → Framework de CSS utilitário que acelera o desenvolvimento de interfaces sem a necessidade de muitos arquivos de estilos personalizados.  

📌 **Decisão de arquitetura:** optei por **não utilizar muitas bibliotecas externas**, mantendo o projeto mais leve, limpo e de fácil manutenção.  

---

## 🛠️ Como Rodar a Aplicação

1. Clone este repositório:
   ```bash
   git clone techblog-frontend
   cd techblog-frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   ng serve -o
   # ou
   npm start
   ```

A aplicação ficará disponível em:  
👉 [http://localhost:4200](http://localhost:4200)

---

## 🔑 Acesso e Permissões

- **Artigos** → podem ser acessados livremente, mesmo sem login.  
- **Criar/Editar Artigos** → é necessário estar logado.  
- **Comentar em Artigos** → também exige autenticação.  

---

## 📖 Documentação

Este frontend consome a API REST desenvolvida em FastAPI.  
Certifique-se de que o **backend** esteja rodando para acessar todas as funcionalidades.  