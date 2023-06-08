

//장바구니등로ㅑㄱ

function addCartAJAX(){
    const itemCode = document.querySelector("#itemCode").value;
    const numOfPeople = document.querySelector("#numOfPeople").value;

    $.ajax({
        url: '/buy/addCartAJAX', //요청경로
        type: 'post',
        //contentType : 'application/json; charset=UTF-8',
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        //async : true,
        data: {'itemCode': itemCode ,'numOfPeople': numOfPeople},
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

    console.log(hbtTourItemCode);

    $.ajax({
        url: '/item/getImgsAJAX', //요청경로
        type: 'post',
        //contentType : 'application/json; charset=UTF-8',
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        //async : true,
        data: {'hbtHotelCode': hbtHotelCode, 'hbtTourItemCode': hbtTourItemCode},
        success: function(result) {
            console.log(result);
        },
        error: function() {
            alert('실패');
        }
    });

}




















