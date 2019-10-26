module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gymstar',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
