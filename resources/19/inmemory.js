const express = require('express');
const YAML = require('yamljs');
const OpenApiValidator = require('express-openapi-validator');

const app = express();
app.use(express.json());

const apiSpec = '../resources/19/swagger.yml';
const users = [];

app.use('/spec', express.static(apiSpec));
app.use(OpenApiValidator.middleware({ apiSpec, validateRequests: true, }));
app.use((err, req, res, next) => {
    // Validator hibák itt elérhetők
    if (err.status && err.errors) {
        return res.status(err.status).json({
            message: err.message,
            errors: err.errors,
        });
    }
    next(err);
});

app.post('/users', (req, res) => {
    const user = { id: users.length + 1, ...req.body };
    users.push(user);
    res.status(201).json(user);
});

app.get('/users', (req, res) => {
    res.json(users);
});

app.listen(3000, () => console.log('Listening on port 3000'));