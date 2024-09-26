const Sequelize = require('sequelize')
const configdb = require('./configdb')
const connection = new Sequelize(configdb)

const Users = require('../models/Users')
const Sectors = require('../models/Sectors')
const Documents = require('../models/Documents')
const Privileges = require('../models/Privileges')
const Companys = require('../models/Companys')
const Arquivos = require('../models/Arquivos')
const TypeDocuments = require('../models/Type_documents')
const Status = require('../models/Status')
const Corridors = require('../models/Corridors');
const Shelfs = require('../models/Racks') 
const Boxes = require('../models/Boxes')

//connection.sync({force:true})

Documents.init(connection)
Users.init(connection)
Privileges.init(connection)
Sectors.init(connection)
Companys.init(connection)
Arquivos.init(connection)
TypeDocuments.init(connection)
Status.init(connection)
Corridors.init(connection)
Shelfs.init(connection)
Boxes.init(connection)


Users.associate(connection.models)
Sectors.associate(connection.models)
Privileges.associate(connection.models)

try {
    connection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  module.exports = connection