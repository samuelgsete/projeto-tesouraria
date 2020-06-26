# Projeto Tesouraria
 
Quem já se responsabilizou em gerir tesourarias com certeza já se deparou com a dor de cabeça de ter que organizar as receitas e gastos realizados e preparar relatórios. Normalmente as Igrejas do interior e da região metropolitana promovem pequenas vendas para alargar as receitas o que acaba gerando um grande fluxo de transações para gerenciar. O resultado disso é que o tesoureiro quase sempre acaba encontrando muitas inconsistências nos dados financeiros contabilizados  pela ausência de uma ferramenta apropriada para a finalidade. Pois é, eu já tive que lidar com esse problema e como estudante de computação resolvi desenvolver um sistema Web para facilitar o manuseio dessas transações e automatizar a emissão de relatórios. A principais funcionalidades do sistema são:
   
    - Cadastro de usuário com confirmação de email
    - Autenticação de usuário
    - Cadastro de tesourarias,
    - Gerenciamento de receitas e despesas
    - Realização de inventário
    - Emissão de relatórios
    - Exibição de histórico de transações
 
Preparei um vídeo de demonstração das principais funcionalidades do sistema que pode ser encontrado clicando [aqui](https://youtu.be/zXt22wRJhk0). O frontend da aplicação foi desenvolvido utilizando o [Angular](https://angular.io/) e o [MDBootstrap](https://mdbootstrap.com/docs/angular/getting-started/download/) enquanto que o backend foi construido usando [NestJS](https://nestjs.com/) e [PostgreSQL](https://www.postgresql.org/download/).
 
# Instalação
 
Nesse breve tutorial estarei ensinando como instalar o ambiente de desenvolvimento, primeiro de tudo é preciso instalar o Node, acesse esse [link](https://nodejs.org/en/download/) para acessar a página oficial de download. O Node está disponível para Windows, Mac e Linux, no meu caso utilizo Windows. Com o Node instalado podemos utilizar o gerenciador de pacotes `NPM` para instalar os frameworks necessários. Para instalar o Angular precisamos digitar dois comandos: um para instalar a ferramenta de linha de comando do Angular e o outro para instalar o Typescript. Para tanto digite os seguintes comandos no seu terminal:
```
    npm install -g angular-cli
    npm install -g typescript
```
 
Precisamos agora instalar o NestJS e o nosso banco de dados Postgres, o Nest pode ser instalado utilizando o comando `npm i -g @nestjs/cli`. Para instalar o Postgres basta acessar a [página](https://www.postgresql.org/download/) de download e executar o instalador, no processo de instalação deve-se criar um usuario e senha, nesse caso utilize um usuário igual a postgres e uma senha também igual a postgres, caso contrário o sistema não conseguirá acessar o banco de dados. Após seguir esses passos é necessário criar um banco de dados por nome `treasurydb`, para isso pode ser usado a ferramenta [pgAdmin](https://www.pgadmin.org/download/), que normalmente vem instalado junto com o PostgreSQL. Após esses passos faça a clonagem do repositório, você verá que será baixado dois projetos: `tesouraria-api` e `tesouraria-front`, acesse ambos os diretórios e digite o seguinte comando no seu terminal:  
 
```
    npm install
```
 
Esse comando irá efetuar o download de todas as bibliotecas que a aplicação utiliza. Após esse processo basta digitar mais dois comandos para iniciar a aplicação, no diretório `tesouraria-api` digite o comando `nest start` , no diretório `tesouraria-front` digite `ng serve`, em seguida aguarde os serviços serem devidamente iniciados. Após a iniciação do projeto abra o navegador e acesse a url `http://localhost:4200/user/create`, crie sua conta gratuita, faça [login](http://localhost:4200/login) e utilize livremente todas as funcionalidades que o sistema tem a oferecer.