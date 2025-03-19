import { defaultUser } from "../defaults";
import { store } from "../store";
import { UserT } from "../types";
import { EP_USER_MACHINE, PORT, SERVER } from "./constants";

async function fetchUserMachine(): Promise<UserT> {
    let userData: UserT = defaultUser;
    try {
        userData = await ((await fetch(`${SERVER}:${PORT}/${EP_USER_MACHINE}`, { method: "GET" })).json());
        store.user = userData;
    } catch (e) {
        console.error(e);
    } finally {
        return userData;
    }
}

export { fetchUserMachine };
