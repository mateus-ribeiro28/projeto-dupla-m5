const express =  require('express')
const router = express.Router()
const LivrosController = require('../controllers/LivroController')

const checkAuth = require('../helpers/auth').checkAuth


router.get('/add', checkAuth, LivrosController.createLivro)
router.post('/add', checkAuth, LivrosController.createLivroSave)
router.get('/edit/:id', checkAuth, LivrosController.updateLivro)
router.post('/edit/', checkAuth, LivrosController.updateLivroSave)
router.get('/dashboard', checkAuth, LivrosController.dashboard)
router.post('/remove', checkAuth, LivrosController.removeLivro)
router.get('/', checkAuth, LivrosController.showLivros)

module.exports = router