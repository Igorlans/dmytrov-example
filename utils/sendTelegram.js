// const idConfig = ['610159133']

import dayjs from "dayjs";

const apiTokenPR = "6017222286:AAFxpzZr76suQWFI3ccJP2hHOSfjSMAzq4c";
const apiTokenBC = "6259026797:AAFS3zpf-Hi_F86Kz3vju5Mm3hOEu7Ow6y4";
const chatId = "5499868761";
// const chatId = "575062074";


export default function sendTelegram(data, typeBot = "projectRequest") {

    const url = `https://api.telegram.org/bot${typeBot == "projectRequest" ? apiTokenPR : apiTokenBC}/sendMessage?chat_id=${chatId}&text=${data}`;

    const sendUrl = encodeURI(url);
    fetch(sendUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to send message to Telegram bot");
        }
        console.log("Message sent to Telegram bot successfully");
    })
    .catch(error => {
        console.error(error);
    });
}