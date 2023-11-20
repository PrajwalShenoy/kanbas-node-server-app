const Hello = (app) => {
    app.get("/welcome", (req, res) => {
        res.send("Hello World!");
    });
    app.get('/hello', (req, res) => {
        res.send('Life is good!')
    });

    app.get('/', (req, res) => {
        res.send('Welcome to Full Stack Development!')
    });
}

export default Hello;