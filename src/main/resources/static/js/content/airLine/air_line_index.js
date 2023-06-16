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