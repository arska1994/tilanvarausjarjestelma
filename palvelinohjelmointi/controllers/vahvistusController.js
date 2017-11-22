var Varaus = require('../models/varausModel');
var Asiakas = require('../models/asiakasModel');
var mysql = require('mysql2');

// Näytä vahvistus create pyynnöllä GET
exports.vahvistus_create_get = function (req, res) {

    if (req.session.varaus && req.session.asiakas) {

        var varaus = new Varaus(
            {
                kesto: req.session.varaus.kesto,
                paivamaara: req.session.varaus.paivamaara,
                maksuId: "lorem ipsum",
                korttitunnus: "lorem ipsum",
                maksutapa: req.session.varaus.maksutapa
            }
        );
        var asiakas = new Asiakas(
            {
                etunimi: req.session.asiakas.etunimi,
                sukunimi: req.session.asiakas.sukunimi,
                postiosoite: req.session.asiakas.postiosoite,
                postinumero: req.session.asiakas.postinumero,
                postitoimipaikka: req.session.asiakas.postitoimipaikka,
                puhelinnumero: req.session.asiakas.puhelinnumero,
                sahkoposti: req.session.asiakas.sahkoposti
            }
        );

        //res.setHeader('Content-Type', 'text/html')
        //res.write('<p>varaus.kesto: ' + varaus.kesto + '</p>')
        //res.write('<p>varaus.kesto: ' + varaus.paivamaara + '</p>')
        //res.write('<p>varaus.kesto: ' + varaus.maksutapa + '</p>')
        //res.write('<p>varaus.kesto: ' + asiakas.etunimi + '</p>')
        //res.write('<p>varaus.kesto: ' + asiakas.sukunimi + '</p>')
        //res.write('<p>varaus.kesto: ' + asiakas.postitoimipaikka + '</p>')
        res.render('vahvistus_sivu', { title: 'Tietojen vahvistus GET', valittuTilaId: req.params.id, asiakas: asiakas, varaus: varaus });
        //res.end();
    }

};

// Käsittele vahvistus create pyynnöllä POST 
exports.vahvistus_create_post = function (req, res) {

    // Tarkista onko Asiakas jo olemassa
    Asiakas.findOrCreate({
        where: {
            etunimi: req.body.etunimi,
            sukunimi: req.body.sukunimi,
            postiosoite: req.body.postiosoite,
            postinumero: req.body.postinumero,
            postitoimipaikka: req.body.postitoimipaikka,
            puhelinnumero: req.body.puhelinnumero,
            sahkoposti: req.body.sahkoposti
        }
    })
        .spread((asiakas, luotuAiemmin) => {
            // console.log(asiakas.get({ plain: true }));
            // console.log(luotuAiemmin);
            asiakasId = asiakas.get('id');

            Varaus.findOrCreate({
                where: {
                    tilaId: req.params.id,
                    asiakasId: asiakasId,
                    kesto: req.body.kesto,
                    paivamaara: req.body.paivamaara,
                    maksuId: "lorem ipsum",
                    korttitunnus: "lorem ipsum",
                    maksutapa: req.body.maksutapa
                }
            })
                .spread((varaus, luotuAiemmin) => {
                    // console.log(varaus.get({ plain: true }));
                    // console.log(luotuAiemmin);
                    req.session.destroy(function (err) { });
                    res.redirect('/varausjarjestelma/');
                });

        });

};