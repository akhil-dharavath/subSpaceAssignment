const express = require("express");
const app = express();

app.use(express.json());
const port = 1000;

// routes
app.use("/api", require("./routes/api"));

// listening
app.listen(port, () => {
  console.log(`iNoteBook is listening at http://localhost:${port}`);
});
