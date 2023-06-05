

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