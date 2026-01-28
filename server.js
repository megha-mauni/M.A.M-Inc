const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;

// Serve static files from the project root
app.use(express.static(path.join(__dirname), {
    setHeaders: (res, filePath) => {
        // Set correct MIME type for .glb files
        if (filePath.endsWith('.glb')) {
            res.setHeader('Content-Type', 'model/gltf-binary');
        }
    }
}));

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`M.A.M.Inc server running at http://localhost:${PORT}`);
});
