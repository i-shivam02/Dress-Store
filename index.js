require("./models/mongoose");
const express = require('express')
const product = require("./models/product");
const category = require("./models/category");

const app = express()

app.use(express.json());


app.get('/api/products', function (req, res) {
    var filter = {};
    if(req.query.name)
    {
        filter = {"name": {$regex : req.query.name}};
    }
    
    product.find(filter)
        .then((ps) => {
            if (!ps || ps.length == 0) {
                return res.status(404).send(`No Products found`);
            }
            res.status(200).send(ps);
        })
        .catch((e) => {
            res.status(500).send(e.message);
        });
})

app.get('/api/products/:id', function (req, res) {
    product.findById(req.params.id)
        .then((p) => {
            if (!p) {
                return res.status(404).send(`Product with ID:${req.params.id} not found`);
            }
            res.status(200).send(p);
        })
        .catch((e) => {
            res.status(500).send(e.message);
        });
})

app.post('/api/products', function (req, res) {
    const newProduct = new product(req.body);

    newProduct.save()
        .then((p) => {
            res.status(201).send(p);
        })
        .catch((e) => {
            res.status(400).send(e.message);
        });
})

app.put('/api/products/:id', function (req, res) {
    product.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then((p) => {
            if (!p) {
                return res.status(404).send(`Product with ID:${req.params.id} not found`);
            }
            res.status(200).send(p);
        })
        .catch((e) => {
            res.status(500).send(e.message);
        });
})

app.delete('/api/products/:id', function (req, res) {
    product.findByIdAndDelete(req.params.id, req.body)
        .then((p) => {
            if (!p) {
                return res.status(404).send(`Product with ID:${req.params.id} not found`);
            }
            res.status(200).send("Deleted Successfully");
        })
        .catch((e) => {
            res.status(500).send(e.message);
        });
})

app.delete('/api/products', function (req, res) {
    product.deleteMany({})
        .then((p) => {
            if (!p) {
                return res.status(404).send(`Product with ID:${req.params.id} not found`);
            }
            res.status(200).send("All Products Deleted Successfully");
        })
        .catch((e) => {
            res.status(500).send(e.message);
        });
})

app.get('/api/products?name=[kw]', function (req, res) {
    product.where()
})



app.listen(3000, (req, res) => {
    console.log("Application is up and available at port : 3000");
})