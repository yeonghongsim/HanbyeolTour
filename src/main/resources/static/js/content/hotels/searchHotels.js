init();
//호텔등급만큼 별찍기
function init(){

    const hotelGrade = document.querySelectorAll('.hotelGrade');
    hotelGrade.forEach((grade) => {
        let star = '';
        for (let i = 0; i < grade.getAttribute('data-grade'); i++) {
            star += '★';
        }
        grade.textContent = star;
    });
}

//google place api 요청
function searchHotelsAJAX(){
    //검색지역 세팅
    const areaName = document.querySelector('.areaName').value;
    const cityName = document.querySelector('#cityName').value;

    if(cityName == null || cityName == ''){
        alert('도시명을 입력하세요');
        return;
    }

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
            console.log(results);
            drawHotel(results, cityName);
        },
        error: function() {
            alert('실패');
        }
    });
}


function drawHotel(results, cityName){
    //태그가 그려질 위치
    const resultDiv =  document.querySelector('.resultDiv');
    const resultTitle = document.querySelector('.resultTitle');

    resultDiv.replaceChildren();
    resultTitle.innerText = cityName + ' 호텔 검색 결과';
    let str = '';

    for(const result of results){
        str +=`
               <div class="row rounded-5 mx-5 my-3 shadow" style="cursor: pointer;">
                    <div class="col-6 px-0 mx-0 rounded-5  mt-5">
                        <h5 class="card-title text-center mt-4 fw-bold">${result['name']}</h5>
                        <div class="mt-auto">
                            <p class="card-text text-center">평점 : ${result['rating']}</p>
                            <p class="card-text hotelGrade text-center">
                                <input class="btn btn-gray rounded-5" type="button" value="구글맵 보기" onclick="showLocationOnMap(${result['geometry']['location']['lat']},${result['geometry']['location']['lng']}, '${result['name']}');">
                            </p>
                        </div>
                    </div>
                     <div class="col-6 px-0 mx-0 rounded-5">
        `;
        if (Array.isArray(result['photos'])) {
            str += `
                   <img src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=360&maxheight=270&photoreference=${result['photos'][0]['photo_reference']}&key=AIzaSyCHSSBm8zJnVf4ibkR7pcRog2vGLE-TXZ4" class="object-fit-fill rounded-5" style="display: block; width: 100%; height: 250px;" alt="...">
                 `;
        }
        else {
            str += `
                    <img src="/img/item/xbox.jpg" class="object-fit-fill rounded-5" style="display: block; width: 100%; height: 250px;" alt="...">
                `;
        }
        str += `
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
        zoom: 14 // Set initial zoom level
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


function requestAndRenderPage() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // 페이지 요청 완료 후에 랜더링 대기
            setTimeout(function() {
                // 랜더링 완료 후에 크롤링 수행
                var pageContent = document.documentElement.outerHTML;
                console.log(pageContent);
                // 크롤링 코드 추가
            }, 10000); // 10초 대기
        }
    };
    xhr.open('GET', 'http://openapi.airport.co.kr/service/rest/FlightScheduleList/getIflightScheduleList?serviceKey=CjAiz1amkVJUNEWgPQo963nHN3%2FmHY1CtYIrTr%2FbyYft8%2FW%2BxX%2Fa%2FMIaAmkR1WBGkxFz1LmAm0Z%2FXKzPCQaylw%3D%3D&schDate=20151005&schDeptCityCode=GMP&schArrvCityCode=HND', true);
    xhr.send();
}


document.querySelector('.hotelCate').classList.add("ye-S-fc");