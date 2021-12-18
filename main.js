const id = (el)=>document.getElementById(el);

const $placeName = id('placeName');
const $weatherCardContainer = id('weather-cardContainer');
$placeName.addEventListener('change',(e)=>{
    let cityName = e.target.value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=2b0757c3e2fd84c45efaa32764fd897e`)
    .then(response=>{
        return response.json();
    }).then(data=>{
        $placeName.classList.remove('errPlace')
        let frag = document.createDocumentFragment();
        let template = id('weather-card__template');
        frag = template.content.cloneNode(true);
        frag.getElementById('place').textContent=cityName;
        frag.getElementById('country').textContent = `country: ${data.sys.country}`
        frag.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        frag.getElementById('Act-temp').textContent = `Actual temperature: ${Number.parseInt(data.main.temp-273.15)}°C`;
        frag.getElementById('Max-temp').textContent = `Maximum temperature: ${Number.parseInt(data.main.temp_max-273.15)}°C`;
        frag.getElementById('Min-temp').textContent = `Minimum temperature: ${Number.parseInt(data.main.temp_min-273.15)}°C`;
        $weatherCardContainer.append(frag)
        placeName.value='';
    }).catch(err=>{
        $placeName.value='the place entered probably does not exist';
        $placeName.classList.add('errPlace')
    })
})


