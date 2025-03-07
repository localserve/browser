function handleEnv(app) {
    app.get("/env/", (_, res) => {
        res.json({ node: process.env });
    });
}

export { handleEnv };
