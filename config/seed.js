require('dotenv').config();
require('./database');

const Category = require('../models/category');
const Item = require('../models/item');

(async function() {

  await Category.deleteMany({});
  const categories = await Category.create([
    {name: 'Programmers', sortOrder: 10},
    {name: 'Programs', sortOrder: 20},
    {name: 'Videos', sortOrder: 30},
    {name: 'CheatSheets', sortOrder: 40},
    {name: 'Languages', sortOrder: 50},
    {name: 'Desserts', sortOrder: 60},
    {name: 'Drinks', sortOrder: 70},
  ]);

  await Item.deleteMany({});
  const items = await Item.create([
    { name: 'Arthur', emoji: '/img/Arthur.png', category: categories[0]._id, price: 1000.95, github: 'https://github.com/arthurbernierjr' },
    { name: 'Josh', emoji: '/img/Josh.png', category: categories[0]._id, price: 400.95, github: 'https://github.com/yourusername/yourproject' },
    {name: 'Teo', emoji:'/img/Teo.png', category: categories[0], price: 300.95, github: 'https://github.com/yourusername/yourproject' },
    {name: 'Bryce', emoji: '/img/Bryce.jpg', category: categories[0], price: 13.95, github: 'https://github.com/brycesexton' },
    {name: 'Tyler', emoji: '/img/Tyler.png', category: categories[0], price: 25.95, github: 'https://github.com/tylerpierson/' },
    {name: 'Danny', emoji: '/img/Danny.jpg', category: categories[0], price: 25.99, github: 'https://github.com/dwheeler7' },
    {name: 'Jalen', emoji: '/img/Jalen.png', category: categories[0], price: 9.95, github: 'https://github.com/jalensmith17' },
    {name: 'Jeremy', emoji: '/img/Jeremy.png', category: categories[0], price: 5.95, github: 'https://github.com/Jcasanova1990/' },
    {name: 'Juan', emoji: '/img/juan.png', category: categories[0], price: 7.95, github: 'https://github.com/zjuan4101/' },
    {name: 'William', emoji: '/img/william.jpg', category: categories[0], price: 0.95, github: 'https://github.com/willikoski/' },
    {name: 'BlackJack Code', emoji: '/img/Blackjack.jpg', category: categories[1], price: 19.95, github: 'https://github.com/willikoski/Blackjack' },
    {name: 'Tip Splitter Code', emoji: '/img/TipSplitter.png', category: categories[1], price: 14.95, github: 'https://github.com/willikoski/HourlyCalculator' },
    {name: 'BookMarker Code', emoji: '/img/Bookmarks.png', category: categories[1], price: 14.95, github: 'https://github.com/willikoski/bookmarks' },
    {name: 'Rick Roll', emoji: '/img/RickRoll.jpg', category: categories[2], price: 0.00, github: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    {name: 'Willikoski Twitch', emoji: '/img/william.jpg', category: categories[2], price: 0.00, github: 'https://www.twitch.tv/willikoski' },
    {name: 'Arthur Youtube', emoji: '/img/Arthur.png', category: categories[2], price: 0.00, github: 'https://www.youtube.com/@bigpoppacode' },
    {name: 'Arthur PM2 ', emoji: '/img/Arthur.png', category: categories[3], price: 10.00, github: 'https://liberty.sfs-flex.com/cheatsheets/pm2/' },
    {name: 'Arthur React ', emoji: '/img/Arthur.png', category: categories[3], price: 10.00, github: 'https://liberty.sfs-flex.com/cheatsheets/react/' },
    {name: 'Arthur Router', emoji: '/img/Arthur.png', category: categories[3], price: 10.00, github: 'https://liberty.sfs-flex.com/cheatsheets/react-router/' },
    {name: 'Arthur Deployment', emoji: '/img/Arthur.png', category: categories[3], price: 10.00, github: 'https://liberty.sfs-flex.com/cheatsheets/cloud-deployment/' },
    {name: 'Arthur Coffee Script', emoji: '/img/Arthur.png', category: categories[4], price: 999999.00, github: 'https://github.com/arthurbernierjr/coffeescript' },
  ]);

  console.log(items)

  process.exit();

})();