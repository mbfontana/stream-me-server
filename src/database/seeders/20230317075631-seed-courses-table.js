"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const [categories] = await queryInterface.sequelize.query(
      "SELECT id FROM categories"
    );
    await queryInterface.bulkInsert("courses", [
      {
        name: "Full-stack Javascript Developer",
        synopsis:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        featured: true,
        category_id: categories[0].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Learning Ruby",
        synopsis:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        category_id: categories[0].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Microservices with Node.js",
        synopsis:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        featured: true,
        category_id: categories[0].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Creating Professional APIs with ruby on Rails",
        synopsis:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        featured: true,
        category_id: categories[0].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "TDD: Testing APIs with Node.js",
        synopsis:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        featured: true,
        category_id: categories[0].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "TDD: Testing React Applications",
        synopsis:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        featured: true,
        category_id: categories[1].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Front-end Specialist: Vue.js",
        synopsis:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        category_id: categories[1].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Creating 3D Websites and Apps with Three.js",
        synopsis:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        category_id: categories[1].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Learning Bootstrap 5",
        synopsis:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        category_id: categories[1].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Visual Studio Code for Javascript Developers",
        synopsis:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        category_id: categories[2].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Linux Shell Commands: A Complete Guide",
        synopsis:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        category_id: categories[2].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Team Work and Assertive Communication",
        synopsis:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        category_id: categories[3].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Digital Nomad",
        synopsis:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        featured: true,
        category_id: categories[4].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "A Guide to Freelancer Development",
        synopsis:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        category_id: categories[4].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("courses", null, {});
  },
};
