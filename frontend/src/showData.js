
export default function showData(key) {
    var fishInfoPanel = document.querySelector(".fish-info__panel");
    var name = fishInfoPanel.querySelector(".fish-info__name");
    var scientificName = fishInfoPanel.querySelector(".fish-info__scientific");
    var close = fishInfoPanel.querySelector(".fish-info__close");


    close.addEventListener('click', () => {
        fishInfoPanel?.classList.add("closed");
    })

    fishInfoPanel?.classList.remove("closed");
    name.innerHTML = key;
}