function getNationNames(areaName, e){
    const drawTarget = e.nextElementSibling.querySelector('ul');

    console.log(areaName, drawTarget);



    $.ajax({
        url: '/airline/getNationalNamesAJAX', //요청경로
        type: 'post',
        //contentType : 'application/json; charset=UTF-8',
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        async : true,
        data: {'areaName': areaName},
        success: function(result) {

        },
        error: function() {
            alert('실패');
        }
    });

}
function test(){


    $.ajax({
        url: 'http://127.0.0.1:5001/test?sentence=123123', //요청경로
        type: 'get',
        //contentType : 'application/json; charset=UTF-8',
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        async : true,
        data: {},
        success: function(result) {
            console.log(result);
        },
        error: function() {
            alert('실패');
        }
    });

}