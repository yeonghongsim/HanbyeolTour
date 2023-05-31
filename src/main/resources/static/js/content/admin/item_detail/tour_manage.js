//사용여부 설정변경
function updateTourItemIsUseAJAX(input){

    const hbtTourItemCode = input.parentNode.parentNode.parentNode.querySelector('.hbtTourItemCode').value;
    const hbtTourItemImgCode = input.parentNode.parentNode.parentNode.querySelector('.hbtTourItemImgCode').value;
    const isUse = input.value;
    console.log(hbtTourItemCode, hbtTourItemImgCode);

    $.ajax({
        url: '/admin/itemDetail/updateTourItemIsUseAJAX', //요청경로
        type: 'post',
        //contentType : 'application/json; charset=UTF-8',
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        async : true,
        data: {'hbtTourItemCode': hbtTourItemCode,'isUse': isUse},
        success: function(result) {
            alert('사용 여부 변경 완료');
        },
        error: function() {
            alert('실패');
        }
    });
}