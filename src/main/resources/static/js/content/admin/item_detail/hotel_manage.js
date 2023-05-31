//사용여부 설정변경
function updateHotelIsUseAJAX(input){

    const hbtHotelCode = input.parentNode.parentNode.parentNode.querySelector('.hbtHotelCode').value;
    const isUse = input.value;

    $.ajax({
        url: '/admin/itemDetail/updateHotelIsUseAJAX', //요청경로
        type: 'post',
        //contentType : 'application/json; charset=UTF-8',
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        async : true,
        data: {'hbtHotelCode': hbtHotelCode,'isUse': isUse},
        success: function(result) {
            alert('사용 여부 변경 완료');
        },
        error: function() {
            alert('실패');
        }
    });
}