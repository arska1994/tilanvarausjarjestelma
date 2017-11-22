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

const Yllapito = sequelize.define('yllapito', {
    tunnus: {
        type: Sequelize.STRING
    },
    salasana: {
        type: Sequelize.STRING
    }
}, {
        // älä lisää aikaleimaan liittyviä attribuutteja (updatedAt, createdAt)
        timestamps: false,

        // älä muokkaa tietokantataulun nimeä
        freezeTableName: true,

        // aseta taulun nimi
        tableName: 'yllapitotiedot'
    });


module.exports = Yllapito;
