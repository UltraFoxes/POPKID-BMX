const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUljNXNnemFvUWhVL0JwVEFNNTVhdVNEWXVOVzEyRjZvREFxYzNjbDhVdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTFBRVEhwUi9rZWVQUUhhLzZnU3NIQ0w3VSs1cWVzWnZsTzZCbHlKVzBuYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3Slh5K1MrOHdGSm5waTVMTUlES1EvVElZU2h3QnVDOEd6TklhaXdackg0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0M21Hd1VmY3hOenJtMi80T0lpMXc1RS9UK0gremhPMlAvaWQrWk5FTjJZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNPWDRsOWUyYmVMWFE1WWN4eXZUVFV2eDNTTFZpR1ZjaTd1cnkvKzdDV009In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlluMHVQcHkrRGZKdCtVcGZORmNPWXVPeVpMU1NjR1o5bGphUEo1S1Q4eVE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUxmSGhTNkEvK3ZwN2l0YU5hOGNDQ0E3OGdWa1pBT0lhSDg5aU1qbkJYST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicHJ2KzJneVlnRTk5TUM2amRWTXkzUEVvTlVCZVFHRDMzaDZOYjYyR0VHQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZ0ZXpjWWgwSVNUSWNXTXBmc1JGSVQxdU9PeXdmZWNMSkllUGd4ZVVSK0xKS2RtK1ZZY3VuL3MyS2JIS2UwQUpjZGZVMWVaNmd0bHpQU1NnUzdtZkN3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDgsImFkdlNlY3JldEtleSI6IkFWRlUrckFtNXlwSnI4Q3lEdXlJWHdMWDFQc011S250QUFLdlFKei81NXc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkdYRnBDY2pZVDhTZzNNN1FSVWhtSXciLCJwaG9uZUlkIjoiOWFkY2RkNjQtMGJlOS00ZWZkLWI1YzctMGRkZWEzMzlkMTI5IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktXYS9sMDArTXBtUFZoR0VLN3lZYkxzekxvST0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKN1gvaWVwUjRrOHRiTEF3aTV3Zk9YTXUzemc9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiM0VQREVHSFciLCJtZSI6eyJpZCI6IjIzNDkxNjEyMTA5MDM6M0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUGJ1L2VjRUVQZkRuYm9HR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoicE4rWjBIQ0tCWGdLK0Ftbm9DTlZWYW01Vk9Mc2cwYXZ2eXBlUU54cnYyTT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZktOaWowZG52TXM4a25EQWtROGxPKzRyTzFJTVZyaU5IQ3RvOGZON2wxZW1YZEhCTkNtcDVqemt6d1NMM3FYdW5ObkVHVGZhcWZvKzVYbVdkSWxVREE9PSIsImRldmljZVNpZ25hdHVyZSI6Ik93OHEySElZbmVKTzZ3aE9qNzhzNjZhVGJlQThwM2NtZ2Z0LzhkaTU5ZmREWnNBQmxLOUZ3N09hUlovcjcrVWlqUGtKc3ZXMlZvNzVVVmVFSjlMVkNBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0OTE2MTIxMDkwMzozQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmFUZm1kQndpZ1Y0Q3ZnSnA2QWpWVldwdVZUaTdJTkdyNzhxWGtEY2E3OWoifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzI3MzEzOTYsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRE43In0==',
    PREFIXE: process.env.PREFIX || "",
    OWNER_NAME: process.env.OWNER_NAME || "HITMAN",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2349161210903",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'POPKID MD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/uqsed6.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
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
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
