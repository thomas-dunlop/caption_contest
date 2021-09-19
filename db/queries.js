const env = process.env.NODE_ENV || 'development';
const Sequelize = require('sequelize');
const { resourceLimits } = require('worker_threads');
const config = require(__dirname + '/../config/database.json')[env];
const bcrypt = require('bcrypt');

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const Image = sequelize.define('Image', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      file: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
})

const Caption = sequelize.define('Caption', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    caption: {
        type: Sequelize.STRING
    },
    createdAt: {
        allowNull: false,
        type: Sequelize.DATE
    },
    updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
    }, 

    user_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Users', 
            key: 'id'}
    }, 
    image_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Images', 
          key: 'id'}
    }
})

const User = sequelize.define('User', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      hashed_password: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
})

// Image Functions 
async function getAllImages() {
    const result = await Image.findAll();
    return result;  
}

async function getSpecificImage(imgId) {
    const imageResult = await Image.findAll({
        where: {
            id: imgId
        }
    })
    const captionResult = await Caption.findAll({
        where: {
            image_id: imgId
        }
    })
    return {imageResult, captionResult};
}

// Caption Functions
async function addCaption(user, caption, img) {
    const result = Caption.create({
        caption: caption,
        createdAt: new Date(),
        updatedAt: new Date(),
        user_id: user,
        image_id: img
    })
    return result;
}

// User Functions 
async function findUser(email) {
    const result = await User.findOne({where: {email: email}});
    if (result) {
        return result;
    } else {
        return null;
    }
}

async function findUserById(id) {
    const result = await User.findOne({where: {id: id}});
    if (result) {
        return result;
    } else {
        return null;
    }
}

async function createUser(email, password) {
    const hash = await bcrypt.hash(password, 10);
    const result = await User.create({
        hashed_password: hash,
        email: email,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    return result;
}

module.exports = {
    Image: Image,
    Caption: Caption,
    getAllImages: getAllImages,
    getSpecificImage: getSpecificImage,
    addCaption: addCaption,
    findUser: findUser,
    createUser: createUser,
    findUserById: findUserById
}