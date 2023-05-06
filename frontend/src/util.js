export function getTime() {
    var date = new Date();

    return date.getHours() + ":" + date.getMinutes();
}

export function getDate() {
    var date = new Date();

    return new Date().toLocaleString('en-au',{weekday: 'long', day: 'numeric', month:'long'});
}