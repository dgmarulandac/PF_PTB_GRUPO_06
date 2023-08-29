require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_URL_DEPLOY,
} = process.env;


const sequelize = new Sequelize(`${DB_URL_DEPLOY}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed,
  dialectOptions: {
    ssl: {
      require: true
    }
  }
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Event, Role, Sale, User, Review, InvalidToken, Order } = sequelize.models;

// Aca vendrian las relaciones

User.belongsToMany(Role, {through: "User_Role"}); 
Role.belongsToMany(User, {through: "User_Role"});

User.hasMany(Event, {foreignKey: 'idSeller'});
Event.belongsTo(User, {foreignKey: 'idSeller'});

Event.hasMany(Order, {foreignKey: 'idEvent'});
Order.belongsTo(Event, {foreignKey: 'idEvent'});

User.hasMany(Order, {foreignKey: 'idBuyer'});
Order.belongsTo(User, {foreignKey: 'idBuyer'});

Order.hasOne(Sale, {foreignKey: 'idOrder'});
Sale.belongsTo(Order, {foreignKey: 'idOrder'});

Review.hasMany(User, {foreignKey: 'idUser'});
User.belongsTo(Review, {foreignKey: 'idUser'});

Event.hasMany(Review, {foreignKey: 'idEvent'});
Review.belongsTo(Event, {foreignKey: 'idEvent'});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};