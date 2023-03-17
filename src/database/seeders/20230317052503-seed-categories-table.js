"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Back-end Technologies",
          position: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Front-end Technologies",
          position: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Development Tools",
          position: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Soft-skills",
          position: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Carrer",
          position: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
