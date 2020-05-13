"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
function Authenticate(req, res, next) {
    const token = req.headers.authorization;
    if (token == null) {
        return res.sendStatus(401);
    }
    jwt.verify(token, "secret", (err, decoded) => {
        if (err) {
            return res.sendStatus(403);
        }
        next();
    });
}
exports.Authenticate = Authenticate;
//# sourceMappingURL=authentication-middleware.js.map