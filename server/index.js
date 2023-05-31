const express = require("express");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");
const PORT = process.env.PORT;
const app = express();

//Enabler cors og json body parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Route for å få tak i access token fra Microsoft OAuth2 endpoint
app.post("/api/getToken", async (req, res) => {
  const { tenantId, applicationId, clientSecret } = req.body;

  try {
    //Lager en POST request til OAuth2 token endpoint
    const response = await axios.post(
      `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: applicationId,
        client_secret: clientSecret,
        scope: "https://graph.microsoft.com/.default",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    //sender access token som en json reponse
    res.json({ token: response.data.access_token });
  } catch (error) {
    console.error("Error getting access token:", error.response.data);
    res.status(500).json({ error: "Failed to get access token" });
  }
});
//Route for å verifisere applikasjonen ved bruk av access token
app.post("/api/verify", async (req, res) => {
  try {
    const token = req.body.token;

    //gjør GET request til Microsoft Graph API's users endpoint
    const response = await axios.get("https://graph.microsoft.com/v1.0/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // hvis API call er successful, så er verification successfull
    res.json({ message: "Verification successful!", data: response.data });
  } catch (error) {
    console.error("Error verifying application:", error.response.data);
    res.status(500).json({ error: "Failed to verify the application" });
  }
});

const path = require("path");
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

//Render react appen
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

//Starter serveren

app.listen(PORT, () => {
  console.log(`Server startet på port ${PORT}`);
});

//skrevet av Sindre
