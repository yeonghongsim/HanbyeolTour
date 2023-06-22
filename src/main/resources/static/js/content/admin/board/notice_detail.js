function deleteBoardNotice(hbtBoardNum){
	
	ask = confirm('해당 공지글을 정말로 삭제하시겠습니까?');
	
	if(ask){
		//ajax start
	   $.ajax({
	      url: '/admin/delboardNoticeAJAX', //요청경로
	      type: 'post',
	      async: true, // 동기방식(Ajax사용), false == 비동기방식
	      //contentType: 'application/json; charset=UTF-8',
	      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	      //필요한 데이터
	      // 위의 데이터를 자바가 인식 가능한 json 문자열로 변환
	      data: {'hbtBoardNum' : hbtBoardNum},
	      success: function(result) {
			location.href='/admin/noticeManage';
	      },
	      error: function() {
	         alert('실패');
	      }
	   });
	   //ajax end

	}
	
	
}








