import express from "express";
import axios from "axios";
import jwt from "jsonwebtoken";

const router = express.Router();

const ROLE_MAP = {
  OWNER_ROLE_ID: "OWNER",
  ADMIN_ROLE_ID: "ADMIN",
  MODERATOR_ROLE_ID: "MODERATOR"
};

router.get("/login", (req, res) => {
  const {
    DISCORD_CLIENT_ID,
    DISCORD_REDIRECT_URI
  } = process.env;

  console.log("LOGIN ENV:", {
    DISCORD_CLIENT_ID,
    DISCORD_REDIRECT_URI
  });

  const params = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID,
    redirect_uri: DISCORD_REDIRECT_URI,
    response_type: "code",
    scope: "identify guilds guilds.members.read"
  });

  res.redirect(
    `https://discord.com/oauth2/authorize?${params.toString()}`
  );
});

router.get("/callback", async (req, res) => {
  const {
    DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET,
    DISCORD_REDIRECT_URI,
    DISCORD_GUILD_ID,
    JWT_SECRET,
    FRONTEND_URL
  } = process.env;

  const code = req.query.code;
  if (!code) return res.status(400).send("No code");

  try {
    const tokenRes = await axios.post(
      "https://discord.com/api/oauth2/token",
      new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: DISCORD_REDIRECT_URI
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { access_token } = tokenRes.data;

    const userRes = await axios.get(
      "https://discord.com/api/users/@me",
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    const memberRes = await axios.get(
      `https://discord.com/api/users/@me/guilds/${DISCORD_GUILD_ID}/member`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    let role = "MODERATOR";
    for (const r of memberRes.data.roles) {
      if (ROLE_MAP[r]) {
        role = ROLE_MAP[r];
        break;
      }
    }

    const token = jwt.sign(
      {
        id: userRes.data.id,
        username: userRes.data.username,
        role
      },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.redirect(
      `${FRONTEND_URL}/?token=${token}&role=${role}`
    );
  } catch (err) {
    console.error("DISCORD CALLBACK ERROR:", err.response?.data || err.message);
    res.redirect(
      `${process.env.FRONTEND_URL}/?token=${token}&role=${role}`
    );
  }
});

export default router;
