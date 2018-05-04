const Sequelize = require('sequelize');

const db = new Sequelize(`postgres://localhost:5432/trip-planner`, {logging: false})

Place = db.define('place',{
  address: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  phone: Sequelize.STRING,
  location: Sequelize.ARRAY(Sequelize.FLOAT)
})
Hotel = db.define('hotel',{
  name: Sequelize.STRING,
  num_stars: Sequelize.INTEGER,
  amenities: Sequelize.TEXT
})
Activity = db.define('activity',{
  name: Sequelize.STRING,
  age: Sequelize.RANGE(Sequelize.STRING)
})

Restaurant = db.define('restaurant', {
  name: Sequelize.STRING,
  cuisine: Sequelize.STRING,
  price: Sequelize.INTEGER
})

Hotel.belongsTo(Place);
Restaurant.belongsTo(Place);
Activity.belongsTo(Place);

module.exports = {
  db,
  Hotel,
  Restaurant,
  Activity
};
