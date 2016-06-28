var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var userController = require('../controllers/user_controller');
var sessionController = require('../controllers/session_controller');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


// Autoload de parametros
router.param('quizId', quizController.load);  // autoload :quizId
router.param('userId', userController.load);  // autoload :userId
router.param('commentId', commentController.load);  // autoload :commentId


// Definición de rutas de sesion
router.get('/session',    sessionController.new);     // formulario login
router.post('/session',   sessionController.create);  // crear sesión
router.delete('/session', sessionController.destroy); // destruir sesión


// Definición de rutas de cuenta
router.get('/users',                    userController.index);   // listado usuarios
router.get('/users/:userId(\\d+)',      userController.show);    // ver un usuario
router.get('/users/new',                userController.new);     // formulario sign un
router.post('/users',                   userController.create);     // registrar usuario
router.get('/users/:userId(\\d+)/edit', sessionController.loginRequired, 
										sessionController.adminOrMyselfRequired, 
										userController.edit);     // editar información de cuenta
router.put('/users/:userId(\\d+)',      sessionController.loginRequired, 
										sessionController.adminOrMyselfRequired, 
										userController.update);   // actualizar información de cuenta
router.delete('/users/:userId(\\d+)',   sessionController.loginRequired, 
										sessionController.adminAndNotMyselfRequired, 
										userController.destroy);  // borrar cuenta

// Definición de rutas de /quizzes
router.get('/quizzes',                     	quizController.index);
router.get('/quizzes/:quizId(\\d+)',       	quizController.show);
router.get('/quizzes/:quizId(\\d+)/check', 	quizController.check);
router.get('/quizzes/new',                 	sessionController.loginRequired, 
											quizController.new);
router.post('/quizzes',                    	sessionController.loginRequired, 
											quizController.create);
router.get('/quizzes/:quizId(\\d+)/edit',  	sessionController.loginRequired, 
										   	quizController.ownershipRequired, 
										   	quizController.edit);
router.put('/quizzes/:quizId(\\d+)',       	sessionController.loginRequired, 
											quizController.ownershipRequired, 
											quizController.update);
router.delete('/quizzes/:quizId(\\d+)',    	sessionController.loginRequired, 
											quizController.ownershipRequired, 
											quizController.destroy);
router.get('/quizzes/search' , quizController.search);


// Definición de rutas de comentarios
router.get('/quizzes/:quizId(\\d+)/comments/new',  sessionController.loginRequired, 
	                                               commentController.new);
router.post('/quizzes/:quizId(\\d+)/comments',     sessionController.loginRequired, 
	                                               commentController.create);
router.put('/quizzes/:quizId(\\d+)/comments/:commentId(\\d+)/accept', 
	                                               sessionController.loginRequired, 
	                                               quizController.ownershipRequired, 
	                                               commentController.accept);

router.get('/author', function(req, res, next){
	res.render('author', { link:'<a href="https://github.com/ibarriospal/quiz">Proyecto en github</a>',
		foto1: '<img src="foto.jpg">',
	})
});

module.exports = router;
