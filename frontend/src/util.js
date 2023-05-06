export function getTime() {
    return new Date().toLocaleString('en-au',{hour: "2-digit", minute: "2-digit", hour12: false });
}

export function getDate() {
    return new Date().toLocaleString('en-au',{weekday: 'long', day: 'numeric', month:'long'});
}