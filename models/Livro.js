const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = require('./User')

// User

const Livro = db.define('Livros', {
    

    title:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    }
    
    
    
})

Livro.belongsTo(User)
User.hasMany(Livro)


module.exports = Livro