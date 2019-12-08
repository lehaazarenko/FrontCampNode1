const express = require('express'),
      app = express(),
      router = express.Router(),
      fs = require('fs'),
      bodyParser = require('body-parser')
      mongoose = require('mongoose')
      url = 'mongodb://localhost:27017',
      dbName = 'news';

mongoose.connect(`${url}/${dbName}`, { useNewUrlParser: true });

const newsSchema = new mongoose.Schema({
    id: Number,
    author: String,
    title: String,
    description: String,
    content: String
});

const News = mongoose.model('News', newsSchema);

let news;

fs.readFile('news.json', (err, data) => {
    if (err) throw err;
    news = JSON.parse(data).articles;
});

router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', null);
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

router.get('/mongo/news', (req, res) => {
    News.find({}, (error, news) => {
        if (error) throw new Error(error);
        res.json(news);
    });
});

router.get('/mongo/news/:id', (req, res) => {
    News.findOne({ id: req.params.id }).then(result => {
        res.json(result);
    }).catch(error => {
        throw new Error(error);
    })
});

router.put('/mongo/news/add', (req, res) => {
    News.find({}, (error, news) => {
        if (error) throw new Error(error);
        const ids = news.map(item => item.id);
        const itemId = Math.max(...ids) + 1 || 0;
        const item = req.body;
        item.id = itemId;
        News.create(item, (error, result) => {
            if (error) throw new Error(error);
            res.send('News item added');
        });
    });
});

router.post('/mongo/news/edit/:id', (req, res) => {
    News.findOneAndUpdate({ id: req.params.id }, req.body)
        .then(result => {
            res.json('News item edited');
        })
        .catch(error => {
            throw new Error(error);
        });
});

router.delete('/mongo/news/delete/:id', (req, res) => {
    News.findOneAndRemove({ id: req.params.id })
        .then(result => res.send('News item deleted'))
        .catch(error => { throw new Error(error); });
});

router.get('/news', (req, res) => {
    res.json(news);
});

router.post('/news', (req, res) => {
    res.json(news);
});

router.get('/news/:id', (req, res) => {
    const id = req.params.id;
    const item = news.filter(item => item.id.toString() === id)[0];
    if (item) {
        res.json(item); 
    } else {
        throw new Error('No item with id: ' + id);
    }
});

router.post('/news/edit/:id', (req, res) => {
    const editProps = req.body;
    const id = req.params.id;
    const item = news.filter(item => item.id.toString() === id)[0];
    for (prop in editProps) {
        item[prop] = editProps[prop];
    }
    res.send('News item edited');
});

router.put('/news/add', (req, res) => {
    const ids = news.map(item => item.id);
    const itemId = Math.max(...ids) + 1 || 0;
    const item = req.body;
    item.id = itemId;
    news.push(item);
    res.send('News item added');
});

router.delete('/news/delete/:id', (req, res) => {
    const id = req.params.id;
    const item = news.find(item => item.id.toString() === id);
    if (item) {
        news.splice(news.indexOf(item), 1);
        res.send('Item deleted');    
    } else {
        throw new Error('No item with id: ' + id);
    }
});

function logErrors (err, req, res, next) {
    console.error(err.stack)
    next(err)
}

function errorHandler (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something went wrong!')
}

app.use(bodyParser.json());
app.use('/', router);

app.use(logErrors);
app.use(errorHandler);

app.listen(3001, () => console.log('Application started on port 3001'));
