import axios from "axios";
import Jogo from "../models/jogo.model.js";

//https://api-docs.igdb.com/

let tokenAcesso = null;
let expiracaoToken = 0;

async function getTokenAcesso() {
    if (tokenAcesso && Date.now() < expiracaoToken) {
        return tokenAcesso;
    }

    const res = await axios.post("https://id.twitch.tv/oauth2/token", null, {
        params: {
            client_id: process.env.TWITCH_CLIENT_ID,
            client_secret: process.env.TWITCH_CLIENT_SECRET,
            grant_type: "client_credentials",
        },
    });

    tokenAcesso = res.data.access_token;
    expiracaoToken = Date.now() + (res.data.expires_in - 60) * 1000;
    return tokenAcesso;
}

async function igdbRequest(endpoint, query) {
    const token = await getTokenAcesso();
    const res = await axios.post(`https://api.igdb.com/v4/${endpoint}`, query, {
        headers: {
            "Client-ID": process.env.TWITCH_CLIENT_ID,
            Authorization: `Bearer ${token}`,
            "Content-Type": "text/plain",
        },
    });

    return res.data;
}

export default igdbRequest;
