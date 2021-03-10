# The-Sweet-Bakery // Sistema de Gestão de Entrega em uma Padaria

## Como testar

Primeiro, instale o Node em seu computador [clicando aqui](https://nodejs.org/pt-br/download/).
Em seguida, baixe a pasta "The Sweet Bakery" e abra, preferencialmente, no Visual Studio. Após isso, certifique que todos os pacotes estejam instalados corretamente, caso não, dê os seguintes comandos no terminal dentro da pasta:

```
npm install --save sequelize
npm install --save mysql2
npm install express --save
npm install --save express-handlebars
npm install --save body-parser
npm install --save cookie-parser express-session
 ```

Agora dê seguinte comando, ainda dentro da pasta no terminal:
```
node app.js
 ```
Para finalizar abra o browser e digite: localhost:8081

## Funcionamento do site

Na página principal há cards com todos os produtos, de teste, da padaria, assim o cliente saberá o que escolher, e o preço, na hora de fazer o pedido.
Para fazer o pedido é necessário ter um cadastro, isso é possível clicando no "cadastre-se", que se encontra no cabeçalho da página. Caso já tenha uma conta, basta clicar em "Login".

Se o cliente esquecer a senha, poderá alterá-la clicando no "Alterar Senha" localizado no cabeçalho da página.

Quando o login for realizado com sucesso, será redirecionado para uma página com um link para um formulário para ser realizado o pedido.

Para acessar as outras funcionalidades, que são exclusivas para funcionários da padaria, basta fazer o login com o nome "atendente" e senha "tsbatendente".

As funcionalidades exclusivas são: 
* Reconhecer o cliente (Ao reconhecer o CPF o atendente sabe o endereço e os pedidos frequentes do usuário.)
* Registro de pedidos (pedido/data/hora/status do pedido)
* Confirmação de entrega (Ao digitar o ID do pedido o status dele mudará para "entregue")
* Exibir tabelas do banco de dados (Ao selecionar a tabela, produtos ou usuários ou pedidos, será exibido os dados da tabela escolhida)

## Grupo:
* Isabela Ferreira Scarabelli
* Tainara Marina Gonçalves Morais
* Tatiane Vitória de Oliveira

Turma: 303
