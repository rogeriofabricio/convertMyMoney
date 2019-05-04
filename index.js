const express = require('express')
const app = express()
const path = require('path')

const convert = require('./lib/convert')

const port = process.env.PORT || 3000


app.set('views', path.join(__dirname, 'views'))
app.set('lib', path.join(__dirname, 'lib'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/cotacao', (req, res) => {
    const { cotacao, quantidade } = req.query

    if(cotacao && quantidade){
        const conversao = convert.convert(cotacao, quantidade)
        res.render('cotacao', {
            error: false,
            cotacao: convert.toMoney(cotacao),
            quantidade: convert.toMoney(quantidade),
            conversao: convert.toMoney(conversao)
        })
    } else {
        res.render('cotacao', {
            error: 'Valore inválidos'
        })
    }
    
})

app.listen(port, (err) => {
    if(err) {
        console.log('Não foi possível rodar o servidor!')
    } else {
        console.log('Servidor conver On line!')
    }
})