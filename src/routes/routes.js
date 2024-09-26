const express = require('express')
const DocumentController = require('../controllers/DocumentController')
const UserController = require('../controllers/UserController')
const PrivilegeController = require('../controllers/PrivilegeController')
const CompanyController = require('../controllers/CompanyController')
const SectorController = require('../controllers/SectorController')
const ArquivosController = require('../controllers/ArquivoController')
const authMiddleware = require('../middlewares/auth')

const router = express.Router() 

router.get('/documents',DocumentController.index)
router.post('/documents', DocumentController.store)
router.put('/documents/:document_id', DocumentController.update)
router.delete('/documents/:document_id', DocumentController.delete)

router.post('/privileges',PrivilegeController.create)
router.get('/privileges/get',PrivilegeController.index)

router.post('/sectors',SectorController.create)
router.delete('/sectors/:id',SectorController.delete)
router.get('/sectors',SectorController.index)

router.post('/companys/',CompanyController.create)

router.post('/arquivos/',ArquivosController.createArquivo)

router.use(authMiddleware)
router.get('/users',UserController.index)
router.post('/users/store',UserController.store)
router.post('/users/login',UserController.login)


module.exports = router