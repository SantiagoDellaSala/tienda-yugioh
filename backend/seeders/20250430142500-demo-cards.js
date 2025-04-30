module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Cards', [
      {
        name: 'Blue-Eyes White Dragon',
        stars: 8,
        type: 'Dragon',
        image: 'url-imagen-blue-eyes',
        element: 'Light',
        description: 'A legendary dragon with immense power.',
        code: 'BEWD001',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Dark Magician',
        stars: 7,
        type: 'Spellcaster',
        image: 'url-imagen-dark-magician',
        element: 'Dark',
        description: 'The ultimate wizard in terms of attack and defense.',
        code: 'DM001',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Red-Eyes Black Dragon',
        stars: 7,
        type: 'Dragon',
        image: 'url-imagen-red-eyes',
        element: 'Dark',
        description: 'A fearsome dragon known for its attack power.',
        code: 'REBD001',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Summoned Skull',
        stars: 6,
        type: 'Fiend',
        image: 'url-imagen-summoned-skull',
        element: 'Dark',
        description: 'A monster summoned through dark rituals.',
        code: 'SS001',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Cards', null, {});
  },
};

