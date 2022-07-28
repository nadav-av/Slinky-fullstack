"use strict";

//migration to update the sign up columns - unique email and user name
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Users", "email", {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    });
    await queryInterface.changeColumn("Users", "userName", {
      type: Sequelize.STRING,
      unique: true,npx sequelize-cli db:migrate
      allowNull: false,
    });
    await queryInterface.changeColumn("Users", "isAdmin", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Users", "email", {
      type: Sequelize.STRING,
      unique: false,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    });
    await queryInterface.changeColumn("Users", "userName", {
      type: Sequelize.STRING,
      unique: false,
      allowNull: true,
    });
    await queryInterface.changeColumn("Users", "isAdmin", {
      type: Sequelize.BOOLEAN,
      defaultValue: null,
    });
  },
};
