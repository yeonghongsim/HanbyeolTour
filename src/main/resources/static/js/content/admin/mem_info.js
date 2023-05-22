//회원 상세 정보 조회
function getMemDetail(memId){
	
	//ajax start
	$.ajax({
		url: '/admin/getMemDetailAjax', //요청경로
		type: 'post',
		data: {'memId' : memId}, //필요한 데이터
		success: function(result) {
			alert('ajax 통신 성공');
			
		},
		error: function() {
			alert('실패');
		}
	});
//ajax end
}