require("dotenv").config();
const app = require("./src/app");

const PORT = 3000 || process.env.PORT;


// app.use(express.json());

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});