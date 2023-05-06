useEffect(() => {
    fetchFish();
})

async function fetchFish() {
    let response = await fetch('http://localhost:5000/fish');
    let data = await response.json(); 
    console.log(data)
}
