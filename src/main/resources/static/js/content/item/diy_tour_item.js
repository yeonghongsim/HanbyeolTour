
//지역선택시 색상변경
function selectArea(event){

    const areaDiv = event.querySelector('.areaDiv');
    const allDiv = document.querySelectorAll('.areaDiv');

    allDiv.forEach((area) => {
        area.classList.remove('ye-bc')
        area.classList.remove('selected')
    });
        areaDiv.classList.add('ye-bc')
        areaDiv.classList.add('selected')

    //getHotelnTourAJAX(event);

}

//날짜선택시 총여행기간 계산하기
function getDate(){

}


//지역선택시 호텔 투어정보 불러오기
function getHotelnTourAJAX(){
    //출발일
    const depDate = document.querySelector('.depDate');
    //도착일
    const arrDate = document.querySelector('.arrDate');
    //선택가능한 지역전체
    const areaDiv =  document.querySelectorAll('.areaDiv');

    let selectedArea = 0;

    //각항목 null체크
    if(depDate.value == null || depDate.value == ''){
        alert('출발일을 선택하세요');
        return;
    }
    if(arrDate.value == null || arrDate.value == ''){
        alert('도착일을 선택하세요');
        return;
    }
    areaDiv.forEach((area) => {
        if(area.classList.contains('selected')){
            selectedArea++;
        }
    });
    if(selectedArea == 0){
        alert('국가를 선택하세요');
        return;
    }

    //선택국가정보
    let areaKorName = '';

    areaDiv.forEach((area) => {
        if(area.classList.contains('selected')){
            areaKorName = area.querySelector('p').textContent;
        }
    });

    //ajax요청
    //ajax start
    $.ajax({
        url: '/item/getHotelnTourAJAX', //요청경로
        type: 'post',
        //contentType : 'application/json; charset=UTF-8',
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        async : true,
        data: {'areaKorName': areaKorName},
        success: function(result) {
            const resultList =  JSON.parse(result);
            drawItem(resultList);
        },
        error: function() {
            alert('실패');
        }
    });
    //ajax end

}

//호텔그림그리기
function drawItem(resultList){
    const hotelDiv = document.querySelector('.hotelDiv');
    const tourDiv = document.querySelector('.tourDiv');

    let hotelStr = '';
    let tourStr = '';

    resultList['HOTEL'].forEach((hotel) => {
        hotelStr +=  `
                    <div class="col">
                        <a href="javascript:void(0)" onclick="hotelModal(this);">
                            <div class="card" style="width: 18rem;">
                                <img width="150px;" src="/img/item/hotel/${hotel['HBT_HOTEL_ATTECHED_FILE_NAME']}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <p class="card-text">${hotel['HBT_HOTEL_NAME']}</p>
                                    <input type="hidden" value="${hotel['HBT_HOTEL_CODE']}">
                                </div>
                            </div>
                        </a>
                    </div>
                    `;
    });

    resultList['TOUR'].forEach((tour) => {
        tourStr +=  `
                    <div class="col">
                        <div class="card" style="width: 18rem;">
                            <img width="150px;" height="100px;" src="/img/item/tourItem/${tour['HBT_TOUR_ITEM_ATTECHED_FILE_NAME']}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <p class="card-text">${tour['HBT_TOUR_ITEM_NAME']}</p>
                                <input type="hidden" value="${tour['HBT_TOUR_ITEM_CODE']}">
                            </div>
                        </div>
                    </div>
                    `;
    });



    hotelDiv.replaceChildren();
    tourDiv.replaceChildren();
    hotelDiv.insertAdjacentHTML('afterbegin', hotelStr);
    tourDiv.insertAdjacentHTML('afterbegin', tourStr);
}

function hotelModal(e){
    //클릭한 아이템 코드
    const hbtHotelCode = e.querySelector('input[type=hidden]').value;
    console.log(hbtHotelCode);
    //ajax요청
    $.ajax({
        url: '/item/getHotelDetailAJAX', //요청경로
        type: 'post',
        //contentType : 'application/json; charset=UTF-8',
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        async : true,
        data: {'hbtHotelCode': hbtHotelCode},
        success: function(result) {
            console.log(result);
        },
        error: function() {
            alert('실패');
        }
    });

    //요청결과로 그림그리기

    //모달창띄우기
    $('#hotelModal').modal('show');

}

function drawHotelModal(result){
    //
    // <div className="carousel-item active">
    //     <img src="" className="d-block w-100" alt="...">
    // </div>


}
















