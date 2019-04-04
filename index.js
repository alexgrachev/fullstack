const app = require('./app')

const  port = process.env.PORT || 5000

  // Маршрутизируем GET-запрос http://ваш_сайт/test
  app.get('/test', (req, res) => {
    res.send('Тест index.js');
  });


app.listen(port, () => console.log(`Server has been started on ${port} ... `))
