import { promisify } from "node:util";
import { exec as syncExec } from "node:child_process";
const exec = promisify(syncExec);

async function dockerCommand(command) {
    // console.log(`docker command: ${command}`);

    try {
        const { stdout, stderr } = await exec(command);
        if (stdout.length === 0 || stderr.includes("not found")) {
            return "";
        }
        return stdout;
    }
    catch (e) {
        console.error({e, command});
        return "";
    }
}

async function getDockerImages() {
    return dockerCommand("docker images");
}

async function getAllDockerContainers() {
    return dockerCommand("docker ps --all");
}

async function getDockerVersion() {
    return dockerCommand("docker --version");
}

async function checkDocker() {
    return dockerCommand("docker --version");
}

function handleDocker(app) {
    app.get("/docker/", async (_, res) => {
        try {
            if (await checkDocker()) {
                const version = await getDockerVersion();
                const images = await getDockerImages();
                const containers = await getAllDockerContainers();
                const error = null;
                const out = { version, images, containers, error };
                res.json(out);
            }
            else {
                res.json({ images: "", containers: "", version: "", error: "Docker not found." });
            }
        }
        catch (e) {
            console.error(e);
            res.json({ error: e.message });
        }
    });

    app.post("/docker", async (req, res) => {
        try {
            if (await checkDocker()) {
                const { format: requestedFormat } = req.body;
                const format = requestedFormat === "json" ? "--format json" : "";
                const version = await dockerCommand(`docker --version`);
                let images = await dockerCommand(`docker images ${format}`);
                let containers = await dockerCommand(`docker ps --all ${format}`);
                const error = null;
                if (requestedFormat === "json") {
                    images = images.split('\n').filter(i => i).map(v => JSON.parse(v));
                    containers = containers.split('\n').filter(i => i).map(v => JSON.parse(v));
                }
                // console.log({ images, containers });
                res.json({ error, version, images, containers });
            } else {
                res.json({ images: "", containers: "", version: "", error: "Docker not found." });
            }
        }
        catch (e) {
            console.error(e);
            res.json({ error: e.message });
        }
    });
}

export { handleDocker };
