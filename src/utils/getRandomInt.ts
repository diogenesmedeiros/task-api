export function getRandomInt() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const maxLimit = (hours * 3600) + (minutes * 60) + seconds;

    const randomNumber = Math.floor(Math.random() * (maxLimit - 1000 + 1)) + 1000;


    return randomNumber
}