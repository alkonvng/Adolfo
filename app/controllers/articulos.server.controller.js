'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
    Blog = mongoose.model('Blog'),
	Articulo = mongoose.model('Articulo'),
	_ = require('lodash');

/**
 * Create a Articulo
 */
exports.create = function(req, res) {
	var articulo = new Articulo(req.body);
	articulo.user = req.user;
    articulo.blog = req.user._doc.blog;

    Blog.findById(req.user._doc.blog,function(err,blog){
        if(err) return err;
        articulo.blog = blog;
        blog.articulos.push(articulo);
        blog.save(function(err){
            return err;
        });

    });
	articulo.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(articulo);
		}
	});
};

/**
 * Show the current Articulo
 */
exports.read = function(req, res) {
	res.jsonp(req.articulo);
};

/**
 * Update a Articulo
 */
exports.update = function(req, res) {
	var articulo = req.articulo ;

	articulo = _.extend(articulo , req.body);

	articulo.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(articulo);
		}
	});
};

/**
 * Delete an Articulo
 */
exports.delete = function(req, res) {
	var articulo = req.articulo ;

	articulo.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(articulo);
		}
	});
};

/**
 * List of Articulos
 */
exports.list = function(req, res) { 
	Articulo.find({user :req.user._doc._id }).sort('-created').populate('user', 'displayName').exec(function(err, articulos) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(articulos);
		}
	});
};

/**
 * Articulo middleware
 */
exports.articuloByID = function(req, res, next, id) { 
	Articulo.findById(id).populate('user', 'displayName').exec(function(err, articulo) {
		if (err) return next(err);
		if (! articulo) return next(new Error('Failed to load Articulo ' + id));
		req.articulo = articulo ;
		next();
	});
};

/**
 * Articulo authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.articulo.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
