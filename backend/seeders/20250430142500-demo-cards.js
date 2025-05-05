module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Cards', [
      {
        name: 'Blue-Eyes White Dragon',
        stars: 8,
        type: 'Dragon',
        image: '../public/blue-eyes-white-dragon.jpg',
        element: 'Light',
        description: 'A legendary dragon with immense power.',
        code: 'BEWD001',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Cards', null, {});
  },
};
