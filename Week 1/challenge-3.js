const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {

    if (req.url === '/users/html') {
        const filePath = path.join(__dirname, 'files/users.txt');
        fs.readFile(filePath, 'utf8', (err, content) => {
            if (err) {
                console.error('Error reading users.txt file:', err);
                res.statusCode = 500;
                res.end('Internal Server Error');
                return;
            }

            const people = content.trim().split('\n').map(line => {
                const [firstName, lastName, dateOfBirth, country, interest] = line.split(', ');
                return { firstName, lastName, dateOfBirth, country, interest };
            });

            let html = '<div style="display: flex; gap: 20px;">';
            people.forEach(person => {
                html += `
          <div style="text-align:center; font-family: Tahoma, sans-serif; width: 300px; background-color: #96C9F4; border: 1px solid #d3d3d3; border-radius: 10px; padding: 20px; box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);">
            <img src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png" alt="profile of user" style="border-radius:50%; width:70px" />
            <h2 style="color: #333; font-size: 20px; margin-bottom: 10px;">${person.firstName} ${person.lastName}</h2>
            <p style="color: #555; font-size: 14px; margin: 5px 0;"><strong>Date of Birth:</strong> ${person.dateOfBirth}</p>
            <p style="color: #555; font-size: 14px; margin: 5px 0;"><strong>Country:</strong> ${person.country}</p>
            <p style="color: #555; font-size: 14px; margin: 5px 0;"><strong>Interest:</strong> ${person.interest}</p>
          </div>
        `;
            });
            html += '</div>';

            res.setHeader('Content-Type', 'text/html');
            res.end(html);
        });
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});