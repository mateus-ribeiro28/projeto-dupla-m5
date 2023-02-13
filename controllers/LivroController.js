const Livro = require('../models/Livro')
const User = require('../models/User')
const session = require.session

module.exports = class LivrosController {
    static async showLivros(req, res) {
        res.render('livros/home')
    }

    static async dashboard(req, res) {
        const userId = req.session.userid

        const user = await User.findOne({
            where: {
                id: userId,
            },
            include: Livro,
            plain: true,
        })

        if(!user) {
            res.redirect('/login')
        }
        

        const livros = user.Livros.map((result) => result.dataValues)

        let emptyLivros = false

        if(livros.length === 0) {
            emptyLivros = true
        }

        

        res.render('livros/dashboard', { livros, emptyLivros  })
    }

    static createLivro(req, res) {
        res.render('livros/create')
    }

    static async createLivroSave(req, res) {

        const livros = {

            title: req.body.title,
            author: req.body.author,
            gender: req.body.gender,
            UserId: req.session.userid,
            
        }

        try {
            await Livro.create(livros)

            req.flash('message', 'Pensamento criado com sucesso!')

            req.session.save(() => {
            res.redirect('/livros/dashboard')
            })
        } catch (error) {
            console.log('Aconteceu um erro: ' + error)
        }

        
    }

    static async removeLivro(req,res) {

        const id = req.body.id
        const UserId = req.session.userid

        try {

            await Livro.destroy({where: {id: id, UserId: UserId}})

            req.flash('message', 'Removido com sucesso!')

            req.session.save(() => {
            res.redirect('/livros/dashboard')
            })

        } catch (error) {
            console.log('Aconteceu um erro: ' + error)
        }
    }
    static async updateLivro(req, res) {
        const id = req.params.id

        const livro = await Livro.findOne({ where: {id: id}, raw: true})

        

        res.render('livros/edit', { livro })
    }

    static async updateLivroSave(req, res) {
        const id = req.body.id

        const livros = {
            title: req.body.title,
            author: req.body.author,
            gender: req.body.gender,
        }

        try {
            await Livro.update(livros, { where: { id: id } })

            req.flash('message', 'Livro atualizado com sucesso')

            req.session.save(() => {
                res.redirect('/livros/dashboard')
            })

        } catch (error) {
            console.log(error)
        }
    }
}