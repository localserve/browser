import { existsSync, readdirSync, stat, lstatSync } from 'node:fs';

function isFile(p) {
    return existsSync(p) && lstatSync(p).isFile();
}

function isDir(p) {
    return existsSync(p) && lstatSync(p).isDirectory();
}

function handleDir(app) {
    app.post("/dir", (req, res) => {
        const path = req.body.path;
        if (!path) {
            res.json({ error: "ERROR: path param is empty.", dirs: [], files: [], path });
            return;
        }

        if (isDir(path)) {
            const items = readdirSync(path);
            const files = items.filter(f => isFile(path + "/" + f));
            const dirs = items.filter(d => isDir(path + "/" + d));
            res.json({ error: null, dirs, files, path });
            return;
        }

        res.json({ error: "ERROR: why are we here? get:dir::path" });
    });
}

export { handleDir }
