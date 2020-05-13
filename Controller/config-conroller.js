"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_connector_1 = require("../Connector/mongo-connector");
class ConfigConroller {
    config(req, res) {
        let mc = new mongo_connector_1.MongoConnector();
        mc.UpdateParameter(req.body.param, req.body.value).then(updateSuccessful => {
            if (updateSuccessful) {
                res.send("Configured successfully");
            }
            else {
                res.status(400).send({
                    message: "There was en error configuring parameter"
                });
            }
        });
    }
}
exports.ConfigConroller = ConfigConroller;
//# sourceMappingURL=config-conroller.js.map