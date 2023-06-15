let hotelInfo = {};
let tourInfo = {};

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
    //호텔목록숫자체우기
    if(resultList['HOTEL'].length < 5){
        for(let i = 0; i < (5 - parseInt(resultList['HOTEL'].length)); i++){
            hotelStr +=  `
                    <div class="col">
                        <a href="javascript:void(0)">
                            <div class="card" style="width: 18rem;">
                                <img width="150px;" src="/img/item/xbox.jpg" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <p class="card-text">준비중</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    `;
        }
    }

    resultList['TOUR'].forEach((tour) => {
        tourStr +=  `
                    <div class="col">
                        <a href="javascript:void(0)" onclick="tourModal(this);">
                            <div class="card" style="width: 18rem;">
                                <img width="150px;" src="/img/item/tourItem/${tour['HBT_TOUR_ITEM_ATTECHED_FILE_NAME']}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <p class="card-text">${tour['HBT_TOUR_ITEM_NAME']}</p>
                                    <input type="hidden" value="${tour['HBT_TOUR_ITEM_CODE']}">
                                </div>
                            </div>
                        </a>
                    </div>
                    `;
    });

    if(resultList['TOUR'].length < 5){
        for(let i = 0; i < (5 - parseInt(resultList['TOUR'].length)); i++){
            tourStr +=  `
                    <div class="col">
                        <a href="javascript:void(0)" onclick="">
                            <div class="card" style="width: 18rem;">
                                <img width="150px;" src="/img/item/xbox.jpg" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <p class="card-text">준비중</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    `;
        }
    }

    hotelDiv.replaceChildren();
    tourDiv.replaceChildren();
    hotelDiv.insertAdjacentHTML('afterbegin', hotelStr);
    tourDiv.insertAdjacentHTML('afterbegin', tourStr);
}

function hotelModal(e){
    //클릭한 아이템 코드
    const hbtHotelCode = e.querySelector('input[type=hidden]').value;

    //ajax요청
    $.ajax({
        url: '/item/getHotelDetailAJAX', //요청경로
        type: 'post',
        //contentType : 'application/json; charset=UTF-8',
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        async : true,
        data: {'hbtHotelCode': hbtHotelCode},
        success: function(result) {
            result = JSON.parse(result);
            drawHotelModal(result);
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

    const imgDiv = document.querySelector('.hotelModalImg');
    const hotelDetailInfoTable = document.querySelector('.hotelInfoTable');
    const selectHotel = document.querySelector('.selectHotel');

    let imgStr = '';
    let infoStr = '';
    let selectStr = '';

    //호텔상세이미지
    result.forEach((img) => {
        imgStr +=  `
                    <div class="carousel-item">
                      <img src="/img/item/hotel/${img['HBT_HOTEL_ATTECHED_FILE_NAME']}" class="d-block w-100" alt="...">
                    </div>
                   `;

    });

    //호텔상세정보
    infoStr += `    <tr> 
                      <td>${result[0]['HBT_HOTEL_NAME']}</td>
                    </tr>
                    <tr>
                    <td>
                    <span>`;
    //호텔등급 별그리기
    for(let i = 0; i < result[0]['HBT_HOTEL_GRADE']; i++){
        infoStr += `★`;
    }

    infoStr += `    </span></td>
                    </tr>
                    <tr>
                       <td>${result[0]['HBT_HOTEL_PRICE']}</td>
                    </tr>
                    <tr>
                      <td>${result[0]['HBT_HOTEL_INTRO']}</td>
                    </tr>
             `;

    //해당호텔 일정에 추가 체크박스
    for(let i = 0; i < getDate(); i++){

        selectStr += `
        <div class="col">
            <input class="selectHotelInput form-check-input" type="checkbox" value="${i+1}" name="selectHotel">
            <input type="hidden" value="${result[0]['HBT_HOTEL_NAME']}">
            <input type="hidden" value="${result[0]['HBT_HOTEL_PRICE']}">
            <input type="hidden" class="hotelCode" value="${result[0]['HBT_HOTEL_CODE']}">
            <label class="form-check-label" for="">
              ${i+1}일차 일정에 추가
            </label>
        </div>
        
        `;
    }

    //모달창안에 그림그리기
    selectHotel.replaceChildren();
    selectHotel.insertAdjacentHTML('afterbegin', selectStr);
    imgDiv.replaceChildren();
    imgDiv.insertAdjacentHTML('afterbegin', imgStr);
    hotelDetailInfoTable.replaceChildren();
    hotelDetailInfoTable.insertAdjacentHTML('afterbegin', infoStr);

    imgDiv.querySelectorAll('div')[0].classList.add('active');
    hotelModalCheckbox();
}
//호텔모달창 체크박스 컨트롤
function hotelModalCheckbox(){

    const checkbox = document.querySelectorAll('.selectHotelInput');
    //현제페이지의 호텔코드 가져오기
    const hotelCode = document.querySelectorAll('.hotelCode')[0].value;
    //hotelinfo의 키값들을 배열로 변환
    if (Object.keys(hotelInfo).length == 0) {
        return;
    }
    let hotelInfoKey = Object.keys(hotelInfo);
    let hotelInfoValue = Object.values(hotelInfo).toString();
    for (let i = 0; i < hotelInfoKey.length; i++) {
        for(let j = 0; j < checkbox.length; j++){
            if(hotelInfo[hotelInfoKey[i]][2] == hotelCode && checkbox[j].value == hotelInfoKey[i]){
                checkbox[j].checked = true;
            }
            else if (checkbox[j].value == hotelInfoKey[i]){
                checkbox[j].checked = true;
                checkbox[j].disabled = true;
            }
        }
    }
}


//투어상세모달창
function tourModal(e){
    //클릭한 아이템 코드
    const hbttourCode = e.querySelector('input[type=hidden]').value;

    //ajax요청
    $.ajax({
        url: '/item/getTourDetailAJAX', //요청경로
        type: 'post',
        //contentType : 'application/json; charset=UTF-8',
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        async : true,
        data: {'hbttourCode': hbttourCode},
        success: function(result) {
            result = JSON.parse(result);
            drawTourModal(result);
        },
        error: function() {
            alert('실패');
        }
    });
    //모달창띄우기
    $('#tourModal').modal('show');
}
//투어상품 모달창
function drawTourModal(result){

    const tourModalImg = document.querySelector('.tourModalImg');
    const tourInfoTable = document.querySelector('.tourInfoTable');


    let imgStr = '';
    let infoStr = '';

    //이미지 그리기
    result.forEach((img) => {
        imgStr +=  `
                    <div class="carousel-item">
                      <img src="/img/item/tourItem/${img['HBT_TOUR_ITEM_ATTECHED_FILE_NAME']}" class="d-block w-100" alt="...">
                    </div>
                   `;
    });

    infoStr += `
                <tr>
                    <td>${result[0]['HBT_TOUR_ITEM_NAME']}</td>
                </tr>
                <tr>
                    <td>${result[0]['HBT_TOUR_ITEM_RUNTIME']}</td>
                </tr>
                <tr>
                    <td>${result[0]['HBT_TOUR_ITEM_PRICE']}</td>
                </tr>
                <tr>
                    <td>${result[0]['HBT_TOUR_ITEM_INTRO']}</td>
                </tr>
                <tr>
                    <select class="form-control tourSelectTag">
                        <option value="0" disabled selected>
                            일정선택
                        </option>
    `;

    for(let i = 0; i < getDate();i++){
        infoStr += `
                        <option value="${i+1}">${i+1}일차 일정으로 선택
                        </option>
        `;
    }
        infoStr += `</select>
                    <input type="hidden" class="tourInfoHidden" value="${result[0]['HBT_TOUR_ITEM_NAME']}">
                    <input type="hidden" class="tourInfoHidden" value="${result[0]['HBT_TOUR_ITEM_PRICE']}">
                    <input type="hidden" class="tourInfoHidden" value="${result[0]['HBT_TOUR_ITEM_CODE']}">
                    </tr>`;

    tourInfoTable.replaceChildren();
    tourInfoTable.insertAdjacentHTML('afterbegin', infoStr);

    tourModalImg.replaceChildren();
    tourModalImg.insertAdjacentHTML('afterbegin', imgStr);

    tourModalImg.querySelectorAll('div')[0].classList.add('active');
    tourModalControl();
}
//투어상품 모달창 컨트롤
function tourModalControl(){
    //해당페이지 상품코드 가져오기
    const tourItemCode = document.querySelectorAll('.tourInfoHidden')[2].value;
    //셀렉트박스의 옵션들
    const tourSelectTag = document.querySelector('.tourSelectTag');
    const options = document.querySelector('.tourSelectTag').options;
    //tourInfo 변수 널체크
    if (Object.keys(tourInfo).length == 0) {
        return;
    }
    let tourInfoKey = Object.keys(tourInfo);
    let tourInfoValue = Object.values(tourInfo);

    for(let i = 0; i < tourInfoKey.length; i++){
        if(tourItemCode == tourInfo[tourInfoKey[i]][2]){
            //현재페이지 코드와 반복중인 키에해당하는 코드가 같을때 해당키의 정보를 밑에 출력
            let str = '';
            str += `
                   <tr class="selectedSpan">
                    <td>
                        <span>${tourInfoKey[i]}일차 일정으로 선택됨</span>
                        <button type="button" class="btn-close" aria-label="Close" onclick="deleteTour(${tourInfoKey[i]});"></button>
                    </td>
                   </tr>
            `;
            document.querySelector('.tourInfoTable').insertAdjacentHTML('beforeend', str);
        }
        //키에 해당 셀렉트박스 옵션 삭제
        for (let i = 0; i < options.length; i++) {
            for(let j = 0; j < tourInfoKey.length; j++)
                if (options[i].value == tourInfoKey[j]) {
                tourSelectTag.remove(i);
            }
        }
    }

}
//투어모달 선택된상품삭제
function deleteTour(day){

    const tourSelectTag = document.querySelector('.tourSelectTag');
    const selectedSpan = document.querySelector('.selectedSpan');
    selectedSpan.parentNode.removeChild(selectedSpan);
    const option = document.createElement('option');
    option.value = day.toString();
    option.textContent = day.toString() + '일차 일정으로 선택';
    tourSelectTag.add(option);

    delete tourInfo[day];

}



//최종 결과 화면
function drawResultModal(){
    //합계가격 저장용 변수
    let totalPrice = 0;
    //그림그릴위치
    const resultTable = document.querySelector('.resultTable');
    //지역정보
    const area = document.querySelector('.selected p');
    //출발일
    const depDate = document.querySelector('.depDate').value;
    //도착일
    const arrDate = document.querySelector('.arrDate').value;
    //항공사정보
    const airlineInput = document.querySelectorAll('.airlineInput');
    let airlineName;
    let airlineCode;
    airlineInput.forEach((airline) => {
        if(airline.checked){
            airlineName = airline.nextElementSibling.querySelector('.radio-label').textContent;
            airlineCode = airline.value;
        }
    });
    let resultTableStr = '';

    //호텔정보들
    resultTableStr += `
            <tr>
                <td>여행 국가</td>
                <td colspan="2">${area.textContent}
                    <input type="hidden" class="areaCode" name="areaCode" value="${area.nextElementSibling.value}">
                </td>
            </tr>
            <tr>
                <td>여행 기간</td>
                <td colspan="2">${depDate} ~ ${arrDate}
                    <input type="hidden" class="departDate" name="departDate" value="${depDate}">
                    <input type="hidden" class="arriveDate" name="arriveDate" value="${arrDate}">
                </td>
            </tr>
            <tr>
                <td>항공사</td>
                <td colspan="2">${airlineName}
                    <input type="hidden" class="airlineCode" name="airlineCode" value="${airlineCode}">
                </td>
            </tr>
    `;
    //호텔정보오브젝트의 키값을 배열로
    let hotelInfoKey = Object.keys(hotelInfo);

    for (let i = 0; i < hotelInfoKey.length;i++) {
        resultTableStr += `
            <tr>
                <td>${hotelInfoKey[i]}일차 숙박일정</td>
                <td>${hotelInfo[hotelInfoKey[i]][0]}</td>
                <td>가격 : ${hotelInfo[hotelInfoKey[i]][1]}
                    <input type="hidden" class="hotelDay" name="hbtHotelCode" value="${hotelInfoKey[i]}">
                    <input type="hidden" class="hbtHotelCode" name="hbtHotelCode" value="${hotelInfo[hotelInfoKey[i]][2]}">
                </td>
            </tr>
        `;
        totalPrice += parseInt(hotelInfo[hotelInfoKey[i]][1]);

    }

    //투어정보들
    //투어상품의 키값들을 배열로
    let tourInfoKey = Object.keys(tourInfo);
    for (let i = 0; i < tourInfoKey.length;i++) {
        resultTableStr += `
            <tr>
                <td>${tourInfoKey[i]}일차 투어일정</td>
                <td>${tourInfo[tourInfoKey[i]][0]}</td>
                <td>가격 : ${tourInfo[tourInfoKey[i]][1]}
                    <input type="hidden" class="tourDay" name="hbtTourItemCode" value="${tourInfoKey[i]}">
                    <input type="hidden" class="tourCode" name="hbtTourItemCode" value="${tourInfo[tourInfoKey[i]][2]}">
                </td>
            </tr>
        `;
        totalPrice += parseInt(tourInfo[tourInfoKey[i]][1]);
    }

    //합계가격 구하기
    resultTableStr += `
              <tr>
                <td>최종 결제 금액 : </td>
                <td colspan="2">
                    ${totalPrice}
                    <input type="hidden" class="totalPrice" name="totalPrice" value="${totalPrice}">
                    <input type="hidden" class="traverPeriod" name="traverPeriod" value="${getDate()}">
                </td>
              </tr>
    `;

    resultTable.replaceChildren();
    resultTable.insertAdjacentHTML('afterbegin', resultTableStr);

    $('#resultModal').modal('show');
}

//구매 및 장바구니 AJAX
function buyNCart(isPaid){
    //국가코드
    const areaCode = document.querySelector('.areaCode').value;
    //여행기간
    const departDate = document.querySelector('.departDate').value;
    const arriveDate = document.querySelector('.arriveDate').value;
    //항공사정보
    const airlineCode = document.querySelector('.airlineCode').value;
    //일자별 일정데이터세팅
    const hotelDays = document.querySelectorAll('.hotelDay');
    const hbtHotelCodes = document.querySelectorAll('.hbtHotelCode');
    let hbtHotelCodeMap = {};
    //호텔정보 선택
    for (let i = 0; i < hotelDays.length; i++) {
        hbtHotelCodeMap[hotelDays[i].value] = hbtHotelCodes[i].value;
    }

    //투어정보 선택
    const tourDays = document.querySelectorAll('.tourDay');
    const tourCodes = document.querySelectorAll('.tourCode');

    let tourCodeMap = {};

    for(let i = 0; i < tourDays.length; i++){
        tourCodeMap[tourDays[i].value] = tourCodes[i].value;
    }
    //투어정보 호텔정보 합체
    mergedObj(hbtHotelCodeMap,tourCodeMap);
    //총 가격
    const totalPrice = document.querySelector('.totalPrice').value;
    //여행기간
    const traverPeriod = document.querySelector('.traverPeriod').value;

    //ajax로 보낼 최종 데이터 세팅
    let diyTourVO = {};
    diyTourVO['airlineCode'] = airlineCode;
    diyTourVO['areaCode'] = areaCode;
    diyTourVO['departDate'] = departDate;
    diyTourVO['arriveDate'] = arriveDate;
    diyTourVO['arriveDate'] = arriveDate;
    diyTourVO['traverPeriod'] = getDate();
    diyTourVO['isPaid'] = isPaid;

    let diyDetail = mergedObj(hbtHotelCodeMap,tourCodeMap);

    console.log(diyTourVO);
    console.log(diyDetail);


    //ajax요청
    $.ajax({
        url: '/item/buyNcartAJAX', //요청경로
        type: 'post',
        //contentType : 'application/json; charset=UTF-8',
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        async : true,
        data: {'diyTour': JSON.stringify(diyTourVO),'diyTourDetail': JSON.stringify(diyDetail)},
        success: function(result) {
        },
        error: function() {
            alert('실패');
        }
    });

}

//호텔선택
function selectedHotel(){

    const hotelInputs = document.querySelectorAll('.selectHotelInput')
    //변수에 키값이 없고 체크박스가 체크되어있을때 변수에추가 체크가 되지않은 키는 삭제
    hotelInputs.forEach((hotel) => {
        if (hotel.checked && !hotelInfo.hasOwnProperty(hotel.value)) {
            hotelInfo[hotel.value] = [hotel.nextElementSibling.value, hotel.nextElementSibling.nextElementSibling.value, hotel.nextElementSibling.nextElementSibling.nextElementSibling.value];
        }
        else if(!hotel.checked){
            delete hotelInfo[hotel.value];
        }
    });
    //모달창닫기
    $('#hotelModal').modal('hide');
}

//투어선택
function selectedTour(){
    //변수초기화
    //tourInfo = {};

    const tourSelectTag = document.querySelector('.tourSelectTag');
    const tourInfoHidden = document.querySelectorAll('.tourInfoHidden');

    if(tourSelectTag.value == 0){
        alert('선택된 일정이 없습니다.');
        return;
    }

    tourInfo[tourSelectTag.value] = [tourInfoHidden[0].value, tourInfoHidden[1].value,tourInfoHidden[2].value];

    $('#tourModal').modal('hide');
}

//날짜계산함수
function getDate(){
    const depDate = document.querySelector('.depDate').value;
    const arrDate = document.querySelector('.arrDate').value;

    let date1 = new Date(arrDate);
    let date2 = new Date(depDate);

    let timeDiff = Math.abs(date2.getTime() - date1.getTime());

    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return diffDays;
}




function mergedObj(obj1, obj2){
    let mergedObj = {};
    for (const key in obj1) {
        if (obj1.hasOwnProperty(key)) {
            if (obj2.hasOwnProperty(key)) {
                // obj2에도 같은 키가 있을 경우 해당 키에 배열로 추가
                if (!mergedObj.hasOwnProperty(key)) {
                    mergedObj[key] = [];
                }
                mergedObj[key].push(obj1[key]);
                mergedObj[key].push(obj2[key]);
            } else {
                // obj2에 해당 키가 없을 경우 배열에 null 추가
                mergedObj[key] = [obj1[key], null];
            }
        }
    }

    for (const key in obj2) {
        if (obj2.hasOwnProperty(key) && !obj1.hasOwnProperty(key)) {
            // obj1에 해당 키가 없을 경우 배열에 null 추가
            mergedObj[key] = [null, obj2[key]];
        }
    }

    return mergedObj;
}













