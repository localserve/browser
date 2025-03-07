import { userInfo } from "node:os";

function handleUser(app) {
    app.get("/user/machine", (_, res) => {
        res.json(userInfo());
    });
}

export { handleUser };
