const Sequelize = require('sequelize');

const sequelize = new Sequelize('tilanvaraus_ryhma_e', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const Asiakas = sequelize.define('asiakas', {
    etunimi: {
        type: Sequelize.STRING
    },
    sukunimi: {
        type: Sequelize.STRING
    },
    postiosoite: {
        type: Sequelize.STRING
    },
    postinumero: {
        type: Sequelize.STRING
    },
    postitoimipaikka: {
        type: Sequelize.STRING
    },
    puhelinnumero: {
        type: Sequelize.STRING
    },
    sahkoposti: {
        type: Sequelize.STRING
    }
}, {
        // älä lisää aikaleimaan liittyviä attribuutteja (updatedAt, createdAt)
        timestamps: false,

        // älä muokkaa tietokantataulua
        freezeTableName: true,

        // aseta taulun nimi
        tableName: 'asiakastiedot'
    });


module.exports = Asiakas;