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

const Tila = sequelize.define('tila', {
    nimi: {
        type: Sequelize.STRING
    },
    kuvausteksti: {
        type: Sequelize.STRING
    },
    koko: {
        type: Sequelize.INTEGER
    },
    sijainti: {
        type: Sequelize.STRING
    },
    laitteet: {
        type: Sequelize.STRING
    },
    hinta: {
        type: Sequelize.INTEGER
    },
    saatavuus: {
        type: Sequelize.BOOLEAN
    },
    palveluId: {
        type: Sequelize.INTEGER
    }
}, {
        // älä lisää aikaleimaan liittyviä attribuutteja (updatedAt, createdAt)
        timestamps: false,

        // älä muokkaa tietokantataulun nimeä
        freezeTableName: true,

        // aseta taulun nimi
        tableName: 'tilatiedot'
    });


module.exports = Tila;
