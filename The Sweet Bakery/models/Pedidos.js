const db = require('./db')

var Pedidos = db.sequelize.define('pedidos',{
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey:true,
        allowNull: false,
        autoIncrement: true
    },

    produto: {
        type: db.Sequelize.STRING,
        allowNull: false
    },

    quantidade: {
        type: db.Sequelize.STRING,
        allowNull: false,
    },
    cpfcliente: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    dataentrega: {
        type: db.Sequelize.DATEONLY,
        allowNull: false
    },
    horarioentrega: {
        type: db.Sequelize.TIME,
        allowNull: false
    },
    confirmaentrega: {
        type: db.Sequelize.BOOLEAN,
        allowNull: false
    }
})
//Pedidos.sync({force:true})

module.exports = Pedidos