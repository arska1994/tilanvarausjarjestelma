var Varaus = require('../models/varausModel');
var Asiakas = require('../models/asiakasModel');
var mysql = require('mysql2');

// Näytä varaus create pyynnöllä GET
exports.varaus_create_get = function (req, res, next) {
    var valittuTilaId = req.params.id;
    res.render('varaus_form', { title: 'Varauslomake GET', valittuTilaId: req.params.id });
};

// Käsittele varaus create pyynnöllä POST
exports.varaus_create_post = function (req, res, next) {
    var asiakasId;

    // Tarkista ettei kentät ole tyhjiä
    req.checkBody('etunimi', 'Etunimi vaaditaan.').notEmpty();
    req.checkBody('sukunimi', 'Sukunimi vaaditaan.').notEmpty();
    req.checkBody('postiosoite', 'Postiosoite vaaditaan.').notEmpty();
    req.checkBody('postinumero', 'Postinumero vaaditaan.').notEmpty();
    req.checkBody('postitoimipaikka', 'Postitoimipaikka vaaditaan.').notEmpty();
    req.checkBody('puhelinnumero', 'Puhelinnumero vaaditaan.').notEmpty();
    req.checkBody('sahkoposti', 'Sähköposti vaaditaan.').notEmpty();

    req.checkBody('kesto', 'Varauksen kesto vaaditaan.').notEmpty();
    req.checkBody('paivamaara', 'Päivämäärä vaaditaan.').notEmpty();
    req.checkBody('maksutapa', 'Maksutapa vaaditaan.').notEmpty();

    // trim ja escape kentille
    req.sanitize('etunimi').escape();
    req.sanitize('etunimi').trim();
    req.sanitize('sukunimi').escape();
    req.sanitize('sukunimi').trim();
    req.sanitize('postiosoite').escape();
    req.sanitize('postiosoite').trim();
    req.sanitize('postinumero').escape();
    req.sanitize('postinumero').trim();
    req.sanitize('postitoimipaikka').escape();
    req.sanitize('postitoimipaikka').trim();
    req.sanitize('puhelinnumero').escape();
    req.sanitize('puhelinnumero').trim();
    req.sanitize('sahkoposti').escape();
    req.sanitize('sahkoposti').trim();

    req.sanitize('kesto').escape();
    req.sanitize('kesto').trim();
    req.sanitize('paivamaara').escape();
    req.sanitize('paivamaara').trim();
    req.sanitize('maksutapa').escape();
    req.sanitize('maksutapa').trim();


    // Suorita validointi
    var errors = req.validationErrors();

    // Luo objektit trimmatuilla ja escapetuilla tiedoilla
    var asiakas = new Asiakas(
        {
            etunimi: req.body.etunimi,
            sukunimi: req.body.sukunimi,
            postiosoite: req.body.postiosoite,
            postinumero: req.body.postinumero,
            postitoimipaikka: req.body.postitoimipaikka,
            puhelinnumero: req.body.puhelinnumero,
            sahkoposti: req.body.sahkoposti
        }
    );
    var varaus = new Varaus(
        {
            kesto: req.body.kesto,
            paivamaara: req.body.paivamaara,
            maksuId: "lorem ipsum",
            korttitunnus: "lorem ipsum",
            maksutapa: req.body.maksutapa
        }
    );

    if (errors) {
        // Jos virhe, tulosta lomake uudelleen lähetetyillä tiedoilla
        res.render('varaus_form', { title: 'Varauslomake POST', varaus: varaus, asiakas: asiakas, errors: errors });
        return;
    }
    else {
        // Tiedot ovat kunnossa
        if (req.session.varaus && req.session.asiakas) {
            res.redirect('/varausjarjestelma/vahvistus/create/' + req.params.id);
        } else {
            req.session.varaus = varaus;
            req.session.asiakas = asiakas;
            res.redirect('/varausjarjestelma/vahvistus/create/' + req.params.id);
        }
    }
};