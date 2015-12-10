var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Contato = require('./models/contatos');

//conection database mongodb
var connstr = 'mongodb://localhost/apptanamaodb';
//var connstr = 'mongodb://danilopaixao:88878685@ds057254.mongolab.com:57254/apptanamaodb';

mongoose.connect(connstr, function(err){
	if(err){
		console.log('Error connect database: '+ err);
	}else{
		console.log('DataBase connected');
	}
});

app.use(bodyParser());

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function(req, res){
	res.json({message: 'API is running'});
});

router.route('/contatos')
.get(function(req, res){
	Contato.find(function(err, data){
		if(err){
			res.send(err);
		}else{
			res.json(data);
		}
	});
	//res.json({message: 'Contatos GET'});
})
.post(function(req, res){
	var model = new Contato();
	model.nome = req.body.nome;
	model.save(function(err){
		if(err){
			res.send(err);
		}
		res.json({message:'Contact registed successful'});
	})
	//res.json({message: 'Contatos POST'});
});

router.route('/contatos/:id')
	.get(function(req, res){
		Contato.findById(req.params.id, function(err, data){
				if(err){
					res.send(err);
				}else{
					res.json(data);
				}
			});
		//res.json({message: 'Contatos get ID'});
	})
	.put(function(req, res){
		Contato.findById(req.params.id, function(err, data){
				if(err){
					res.send(err);
				}else{
					data.nome = req.body.nome;
					data.save(function(err){
						if(err){
							res.send(err);
						}else{
							res.json(data);
						}
					});
				}
			});
		//res.json({message: 'Contatos put ID'});
	})
	.delete(function(req, res){
		Contato.remove({_id: req.params.id}, function(err, data){
				if(err){
					res.send(err);
				}else{
					res.json({message: 'Contact deleted successful'});
				}
			});
		//res.json({message: 'Contatos delete ID'});
	});

app.use('/api', router);

app.listen(port, function(){
	console.log('Server is running: '+ port);
});