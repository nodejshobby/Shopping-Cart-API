require("dotenv").config();
require("./config/connectMongo");
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const authRoute = require("./route/authRoute");
const userRoute = require("./route/userRoute");
const cartRoute = require("./route/cartRoute");
const orderRoute = require("./route/orderRoute");
const productRoute = require("./route/productRoute");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const PORT = process.env.PORT || 3000;

const apiUrl = process.env.BASE_URL;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Shopping Cart Api with Authentication",
      description:
        "This api is for implementation purpose and as some route methods are not exposed on some resources",
      version: "1.0.0",
    },
    servers: [{ url: apiUrl }],
  },
  apis: ["./route/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/carts", cartRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/products", productRoute);

app.listen(PORT, () => {
  console.log(`Server started running at PORT ${PORT}`);
});
