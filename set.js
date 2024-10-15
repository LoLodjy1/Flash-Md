const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEN5TzJMekp5MlJTVXp3eklBSDc5TEdmajhNenJxSFA0NUhualBEUXJFND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTCtkdFNXZnRIYXNQNzc4b1UvWXNkZ3lzUUxuQVl4NUQ3UEdDK1dyRmVSbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnSU5nQUxXZTR3aG5tSTR1ejI1cUQwNG9NbEk0TnlKR014d1FHdk5xZEhZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJsMU5UNGxlRXBrVmhndGM3WDRDQ2Nuamsrb0JWMkNwaTNEdk5qdWFLSENjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZPZmpPdkx2bkZyQ0xSRElndDFhenZTUVdwR0N1VTllNGptNHlidE8zV1k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlZubFZmMUR3WURaVjdZYzdGSm5BaWFXb2NLTENHaGhKZ2MxSG1LVDZjMG89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWU9sWW9mSFVjQXdUUVd6ZmJBNFhIaWF2OTBmRVBVckVFWVdOZnBENkxVcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiemlVZi8xcVlRWUg4ZWt1aTFnWGF5SEtHTmVneDJBcjJNUkhwOVI4eGdGWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFiYWMyVWZTZEZHV2QxcERpaHlZSzFub0FHNnJqR3czT0swdm9ub2ZFcHNqaEIwMFdrRUEwWUJ5dG56WGRrOG1zVWovcHAvZ0I3ZGw4YXhUdDFYdUJBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDUsImFkdlNlY3JldEtleSI6InFXbDYyRjI0V2gyNkpsL01XMENudTcwTHJYMmhzWEIzcHBXZ3cwa2hadDQ9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlJ3aHp0MzB5Uy11OGxmWFREUUgwaXciLCJwaG9uZUlkIjoiMTAwMGFiNzAtN2U5Ni00ZDc5LTgwOGMtOTA1NDI3NjQ2MjQ2IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFVTnBLaHp1TlgvQ3dIUStMeGY5ZmRGbnE3MD0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjMnJmdVBBeU83S2ZLaXVVUnhsUmNDeXBRTFE9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiVDM5Wlo0RlMiLCJtZSI6eyJpZCI6IjI0MTAyMjcxNTExOjI4QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOLzN5SUlCRUwvSnQ3Z0dHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ0YXRKNG5PQ2s5blpubERCRml3QmdjUTFKWU9yNTExZnNMbDVNc0VmZkNrPSIsImFjY291bnRTaWduYXR1cmUiOiJUSm1mRXBkOHZqeVVpMzhZWE44QkVMbHUxa1JEdFoxWHdVT0MxdENkUVgxYnNaU3Bud3FkOE8xSXNHU2FaZ1d5Rkt2c3RDcmRGSGx5VzJvRk04dWxBdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiZzRIVTlBaEtiTUg3RVVRWXlxY1lBNTQydmFNM05NWHdZbHppajI4bVUyTnRRWmw4V1RYUUM1bmJ5anpsQXE2cHVjRllZUGYxZHREaUhQSG5DbzlOQ1E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNDEwMjI3MTUxMToyOEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJiV3JTZUp6Z3BQWjJaNVF3UllzQVlIRU5TV0RxK2RkWDdDNWVUTEJIM3dwIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI4OTYzNzg3LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUpteCJ9',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "♕𝙇𝙊𝙇𝙊𝘿𝙅𝙔☘𓆤𐂊︎",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "50932539509",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'online',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech"
        : "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech",
    /* new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
    })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
    }), */
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
