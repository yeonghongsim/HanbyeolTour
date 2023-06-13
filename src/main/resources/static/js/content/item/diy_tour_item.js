
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

    getHotelnTourAJAX(event);

}

//날짜선택시 총여행기간 계산하기
function getDate(){

}


//지역선택시 호텔 투어정보 불러오기
function getHotelnTourAJAX(){

    const areaDiv =  document.querySelectorAll('.areaDiv');
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
            drawItem(resultList['HOTEL']);
        },
        error: function() {
            alert('실패');
        }
    });
    //ajax end

}

//호텔그림그리기
function drawItem(result){
    const targetDiv = document.querySelector('.hotelDiv');

    let cardStr = '';

    result.forEach((hotel) => {
        cardStr +=  `
                    <div class="col">
                        <div class="card" style="width: 18rem;">
                            <img width="150px;" src="/img/item/hotel/${hotel['HBT_HOTEL_ATTECHED_FILE_NAME']}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <p class="card-text">${hotel['HBT_HOTEL_NAME']}</p>
                            </div>
                        </div>
                    </div>
                    `;
    });

    targetDiv.replaceChildren();
    targetDiv.insertAdjacentHTML('afterbegin', cardStr);
}


















