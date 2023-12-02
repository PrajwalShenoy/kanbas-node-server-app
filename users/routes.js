import * as dao from './dao.js';

function UserRoutes(app) {
    const createUser = async (req, res) => {
        const newUser = await dao.createUser(req.body);
        res.json(newUser);
    };
    const deleteUser = async (req, res) => {
        const status = await dao.deleteUser(req.params.userId);
        res.json(status);
    };
    const findAllUsers = async (req, res) => {
        const users = await dao.findAllUsers();
        res.json(users);
    };
    const findUserById = async (req, res) => {
        const user = await dao.findUserById(req.params.userId);
        res.json(user);
    };
    const findUserByUsername = async (req, res) => {
        const user = await dao.findUserByUsername(req.params.username);
        res.json(user);
    };
    const updateUser = async (req, res) => {
        const { userId } = req.params;
        const status = await dao.updateUser(userId, req.body);
        req.session["currentUser"] = await dao.findUserById(userId);
        res.json(status);
    };
    const signin = async (req, res) => {
        const { username, password } = req.body;
        const currentUser = await dao.findUserByCredentials(username, password);
        req.session["currentUser"] = currentUser;
        res.json(req.session["currentUser"]);
    };
    const signup = async (req, res) => {
        const user = await dao.findUserByUsername(req.body.username);
        if (user) {
            res.status(400).json({ message: "Username already taken" });
        }
        req.session["currentUser"] = await dao.createUser(req.body);
        res.json(req.session["currentUser"]);
    };
    const signout = async (req, res) => {
        req.session.destroy();
        res.json(200);
    };
    const account = async (req, res) => {
        res.json(req.session["currentUser"]);
    };
    app.post('/api/users', createUser);
    app.get('/api/users', findAllUsers);
    app.get('/api/users/:userId', findUserById);
    app.get('/api/users/username/:username', findUserByUsername);
    app.put('/api/users/:userId', updateUser);
    app.delete('/api/users/:userId', deleteUser);
    app.post('/api/users/signup', signup);
    app.post('/api/users/signin', signin);
    app.post('/api/users/signout', signout);
    app.post('/api/users/account', account);
}
export default UserRoutes;