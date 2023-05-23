//google place api 요청
function searchHotelsAJAX(){
    //검색지역 세팅
    const areaName = document.querySelector('.areaName').value;
    const cityName = document.querySelector('#cityName').value;

    $.ajax({
        url: '/hotel/searchAJAX', //요청경로
        type: 'post',
        //contentType : 'application/json; charset=UTF-8',
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        async : false,
        data: {
            'areaName': areaName,
            'cityName': cityName
        },
        success: function(result) {
            const results = result['results'];
            //검색결과를 화면에 보여주기위핸 함수 호출
            drawHotel(results);
        },
        error: function() {
            alert('실패');
        }
    });
}


function drawHotel(results){
    //태그가 그려질 위치
    const resultDiv =  document.querySelector('.resultDiv');
    //모달창 초기화
    resultDiv.replaceChildren();
    var str = '';
    //리턴받은 값으로 화면 구성
    for(const result of results){
        str += `<div class="col">
                    <div class="card" style="width: 18rem;">`;
        if(Array.isArray(result['photos'])){
            str +=`<img width="320px;" height="240px;" src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=320&photoreference=${result['photos'][0]['photo_reference']}&key=AIzaSyCHSSBm8zJnVf4ibkR7pcRog2vGLE-TXZ4" class="card-img-top" alt="">`;
        }
        else {
            str += `<img width="320px;" height="240px;" src="/img/item/xbox.jpg" className="card-img-top" alt="">`;
            }
        str += `         <div class="card-body">
                            <h5 class="card-title">${result['name']}</h5>
                            <p class="card-text">평점 : ${result['rating']}</p>
                            <a href="javascript:void(0)" onclick="showLocationOnMap(${result['geometry']['location']['lat']},${result['geometry']['location']['lng']}, '${result['name']}');" class="btn btn-primary">구글맵에서 보기</a>
                        </div>
                    </div>
                </div>
                `;
    }
    //태그 삽입
    resultDiv.insertAdjacentHTML('afterbegin', str);
}

function showLocationOnMap(lat, lng, name) {
    //구글맵 호출
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: lat, lng: lng }, // Set initial center position
        zoom: 17 // Set initial zoom level
    });
    //모달창 오픈
    $('#modalToggle').modal('show');
    //구글맵에 마커 추가
    const marker = new google.maps.Marker({
        position: { lat, lng },
        map: map,
        label: {
            text: name,
            fontSize: '18px',
        }
    });
    map.setCenter(marker.getPosition(modalToggle));
}
