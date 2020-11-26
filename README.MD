# Rota de Viagem
Aplicação para calcular a melhor rota partindo de um ponto origem para um ponto destino.

## Como executar a aplicação

1) Instale os modulos de dependencia usando o Node Pack Manager (npm) com o seguinte comando na raiz do projeto:

```
    npm install
```

2) Inicie a aplicação com o comando abaixo, lembrando de incluir a extesão do arquivo (txt/csv):
```
    node server.js <nome_do_arquivo_com_as_rotas>
```

3) Pronto! A aplicação esta rodando. A API pode ser acessada em localhosta:3000/routes ou no próprio console.

## Rodando os testes
Para rodar os testes, basta executar o comando na raiz do projeto:
```
npm test
```

## Usando a API

### Consula de melhor rota (GET)

#### Request

Envie a requisição para:
```
localhost:3000/routes?origin=<origin>&target=<target>
```
Onde os parametros origin e target devem ser colocados. Como no exemplo a seguir:
```
localhost:3000/routes?origin=GRU&target=ORL
```
#### Response

A resposta de sucesso deverá ser com status code 200 e payload:
```
{
    "bestPath": "<origin> - <city> - <city> - <target>",
    "price": <value>
}
```

Como no exemplo a seguir:
```
{
    "bestPath": "GRU - BRC - SCL - ORL",
    "price": 35
}
```

### Registro de rotas (POST)

#### Request

Envie a requisição para:
```
localhost:3000/routes
```

Com o seguinte payload no body:
```
{
    "route": "<origin>,<target>,20"
}
```
Como no exemplo a seguir:
```
{
    "route": "SCL,ORL,20"
}
```

#### Response
A resposta de sucesso deverá ser com status code 200 e payload:
```
{
    "response": "Route included"
}
```

### Console
Ao iniciar a aplicação, o console mostrará a seguinte mensagem:
```
please enter the route:
```
Onde deve ser inserido a origin e o destino separado por um ífem, como no exemplo a seguir:
```
gru-orl
```

A aplicação deverá responder da seguinte forma:
```
best route: <origin> - <city> - <city> - <target> > $<value>
```
como no exemplo a seguir
```
best route: GRU - BRC - SCL - ORL > $35
```

##  Estrutura dos arquivos/pacotes,
```
├── README.MD
├── input-file.csv
├── package.json
├── server.js
├── src
│   ├── controllers
│   │   └── routesController.js
│   ├── prompt
│   │   └── prompt-base.js
│   ├── routes
│   │   └── base-routes.js
│   └── services
│       ├── inputFile.js
│       └── routes.js
└── tests
    ├── inputFile.spec.js
    └── routes.spec.js
```

## Decisões de design adotadas para a solução

### Linguiagem
Fiquei em dúvida sobre usar Java ou Node.JS, mas acabei optando pela seguida por ser uma linguagem menos verbosa e mais direta. 

Pela solução ser pequena, o que poderia ser considerada um micro-serviço, a opção de Node.js com express acaba sendo mais rápida do que Java com Spring, principalmente do ponto de vista de *coldstart*.

### Server
O arquivo inicial `./server.js` foi separado para conter somente ações relacionadas a inicialização do server da API e do server do console.

### Console
A interação do usuário com o console foi separada no arquivo `./src/prompt/prompt-base`. Nele contém a lógica para a pergunta, recebimento da rota desejada e resposta do melhor caminho no console.

### Rotas
Separei a definição das rotas em um arquivo separado do server para retirar essa responsabilidade do arquivo inicial. As rotas podem ser inclúdas e modificadas no arquivo `./src/routes/base-route.js` e devem direcionar as requisições para seus respectivos *controller*.

### Controller
O controller é responsável por executar a ação designada em cada verbo da API e responder de acordo com o contrato de response.

### Serviços
Os serviços foram separados em diferentes arquivos para manter a alta coesão e fraco acoplamento.
#### Manipulação de arquivo
A manipulação do arquivo contendo as rotas registradas, tanto para leitura quanto para escrita, foi separado no arquivo `./src/services/inputFilejs`.

Como a leitura de um arquivo é algo oneroso do ponto de vista de processamento, especialmente quando isso é feito milhares de vezes em um curto espaço de tempo, optei por manter em memória o conteúdo do arquivo. A função responsável por adicionar rota ao arquivo, também atualiza esse conteúdo em memória para manter a coerência das informação entre arquivo e memória.

#### Cálculo das rotas
O cálculo da melhor rota foi separado no arquivo `./src/services/routes.js` contendo apenas o algoritmo responsável por calcular a melhor rota.

## Descrição  API Rest
Foi usado o framework *express* para exposição do serviços contendo duas rotas, sendo uma para o verbo GET e outra para o verbo POST. 

O GET é responsável por retornar a melhor rota, onde deve receber dois paramentro: origem e destino. 

O POST é responseavel por adicionar uma nova rota ao arquivo, onde deve receber um payload json no body contendo a nova rota, como explicado anteriormente.