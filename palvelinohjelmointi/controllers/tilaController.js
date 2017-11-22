var Tila = require('../models/tilaModel');
const Sequelize = require('sequelize');

// Näytä etusivu (kaikki tilat)
exports.indeksi = function (req, res) {
    Tila.findAll({ attributes: ['id', 'nimi', 'kuvausteksti'] }).then(tilat => {
        res.render('index', { title: 'XAMK Tilanvaraus', data: tilat });
    });
};

// Näytä yksittäisen tilan sivu (id)
exports.tila_detail = function (req, res) {
    Tila.findAll({ where: { id: req.params.id } }).then(tilat => {
        res.render('tila_tiedot', { title: tilat[0].nimi, data: tilat[0] });
    });
};
