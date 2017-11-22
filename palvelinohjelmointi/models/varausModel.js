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

const Varaus = sequelize.define('varaus', {
    tilaId: {
        type: Sequelize.INTEGER
    },
    asiakasId: {
        type: Sequelize.INTEGER
    },
    kesto: {
        type: Sequelize.INTEGER
    },
    paivamaara: {
        type: Sequelize.STRING
    },
    maksuId: {
        type: Sequelize.STRING
    },
    korttitunnus: {
        type: Sequelize.STRING
    },
    maksutapa: {
        type: Sequelize.STRING
    }
}, {
        // älä lisää aikaleimaan liittyviä attribuutteja (updatedAt, createdAt)
        timestamps: false,

        // älä muokkaa tietokantataulun nimeä
        freezeTableName: true,

        // aseta taulun nimi
        tableName: 'varaustiedot'
    });


module.exports = Varaus;