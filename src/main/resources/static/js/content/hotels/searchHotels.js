

function searchHotels(){

    //ajax start
    $.ajax({
        url: '/hotels/search', //요청경로
        type: 'post',
        contentType : 'application/json; charset=UTF-8',
        //contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        async : true,
        data: JSON.stringify({
        }),
        success: function(result) {


        },
        error: function() {
            alert('실패');
        }
    });
    //ajax end

}