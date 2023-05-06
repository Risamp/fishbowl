
export default function showData(key) {
    var fish;

    fetch("./fishInfo.json")
    .then((response) => {
        return response.json();
    })
    .then((data) => {

        // get fish object
        console.log(data);

        data.data.forEach(species => {
            if (key === species.key) {
                fish = species;
            }
        });


        var fishInfoPanel = document.querySelector(".fish-info__panel");
        var name = fishInfoPanel.querySelector(".fish-info__name");
        var scientificName = fishInfoPanel.querySelector(".fish-info__scientific");
        var close = fishInfoPanel.querySelector(".fish-info__close");
        var popTrend = fishInfoPanel.querySelector(".fish-info__pop-trend");
        var popTrendContainer = fishInfoPanel.querySelector(".fish-info__pop-container");
        var body = fishInfoPanel.querySelector(".fish-info__overfishing");
        var link = fishInfoPanel.querySelector(".fish-info__link");
        var region = fishInfoPanel.querySelector(".fish-info__region");
        var status = fishInfoPanel.querySelector(".fish-info__status");

        popTrendContainer.classList.remove("fish-info__pop-container--decreasing");
        popTrendContainer.classList.remove("fish-info__pop-container--increasing");

        close.addEventListener('click', () => {
            fishInfoPanel?.classList.add("closed");
        })

        fishInfoPanel?.classList.remove("closed");
        
        name.innerHTML = fish.common_name;
        scientificName.innerHTML = fish.scientific_name;
        popTrend.innerHTML = fish.population_decreasing;
        body.innerHTML = fish.overfishing;
        region.innerHTML = fish.region;
        status.innerHTML = fish.status;

        link.href = fish.reference;

        if (fish.population_decreasing === "Decreasing") {
            popTrendContainer.classList.add("fish-info__pop-container--decreasing");
        } else if (fish.population_decreasing === "Increasing") {
            popTrendContainer.classList.add("fish-info__pop-container--increasing");
        }



    })

    
}