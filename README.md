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

'''
$ docker exec -it warren-db bash
$ psql warren warren
$ \x
$ select * from public."Fundo";
$ select count(*) from public."Fundo";
$ delete from public."Fundo";
'''