
//사용여부 설정변경
function updateAirlineIsUseAJAX(input){

    const hbtAirlineCode = input.parentNode.parentNode.querySelector('input[type=hidden]').value;
    const isUse = input.value;

    $.ajax({
        url: '/admin/itemDetail/updateAirlineIsUseAJAX',
        type: 'post',
        //contentType : 'application/json; charset=UTF-8',
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        async : true,
        data: {'hbtAirlineCode': hbtAirlineCode, 'isUse': isUse},
        success: function(result) {

        },
        error: function() {
            alert('실패');
        }
    });
}