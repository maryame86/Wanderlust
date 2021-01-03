// Foursquare API info
const clientId = 'CJGSWZIT15MFXCYPQK3TKKMF3K1PDMEX03BDCMBBJBBYJ4MY';
const clientSecret = '1VINFUOWGJNWKORTIIIK4BJPTZPWDYY4V00CFYVDFLE1OIZD';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
const openWeatherKey = 'e07d1b6ce9229c32fefebd728d2fb779';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.three');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
$container.css('visibility', 'hidden').height(0);

// AJAX Functions
const getVenues = async () => {
    const city = $input.val();
    const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20202111`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
            console.log(venues);
            return venues;
        }
    } catch (error) {
        console.log(error);    
    }
};


const venuePhotos = async (venue_id) => {
const urlToFetch = `https://api.foursquare.com/v2/venues/${venue_id}/photos?&client_id=${clientId}&client_secret=${clientSecret}&v=20202111`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            
                let photosUrl = `https://fastly.4sqi.net/img/general/200x200${jsonResponse.response.photos.items[0].suffix}`;                
                return photosUrl;  
          }
    } catch (error) {
        console.log(error);    
    }
};

const getForecast = async () => {
    const urlToFetch = `${weatherUrl}?&q=${$input.val()}&APPID=${openWeatherKey}`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse)
            return jsonResponse;
        }
    } catch (error) {
        console.log(error);
    }
};

const venueShuffle = function (venues) {

    for (let i = venues.length -1; i > 0; i--) {
    let idx = Math.floor(Math.random() * (i + 1));
    let tmp = venues[i];
    venues[i] = venues[idx];
    venues[idx] = tmp;
    };
    return venues;
    };
    
    
// Render functions
const renderVenues = (venues) => {
    venueShuffle(venues);
    $venueDivs.forEach( async ($venue, index) => {
        const venue = venues[index];
        const venueIcon = venue.categories[0].icon;
        const venueImageSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
        const vid = venue.categories[0].id;
        const venueType = venue.categories[0].name;
        const address = venue.location.formattedAddress;
        const city = venue.location.city;
        
        let photo = await venuePhotos(venue.id);
        console.log(photo);
        const venueContent = createVenueHTML(venue.name, venue.location, venueImageSrc, photo, 
        vid, venueType, address, city);
        $venue.append(venueContent);
 
    });
    $destination.append(`<h2>${venues[0].location.city}</h2>`);
    

}; 

const renderForecast = (day) => {
    const weatherContent = createWeatherHTML(day);
    $weatherDiv.append(weatherContent);
};

const executeSearch = () => {
    $venueDivs.forEach(venue => venue.empty());
    $weatherDiv.empty();
    $destination.empty();
    $container.css('visibility', 'visible').height('auto');
    $('.front').css('overflow-y', 'scroll');
    getVenues().then(venues => renderVenues(venues));
    getForecast().then(forecast => renderForecast(forecast));
    getVenues().then(photos => venuePhotos(photos));
    
    return false;
  }; 
  $submit.click(executeSearch);
  $input.addEventListener("keydown", function (event) {
    if (event.KeyboardEvent.key === 13) {
      return $submit.click(executeSearch);
    }
});   