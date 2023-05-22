

function searchHotels(){

    //ajax start
    $.ajax({
        url: '/search', //요청경로
        type: 'post',
        contentType : 'application/json; charset=UTF-8',
        //contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        async : true,
        data: JSON.stringify({
            keyword: 'hotel',
            radius: 500
        }),
        success: function(result) {

            let aaa = result['results'][12]['name'];
            document.querySelector('#reset-button').value = aaa;
            console.log(result);
        },
        error: function() {
            alert('실패');
        }
    });
    //ajax end

}

function searchHotels(){

    const areaName = document.querySelector('.areaName').value;
    const cityName = document.querySelector('#cityName').value;

    console.log(areaName,cityName);

    $.ajax({
        url: '/hotel/search', //요청경로
        type: 'post',
        //contentType : 'application/json; charset=UTF-8',
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        async : false,
        data: {
            'areaName': areaName,
            'cityName': cityName
        },
        success: function(result) {

            console.log(result['results']);
            const results = result['results'];
            drawHotel(results);
        },
        error: function() {
            alert('실패');
        }
    });
}


function drawHotel(results){
    var str = '';
    for(const result of results){
        str += `<div class="col">
                    <div class="card" style="width: 18rem;">`;
        if(Array.isArray(result['photos'])){
            str +=`<img src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=320&photoreference=${result['photos'][0]['photo_reference']}&key=AIzaSyCHSSBm8zJnVf4ibkR7pcRog2vGLE-TXZ4" class="card-img-top" alt="">`;
        }
        else {
            str += `<img src="/img/item/xbox.jpg" className="card-img-top" alt="">`;
            }
        str += `         <div class="card-body">
                            <h5 class="card-title">${result['name']}</h5>
                            <p class="card-text">평점 : ${result['rating']}</p>
                            <a href="javascript/void(0)" onclick="" class="btn btn-primary">구글맵에서 보기</a>
                        </div>
                    </div>
                </div>
                `;
    }

    document.querySelector('.resultDiv').insertAdjacentHTML('afterbegin', str);


}




function initMap() {
    // Create map
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 35.6695, lng: 139.7690 }, // Set initial center position
        zoom: 16 // Set initial zoom level
    });

    function showLocationOnMap(lat, lng) {
        const marker = new google.maps.Marker({
            position: { lat, lng },
            map: map
        });

        // Center the map on the marker
        map.setCenter(marker.getPosition());
    }

    function createHotelRow(name, rating, photoUrl, lat, lng) {
        const table = document.getElementById("hotelTable");
        const row = table.insertRow();

        const nameCell = row.insertCell();
        nameCell.innerHTML = name;

        const ratingCell = row.insertCell();
        ratingCell.innerHTML = rating;

        const photoCell = row.insertCell();
        const photo = document.createElement("img");
        photo.src = photoUrl;
        photoCell.appendChild(photo);

        const actionCell = row.insertCell();
        const button = document.createElement("button");
        button.innerHTML = "Show Location";
        button.onclick = () => showLocationOnMap(lat, lng);
        actionCell.appendChild(button);
    }

    // Sample data
    const hotels = [
        {
            name: "JR Kyushu Hotel Blossom Shinjuku",
            rating: 4.3,
            photoUrl: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
            lat: 35.6876532,
            lng: 139.6983489
        },
        {
            name: "긴자 그랜드 호텔",
            rating: 3.7,
            photoUrl: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
            lat: 35.66825559999999,
            lng: 139.7601791
        },
        {
            name: "호화 캡슐 호텔 anshin oyado",
            rating: 3.8,
            photoUrl: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
            lat: 35.6650022,
            lng: 139.7581144
        }
    ];

    // Populate the table and add markers to the map
    for (const hotel of hotels) {
        createHotelRow(hotel.name, hotel.rating, hotel.photoUrl, hotel.lat, hotel.lng);
        showLocationOnMap(hotel.lat, hotel.lng);
    }
}