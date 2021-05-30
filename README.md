# Radar do investido - REST API (backend)

## Como rodar o projeto

O projeto está organizado em containers. Para rodar o projeto em ambiente de desenvolvimento:

1. Clonar o projeto:
```
git clone http://tools.ages.pucrs.br/radar-do-investidor/backend.git
```
2. Entrar no diretório do projeto:
```
$ cd backend
$ docker-compose -f docker-compose.yaml up
```

3. Quando terminar de utilizar o container
```
$ docker-compose down -v
```

O comando "-v" garante que o docker vai apagar o volume criado pelo container, caso esqueça de utilizar o "-v" 
basta utilizar o seguinte comando para apagar volumes que não estão sendo utilizados:

```
$ docker volume prune
```

## Swagger

Depois de executar o programa, basta acessar a seguinte URL para ver o swagger com a explicação de todas as rotas disponibilizadas pela API:

```
localhost:4000/doc/
```

## Alguns comandos para minupulação do postgres

```
$ docker exec -it warren-db bash
$ psql warren warren
$ \x
$ select * from public."Fundo";
$ select count(*) from public."Fundo";
$ delete from public."Fundo";
```

## Deploy
```
Baixar Github de deploy:
    - Clone seguinte projeto na mesma pasta em que o projeto backend foi clonado (CUIDADO: não misture os fontes): https://github.com/Hercilio1/rdi-backend-deploy

Sincronize com o Github de deploy:
    - Rode o comando: $ sh deploy.sh
    - Vá para o projeto de deploy clonado (rdi-backend-deploy)
    - Faça um commit e envie um push (na master mesmo)

Novo build do projeto:
    - Acesse o serviço Code Build
    - Acesse o build rdi-backend-deploy
    - Pressione no botão em destaque "Start Build"
    - Acompanhe até o final para garantir que não ocorrerão erros

Pause a ECS task para gerar uma nova task com a última versão:
    - Acesse o serviço ECS
    - Acesse o cluster: rdi-frontend-cluster
    - Vá para tab > tasks
    - Puase (stop) as tasks relacionadas a task definition "rdi-backend-task"
```