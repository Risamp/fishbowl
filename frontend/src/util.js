export function getTime() {
    return new Date().toLocaleString('en-au',{hour: "2-digit", minute: "2-digit", hour12: false });
}

export function getDate() {
    return new Date().toLocaleString('en-au',{weekday: 'long', day: 'numeric', month:'long'});
}


// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}