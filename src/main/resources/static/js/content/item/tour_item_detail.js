
//예약하기 경고창
function buyConfirm(){
    const buyForm = document.querySelector('.buyForm');

    if(!confirm('예약시겠습니까?')){
        return;
    }
    buyForm.submit();
}


//호텔등급 별로 바꾸기
function setGrade(){
    const gradeDiv = document.querySelectorAll('.gradeDiv');
    gradeDiv.forEach(grade => {
        let gradeStar = '';

        for(let i = 0; i < grade.getAttribute('data-grade'); i++){
            gradeStar += '★';
        }
        grade.textContent = gradeStar;
    });
}

//장바구니등로ㅑㄱ

function addCartAJAX(){
    const itemCode = document.querySelector("#itemCode").value;
    const numOfPeople = document.querySelector("#numOfPeople").value;
    const departDate = document.querySelector('#departDate').value;
    const arriveDate = document.querySelector('#arriveDate').value;

    $.ajax({
        url: '/buy/addCartAJAX', //요청경로
        type: 'post',
        //contentType : 'application/json; charset=UTF-8',
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        //async : true,
        data: {'itemCode': itemCode ,'numOfPeople': numOfPeople, 'departDate' : departDate, 'arriveDate' : arriveDate},
        success: function(result) {
            alert('장바구니 담기 성공');
        },
        error: function() {
            alert('실패');
        }
    });
}


//이미지정보가져오기
function getImgs(index){
    //일정태그전체선택
    const dailyPlanDivs =  document.querySelectorAll('.dailyPlanDivs');
    const codes = dailyPlanDivs[index].querySelectorAll('input[type=hidden]');

    let hbtHotelCode;
    let hbtTourItemCode = [];


    if(codes.length < 3){
        hbtHotelCode = codes[0].value;
        hbtTourItemCode.push(codes[1].value);
    }
    else {
        hbtHotelCode = codes[0].value;
        hbtTourItemCode.push(codes[1].value);
        hbtTourItemCode.push(codes[2].value);
    }

    $.ajax({
        url: '/item/getImgsAJAX', //요청경로
        type: 'post',
        //contentType : 'application/json; charset=UTF-8',
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        //async : true,
        data: {'hbtHotelCode': hbtHotelCode, 'hbtTourItemCode': hbtTourItemCode},
        success: function(result) {

            drawImg(JSON.parse(result),index);
        },
        error: function() {
            alert('실패');
        }
    });

}


function drawImg(result, index){

    const drawTarget = document.querySelectorAll('.dailyPlanDivs');
    const drawHotelImg = drawTarget[index].querySelector('.hotelImg');
    const drawTourImg = drawTarget[index].querySelectorAll('.tourImg');

    let hotelImg = [];
    let tourImg = [];

    result.forEach((imgs, index) => {
        if(index == 0){
            hotelImg = imgs;
        }
        else if(index > 0){
            tourImg.push(imgs);
        }
    });

    console.log(tourImg.length);

    let hotelImgStr = '';
    //호텔이미지 세팅
    hotelImg.forEach((hotelImg, index) => {

        if(index == 0 ){
            hotelImgStr += `<div class="carousel-item active" data-bs-interval="3000">`;
        }
        else {
            hotelImgStr += `<div class="carousel-item" data-bs-interval="3000">`;
        }
        hotelImgStr += `               
                            <img style="width: 100%;" src="/img/item/hotel/${hotelImg['HBT_HOTEL_ATTECHED_FILE_NAME']}"
                             class="" alt="슬라이드이미지">
                        </div>
        `;
    });
            // <img width="100px;" class="rounded" src="/img/item/hotel/${hotelImg['HBT_HOTEL_ATTECHED_FILE_NAME']}">
    drawHotelImg.replaceChildren();
    drawHotelImg.insertAdjacentHTML('afterbegin', hotelImgStr);


    tourImg.forEach((imgs,index)=>{
        let tourImgStr = '';
            imgs.forEach((img, index) => {

                if(index == 0 ){
                    tourImgStr += `<div class="carousel-item active" data-bs-interval="3000">`;
                }
                else {
                    tourImgStr += `<div class="carousel-item" data-bs-interval="3000">`;
                }
                    tourImgStr += `               
                                   <img class="d-block object-fit-none" src="/img/item/tourItem/${img['HBT_TOUR_ITEM_ATTECHED_FILE_NAME']}"
                                       style="display: block; width: 100%;" alt="슬라이드이미지">
                                   </div>
            `;
        });
        drawTourImg[index].replaceChildren();
        drawTourImg[index].insertAdjacentHTML('afterbegin', tourImgStr);

    });

    setGrade();

}