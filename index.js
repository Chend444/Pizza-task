const http = require("http");
const { getReqData } = require("./utils");
const { pipeline } = require("./pipeline");
const { queue } = require("./queue");


//create a server object:
const server = http.createServer(async (req, res) => {
   if(req.url === "/api/order" && req.method === "POST"){
        let data = await getReqData(req);
       let result = await pipeline(JSON.parse(data));
       res.set(200, { "Content-Type": "application/json" });
       res.send(JSON.stringify(result));
    }
    else{
        res.end();
    }
        //end the response
    }).listen(8080);
//Server runs on localhost:8080


