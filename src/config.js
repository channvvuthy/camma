const apiUrl = process.env.VUE_APP_API_URL;
const baseUrl = process.env.VUE_APP_BASE_URL;
const webViewUrl = process.env.VUE_APP_WEB_VIEW_URL;
const basicAuthUsername = process.env.VUE_APP_BASIC_AUTH_USERNAME;
const basicAuthPassword = process.env.VUE_APP_BASIC_AUTH_PASSWORD;
const urlSocket = process.env.VUE_APP_URL_SOCKET;
const auth = process.env.VUE_APP_BASIC_AUTH_TOKEN;
const appVersion = process.env.VUE_APP_VERSION;

export default {
    apiUrl,
    basicAuthUsername,
    basicAuthPassword,
    baseUrl,
    appVersion,
    auth,
    urlSocket,
    webViewUrl,
}