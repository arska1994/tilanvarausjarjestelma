var Yllapito = require('../models/yllapitoModel');
var mysql = require('mysql2');

// Näytä kirjautumissivu pyynnöllä GET
exports.yllapito_kirjautuminen_get = function (req, res) {
    if (req.session.yllapitoTunnus) {
        res.redirect('/varausjarjestelma/yllapito/etusivu');
    }
    else {
        res.render('yllapito_kirjaus_form', { title: 'Yllapito Kirjautuminen GET' });
    }
};

// Käsittele lomakkeen tiedot pyynnöllä POST
exports.yllapito_kirjautuminen_post = function (req, res) {

    // tarkista ettei kentät ole tyhjiä
    req.checkBody('tunnus', 'Tunnus vaaditaan.').notEmpty();
    req.checkBody('salasana', 'Salasana vaaditaan.').notEmpty();

    // trim ja escape kentille
    req.sanitize('tunnus').escape();
    req.sanitize('tunnus').trim();
    req.sanitize('salasana').escape();
    req.sanitize('salasana').trim();

    // suorita validointi
    var errors = req.validationErrors();

    // luo objekti siivotulla datalla
    var yllapito = new Yllapito(
        {
            tunnus: req.body.tunnus,
            salasana: req.body.salasana
        }
    );

    if (errors) {
        // Jos virhe, tulosta lomake uudelleen
        res.render('yllapito_kirjaus_form', { title: 'Yllapito Kirjautuminen POST', errors: errors });
        return;
    }
    else {
        // Tiedot ovat kunnossa
        console.log('jee tiedot kunnossa');
        Yllapito.findOne({
            where: {
                tunnus: req.body.tunnus,
                salasana: req.body.salasana
            }
        }).then(yllapitaja => {
            if (yllapitaja == null) {
                var viesti = 'Virheellinen tunnus tai salasana.';
                res.render('yllapito_kirjaus_form', { title: 'Yllapito Kirjautuminen POST', viesti: viesti });
            }
            else {
                // Tarvittaessa selainistunnon määrittelyt
                if (req.session.yllapito) {
                    res.redirect('/varausjarjestelma/yllapito/etusivu');
                } else {
                    req.session.yllapitoTunnus = yllapitaja.get('tunnus');
                    res.redirect('/varausjarjestelma/yllapito/etusivu');
                }
            }
        });
    }
};

// Näytä ylläpidon etusivu pyynnöllä GET
exports.yllapito_etusivu_get = function (req, res) {
    if (req.session.yllapitoTunnus) {
        res.render('yllapito_etusivu', { title: 'Ylläpidon sivut', nimi: req.session.yllapitoTunnus });
    } else {
        res.redirect('/varausjarjestelma/yllapito/kirjautuminen');
    }
}

// Näytä ylläpidon etusivu pyynnöllä GET
exports.yllapito_etusivu_post = function (req, res) {
    if (req.session.yllapitoTunnus) {
        req.session.destroy(function (err) { });
        res.redirect('/varausjarjestelma/yllapito/kirjautuminen');
    }
}