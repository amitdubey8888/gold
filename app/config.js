const URL = 'http://localhost:8080/api/'; // Local Server
// const URL = 'http://:8080/api/'; // Development Server

module.exports = {
    'secret': 'thisismysecret',
    'database': 'mongodb://gold:gold@ds121999.mlab.com:21999/gold',
    'SERVER_URL': URL
};

