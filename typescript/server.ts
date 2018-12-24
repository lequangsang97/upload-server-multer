declare const require: any;

const Koa = require("koa");
const bodyParser = require("koa-parser");
const _ = require("koa-route");
const formidable = require("formidable");
const AWS = require("aws-sdk");

const config = require("./config");

AWS.config.update({
  accessKeyId: config.accessKey,
  secretAccessKey: config.secretKey,
  region: "ap-southeast-1"
});

const app = new Koa();
app.use(
  bodyParser({
    extendTypes: {
      json: ["application/x-javascript"] // will parse application/x-javascript type body as a JSON string
    }
  })
);

app.use(
  _.get("/uploadS3", (context: any) => {
    context.body = "Upload file into S3";
  })
);

app.use(
  _.post("/uploadS3", async (context: any, next: any) => {
    let form = new formidable.IncomingForm();
    form.encoding = "utf-8";
    await form.parse(context.req);

    await form.on("fileBegin", function(name, file) {
      file.path = __dirname + "/uploads/" + file.name;
    });

    await form.on("file", function(name, file) {
      console.log("Uploaded " + file.name);
    });
  })
);

app.listen(8080, () => console.log(`Server is running on 8080`));
