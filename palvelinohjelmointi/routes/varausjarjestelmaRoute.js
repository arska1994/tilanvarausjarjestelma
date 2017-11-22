var express = require('express');
var router = express.Router();

// Kontrollerit
var tila_controller = require('../controllers/tilaController');
var varaus_controller = require('../controllers/varausController');
var vahvistus_controller = require('../controllers/vahvistusController');
var yllapito_controller = require('../controllers/yllapitoController');


/// TILA REITITYKSET ///

// GET varausjärjestelmän kotisvu
router.get('/', tila_controller.indeksi);
// GET yksittäinen tila
router.get('/tila/:id', tila_controller.tila_detail);


/// VARAUS REITITYKSET ///

// GET varauksen luontiin
router.get('/varaus/create/:id', varaus_controller.varaus_create_get);
// POST varauksen luontiin
router.post('/varaus/create/:id', varaus_controller.varaus_create_post);


/// VAHVISTUS REITITYKSET ///

// GET vahvistuksen luontiin
router.get('/vahvistus/create/:id', vahvistus_controller.vahvistus_create_get);
// POST vahvistuksen luontiin
router.post('/vahvistus/create/:id', vahvistus_controller.vahvistus_create_post);


/// YLLAPITO REITITYKSET ///

// GET ylläpidon kirjautumissivu
router.get('/yllapito/kirjautuminen', yllapito_controller.yllapito_kirjautuminen_get);
// POST ylläpidon kirjautumissivu
router.post('/yllapito/kirjautuminen', yllapito_controller.yllapito_kirjautuminen_post);
// GET yllapidon etusivu
router.get('/yllapito/etusivu', yllapito_controller.yllapito_etusivu_get);
// POST yllapidon etusivu
router.post('/yllapito/etusivu', yllapito_controller.yllapito_etusivu_post);

module.exports = router;
