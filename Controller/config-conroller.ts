import {MongoConnector} from "../Connector/mongo-connector";

export class ConfigConroller{
    config(req,res){
        let mc = new MongoConnector();
        mc.ConfigParameter(req.body.param, req.body.value).then(updateSuccessful => {
            if (updateSuccessful) {
                res.send("Configured successfully")
            } else {
                res.status(400).send({
                    message: "There was en error configuring parameter"
                })
            }
        });
    }
}