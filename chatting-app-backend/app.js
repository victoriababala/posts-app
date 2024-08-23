const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");

const MONGODB_URI = process.env.MONGODB_URI;

const { clearImage } = require("./util/clearImage");
/** UPDATED CONFIG
 *  express-graphql => graphql-http
 *  and express-graphiql-explorer (graphiql)
 */
const grapqlHttp = require("graphql-http/lib/use/express");
const graphiql = require("express-graphiql-explorer");
/** ================================== */
const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolvers");
const auth = require("./middleware/auth");

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(auth);

app.put("/post-image", (req, res, next) => {
  if (!req.isAuth) {
    throw new Error("Not authenticated!");
  }
  if (!req.file) {
    return res.status(200).json({ message: "No file provided!" });
  }
  if (req.body.oldPath) {
    clearImage(req.body.oldPath);
  }
  return res.status(201).json({
    message: "File stored.",
    /** REPLACE ALL '\' with '/' */
    filePath: req.file.path.replace(/\\/g, "/"),
  });
});

/** EXPRESS-GRAPHIQL-EXPLORER PACKAGE */
/** note: /graphiql endpoint */
app.use(
  "/graphiql",
  graphiql({
    graphQlEndpoint: "/graphql",
    defaultQuery: `query MyQuery {}`,
  })
);
/** ================================= */

/** GRAPHQL-HTTP CONFIGURATION */
app.all("/graphql", (req, res) =>
  grapqlHttp.createHandler({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    context: { req, res },
    formatError(err) {
      if (!err.originalError) {
        return err;
      }
      const data = err.originalError.data;
      const message = err.message || "An error occurred.";
      const code = err.originalError.code || 500;
      return {
        message: message,
        status: code,
        data: data,
      };
    },
  })(req, res)
);
/** ========================== */

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));
