import { cpuUsage } from "process";
import { cpus } from "node:os";

function handleCPU(app) {
    app.get("/cpu/usage", (_, res) => {
        res.json({ machine: cpus(), app: cpuUsage() });
    });
}

export { handleCPU };
