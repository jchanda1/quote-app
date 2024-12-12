const express = require("express");
const router = express.Router();

// router.get("/", (req, res) => {
//   res.json({ success: "Hello from the quotes app" });
// });

const fetchQuotes = async () => {
  try {
    const urlHeaders = {
      headers: { "X-Api-Key": process.env.QUOTES_API_KEY },
    };
    const response = await fetch(
      "https://api.api-ninjas.com/v1/quotes",
      urlHeaders
    );
    const data = response.json();
    return data;
  } catch (err) {
    return err.message;
  }
};

router.get("/", async (req, res) => {
  const data = await fetchQuotes();
  res.json(data);
});

module.exports = router;
