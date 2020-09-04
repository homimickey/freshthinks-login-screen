const WEBSITE_URL = "http://localhost:8000";

const URL_ONLY_FOR_ADMINS = `${WEBSITE_URL}/onlyforadmins`;
const URL_ERROR_OCCURED = `${WEBSITE_URL}/errorOccured`;
const URL_ADMIN_HOME = `${WEBSITE_URL}/home`;


export default function urlDispathcer(name){
    switch (name) {
        case "home":
            return URL_ADMIN_HOME;
        case "error":
            return URL_ERROR_OCCURED;
        case "ofa":
            return URL_ONLY_FOR_ADMINS;
        default:
            return null
    }
}
