import app from "./app.js";

const port = process.env.PORT || 5000;
const nodeEnv = process.env.NODE_ENV;

// Start the server
app.listen(port, () => {
  if (nodeEnv !== "production") {
    console.log(`Server is listening on http://localhost:${port}`);
  }
});
