import express from "express";
import dotenv from "dotenv";
import activityRoute from "./routes/activityRoute.js";
import todoRoute from "./routes/todoRoute.js";

const app = express();
dotenv.config();

app.use(express.json());

app.use("/activity-groups", activityRoute);
app.use("/todo-items", todoRoute);

app.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  res.status(500).json({
    message: "Big Error",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
