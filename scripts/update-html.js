// filepath: /cast-site/cast-site/scripts/update-html.js

const fs = require('fs');
const path = require('path');

// Directory containing HTML files
const htmlDirectory = path.join(__dirname, '..');

// Function to update HTML files
function updateHtmlFiles() {
    // List of HTML files to update
    const htmlFiles = [
        'index.html',
        'presentation.html',
        'inspiration.html',
        'gallery.html',
        'engagements.html',
        'dashboard.html',
        'contact.html'
    ];

    htmlFiles.forEach(file => {
        const filePath = path.join(htmlDirectory, file);
        
        // Read the HTML file
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading file ${file}:`, err);
                return;
            }

            // Perform updates (example: updating footer year)
            const updatedData = data.replace(/&copy; \d{4}/, '&copy; ' + new Date().getFullYear());

            // Write the updated content back to the file
            fs.writeFile(filePath, updatedData, 'utf8', (err) => {
                if (err) {
                    console.error(`Error writing file ${file}:`, err);
                } else {
                    console.log(`Successfully updated ${file}`);
                }
            });
        });
    });
}

// Execute the update function
updateHtmlFiles();