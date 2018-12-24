var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
app.use(bodyParser({
    extendTypes: {
        json: ["application/x-javascript"] // will parse application/x-javascript type body as a JSON string
    }
}));
app.use(_.get("/uploadS3", (context) => {
    context.body = "Upload file into S3";
}));
app.use(_.post("/uploadS3", (context, next) => __awaiter(this, void 0, void 0, function* () {
    let form = new formidable.IncomingForm();
    form.encoding = "utf-8";
    yield form.parse(context.req);
    yield form.on("fileBegin", function (name, file) {
        file.path = __dirname + "/uploads/" + file.name;
    });
    yield form.on("file", function (name, file) {
        console.log("Uploaded " + file.name);
    });
})));
app.listen(8080, () => console.log(`Server is running on 8080`));
//# sourceMappingURL=server.js.map