<h1>CreditUsers</h1>

<h4 align="center">
  Projeto desenvolvido como resposta ao challenge da Bemol Digital
</h4>

## Tecnologias adotadas


#### Backend - API
-  [PHP 7.4][php]
-  [Composer][composer]
-  [Lumen][lumen]
-  [Sqlite][sqlite]

#### Frontend
-  [Bootstrap 5][bootstrap]
-  [Node][nodejs]

## Como utilizar

Primeiro você vai precisar de [Git](https://git-scm.com), [PHP 7+][php], [Composer][composer], [Node.js v11+][nodejs] e [Yarn][yarn] instalados na sua máquina.

No seu Terminal ou Console, siga os passos:

```bash
# Clone este repositório
$ git clone https://github.com/roberto5g/creditusers.git

# Entre no repositório
$ cd creditusers

# Primeiro acesso o diretório api_lumen
$ cd api_lumen

# Instale as dependências da api com o composer
$ composer install

# Crie o arquivo de configuração .env
$ cp .env.example .env

# Edite o conteudo do arquivo .env 
...
  DB_CONNECTION=sqlite
  #DB_HOST=localhost
  #DB_PORT=5432
  #DB_DATABASE=creditusers
  #DB_USERNAME=homestead
  #DB_PASSWORD=secret
...

# Execute o comando para criar as tabelas no banco de dados
$ php artisan migrate

# Agora execute o servidor para iniciar a API
$ php -S localhost:8000 -t public

# Agora acesse novamente em uma nova aba do seu terminal o diretório raiz do projeto
# Acesse o diretório front
$ cd front

# Instale as dependências
$ yarn install

# Inicie a aplicação
$ node app.js
```

A aplicação ficará disponível no endereço http://localhost:3000

---

[lumen]: https://lumen.laravel.com/
[bootstrap]: https://getbootstrap.com/docs/5.0/getting-started/introduction/
[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
[npm]: https://www.npmjs.com/
[php]: https://www.php.net/releases/7_4_0.php
[composer]: https://getcomposer.org/
[sqlite]: https://www.sqlite.org/


