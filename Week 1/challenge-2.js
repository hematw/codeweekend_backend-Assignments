const http = require('http');
const fs = require('fs');
const path = require('path');


const server = http.createServer((req, res) => {
    if (req.url === '/users/json') {
        const filePath = path.join(__dirname, 'files/users.txt');
        fs.readFile(filePath, 'utf8', (err, content) => {
            if (err) {
                console.error('Can NOT read users.txt file:', err);
                res.statusCode = 500;
                res.end('Can NOT read users.txt file');
                return;
            }

            const people = content.trim().split('\n').map(line => {
                const [firstName, lastName, dateOfBirth, country, interest] = line.split(', ');
                return { firstName, lastName, dateOfBirth, country, interest };
            });

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(people));
        });
    }

    else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});