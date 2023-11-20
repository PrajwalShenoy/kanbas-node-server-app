import Database from "../Database/index.js";

function ModuleRoutes(app) {
    app.get("/api/courses/:cid/modules", (req, res) => {
        const { cid } = req.params;
        const modules = Database.modules.filter((c) => {
            return c.course == cid;
        });
        if (!modules) {
            res.sendStatus(404).send("Course not found");
            return;
        }
        res.send(modules);
    });


    app.post("/api/courses/:cid/modules", (req, res) => {
        const { cid } = req.params;
        const newModule = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString()
        };
        Database.modules.push(newModule);
        res.send(newModule);
    });

    app.delete("/api/modules/:mid", (req, res) => {
        const { mid } = req.params;
        Database.modules = Database.modules.filter((c) => c._id !== mid);
        res.sendStatus(204);
    });

    app.put("/api/modules/:mid", (req, res) => {
        const { mid } = req.params;
        Database.modules = Database.modules.map((m) => {
            if (m._id === mid) {
                return {...m, ...req.body, _id: mid};
            } else {
                return m;
            }
        });
        res.sendStatus(204);
    });
}

export default ModuleRoutes;