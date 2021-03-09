const db = require('./db')

var Usuarios = db.sequelize.define('usuarios',{
    nome: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: db.Sequelize.STRING,
        allowNull: false,
        primaryKey:true
    },
    telefone: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    endereco: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
})
//Usuarios.sync({force:true})

module.exports = Usuarios
