
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert(generateUser());
    });
};

let generateUser = () => {
  return [
    {
      username: 'Tiffany',
      password: 'blah123',
    },
    {
      username: 'Corey',
      password: 'blah456',
    },
    {
      username: 'Olivia',
      password: 'blah789',
    },
    {
      username: 'Ava',
      password: 'blah147',
    },
    {
      username: 'Tony',
      password: 'blah258',
    },
    {
      username: 'Tyson',
      password: 'blah369',
    },

  ]
}