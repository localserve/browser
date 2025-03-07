import { promisify } from "node:util";
import { exec as syncExec } from "node:child_process";
const exec = promisify(syncExec);

async function getDockerImages() {
    try {
        const { stdout, stderr } = await exec("docker images");
        if (stdout.length === 0 || stderr.includes("not found")) {
            return "";
        }
        return stdout;
    }
    catch (e) {
        console.error(e);
        return "";
    }
}

async function getAllDockerContainers() {
    try {
        const { stdout, stderr } = await exec("docker ps --all");
        if (stdout.length === 0 || stderr.includes("not found")) {
            return "";
        }
        return stdout;
    }
    catch (e) {
        console.error(e);
        return "";
    }
}

async function getDockerVersion() {
    try {
        const { stdout, stderr } = await exec("docker --version");
        if (stdout.length === 0 || stderr.includes("not found")) {
            return "";
        }
        return stdout;
    }
    catch (e) {
        console.error(e);
        return "";
    }
}

async function checkDocker() {
    try {
        const { stdout, stderr } = await exec("docker --version");
        if (stdout.length === 0 || stderr.includes("not found")) {
            return false;
        }
        return true;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}

function handleDocker(app) {
    app.get("/docker/", async (_, res) => {
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
    });
}

export { handleDocker };
