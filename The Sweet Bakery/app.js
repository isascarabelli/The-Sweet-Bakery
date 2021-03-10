const express = require("express")
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Produtos = require('./models/Produtos')
const Usuarios = require('./models/Usuarios')
const Pedidos = require('./models/Pedidos')
const cookieParser = require('cookie-parser')
const session = require('express-session')

//Config
    //template engine
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
    //Body Parser
    app.use(bodyParser.urlencoded({extended:false}))
    app.use(bodyParser.json())
    app.use(cookieParser('secret'))
    app.use(session({cookie: {maxAge: null}}))

app.use(express.static('views/layouts/src'))

//flash message
app.use((req,res, next)=>{
    res.locals.message = req.session.message
    delete req.session.messages
    next()
})

app.get('/', function(req, res){
    Produtos.findAll({
        where: {
            tipo: 'Pão'
        }
    }).then(function(paes){
        Produtos.findAll({
            where: {
                tipo: 'Salgado'
            }
        }).then(function(salgados){
            Produtos.findAll({
                where: {
                    tipo: 'Bolo'
                }
            }).then(function(bolos){
                res.render('produtos', {paes: paes, salgados: salgados, bolos, bolos})
            }) 
         })
    })
})

app.get('/cadastro', function(req, res){
    res.render('cadastro')
})

app.post('/cadastro', function(req, res){  
        Usuarios.create({
            nome: req.body.nome,
            cpf: req.body.cpf,
            telefone: req.body.telefone,
            endereco: req.body.endereco,
            senha: req.body.senha
        }).then(function(){
            console.log("Cadastro feito com sucesso!")
            req.session.message = {
                type: 'success',
                intro: 'Dados corretos!',
                message:'Usuário cadastrado com sucesso.'
            }
            res.redirect('/cadastro')
        }).catch(function(erro){
            console.log("Erro ao cadastrar:" + erro)
            req.session.message = {
                type: 'danger',
                intro: 'Algo errado!',
                message:'Verifique os dados inseridos.'
            }
        })
    
})

app.get('/listarProdutos', function(req, res){
    Produtos.findAll().then(function(posts){
        res.render('listarProdutos', {posts: posts})
    })
})

app.get('/listarUsuarios', function(req, res){
    Usuarios.findAll().then(function(posts){
        res.render('listarUsuarios', {posts: posts})
    })
})

app.get('/senhaAlterar', function(req, res){
    res.render('senhaAlterar')
})

app.post('/senhaAlterar', function(req, res){
    Usuarios.update({senha: req.body.senha},{
        where:{
            cpf: req.body.cpf
            } 
    })
    .then(function(){
    console.log("Senha alterada com sucesso!")
    req.session.message = {
        type: 'success',
        intro: 'Dados corretos!',
        message:'Senha alterada com sucesso.'
    }
        res.redirect('/senhaAlterar')
    })
    .catch(function(erro){
        console.log("Erro ao alterar a senha:" + erro)
            req.session.message = {
                type: 'danger',
                intro: 'Algo errado!',
                message:'Senha não alterada.'
            }
            res.redirect('/senhaAlterar')
    })
})

app.get('/login', function(req, res){
    res.render('login')
})

app.post('/login', function(req, res){
    if(req.body.nome != 'atendente'){
        Usuarios.findAll({
            where:{
                nome: req.body.nome,
                senha: req.body.senha
            }
        }).then(function(post){
            if(post.length != 0){               
                res.render('cliente')
            }
            else{
                //adicionar alerta de erro
                console.log("Erro ao logar!" + erro)
            req.session.message = {
                type: 'danger',
                intro: 'Algo errado!',
                message:'Login não realizado com sucesso.'
            }
                res.redirect('/login')
            }
        })
    }else if(req.body.nome == 'atendente'){
        if(req.body.senha == 'tsbatendente'){
            res.render('atendente')
        }else if(req.body.senha != 'tsbatendente'){
            console.log("erro na senha!" + erro)
            req.session.message = {
                type: 'danger',
                intro: 'Algo errado!',
                message:'Atendendte, sua senha está errada.'
            }
            res.redirect('/login')
        }
    }
})

app.get('/pedido', function(req, res){
    res.render('pedido')
})

app.post('/pedido', function(req, res){
    Pedidos.create({
        produto: req.body.ped,
        quantidade: req.body.quantidade,
        cpfcliente: req.body.cpf,
        dataentrega: req.body.dataentrega,
        horarioentrega: req.body.horaentrega,
        confirmaentrega: 0
    }).then(function(){
        console.log("Pedido realizado com sucesso!")
            req.session.message = {
                type: 'success',
                intro: 'Tudo certo!',
                message:'Pedido realizado com sucesso.'
            }
        res.redirect('/pedido')       
    }).catch(function(erro){
        console.log("erro ao criar o pedido: " +erro)
        req.session.message = {
            type: 'danger',
            intro: 'Algo errado!',
            message:'Houve um erro ao realizar o seu pedido.'
        }
        res.redirect('/pedido')
    })
})

app.post('/reconhecer', function(req, res){
    Usuarios.findAll({
        where:{
            cpf: req.body.cpfrec
        }
    }).then(function(endereco){
        Pedidos.findAll({
            where:{
                cpfcliente: req.body.cpfrec
            }
        }).then(function(pedidos){
            res.render('atendente', {endereco: endereco, pedidos: pedidos})
        })
    })
})

app.post('/registro', function(req, res){
    Pedidos.findAll({
        where:{
            dataentrega: req.body.data
        }
    }).then(function(registros){
        res.render('atendente', {registros:registros})
    })
})

app.post('/confirmar', function(req, res){
    Pedidos.update({ confirmaentrega: 1 },{
        where:{
            id: req.body.idpedido
        }
    }).then(function(){
        console.log('entrega confirmada')
        req.session.message = {
            type: 'success',
            intro: 'Tudo certo!',
            message:'Pedido realizado com sucesso.'
        }
        res.render('atendente')
    }).catch(function(){
        console.log('Confira se o id do pedido está certo' + erro)
        req.session.message = {
            type: 'danger',
            intro: 'Algo errado!',
            message:'Houve um erro ao realizar o seu pedido.'
        }
        res.render('atendente')
    })
})

app.get('/listarProdutos', function(req, res){
    Produtos.findAll().then(function(posts){
        res.render('listarProdutos', {posts: posts})
    })
})

app.get('/listarUsuarios', function(req, res){
    Usuarios.findAll().then(function(posts){
        res.render('listarUsuarios', {posts: posts})
    })
})

app.get('/listarPedidos', function(req, res){
    Pedidos.findAll().then(function(posts){
        res.render('listarPedidos', {posts: posts})
    })
})

app.listen(8081)
