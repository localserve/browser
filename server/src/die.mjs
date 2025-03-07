import { pgpool } from "./database.mjs";
import { store } from "./tmp.mjs";

function die() {
    console.log("DIE received!");
    process.exit(0);
}

function gracefulShutdown() {
    console.log("GRACEFUL SHUTDOWN initiated. Forced shutdown in 10s.");
    cleanupDatabaseConnection();
    cleanUpStore();
    setTimeout(() => {
        // Force exit if server takes too long to close
        console.error('Forcing shutdown due to timeout');
        process.abort();
    }, 10 * 1000);
    process.exit(0);
}

function cleanupDatabaseConnection() {
    if (pgpool) {
        pgpool.end().catch(console.error);
    }
}

function cleanUpStore() {
    if (store) {
        for (const key in store) {
            console.log(`CLEANUP: store.${key}`);
            delete store[key];
        }
        console.log("Store cleaned up");
    } else {
        console.warn("Store is already null or undefined");
    }
}

export {
    die, gracefulShutdown, cleanUpStore, cleanupDatabaseConnection
}
