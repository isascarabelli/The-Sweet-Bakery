const db = require('./db')

var Produtos = db.sequelize.define('produtos',{
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey:true,
        allowNull: false,
        autoIncrement: true
    },
    nome: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    valor: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    tipo: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
});
//sequelize.sync().then(function(){
  //pães
  /*
      Produtos.create({
        nome: 'Pão Francês',
        valor: '15,00',
        tipo: 'Pão'
    })
    Produtos.create({
        nome: 'Pão Doce',
        valor: '17,00',
        tipo: 'Pão'
    })

    Produtos.create({
        nome: 'Baguete',
        valor: '16,00',
        tipo: 'Pão'
    })
    
    Produtos.create({
        nome: 'Brioche',
        valor: '20,00',
        tipo: 'Pão'
    })

    //salgados
    Produtos.create({
        nome: 'Coxinha',
        valor: '4,00',
        tipo: 'Salgado'
    })
    Produtos.create({
        nome: 'Empada',
        valor: '4,00',
        tipo: 'Salgado'
    })
    Produtos.create({
        nome: 'Pastel',
        valor: '1,50',
        tipo: 'Salgado'
    })
    Produtos.create({
        nome: 'Pão de queijo',
        valor: '2,00',
        tipo: 'Salgado'
    })
    //bolos
    Produtos.create({
        nome: 'Bolo de cenoura',
        valor: '7,00',
        tipo: 'Bolo'
    })
    Produtos.create({
        nome: 'Bolo de chocolate',
        valor: '6,00',
        tipo: 'Bolo'
    })
    Produtos.create({
        nome: 'Bolo formigueiro',
        valor: '7,00',
        tipo: 'Bolo'
    })
    Produtos.create({
        nome: 'Bolo de banana',
        valor: '6,00',
        tipo: 'Bolo'
    })*/
//})
//Produtos.sync({force:true})
module.exports = Produtos