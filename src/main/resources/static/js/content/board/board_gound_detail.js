function regReply(writer, memId, hbtBoardNum, inpTag){
	const hbtBoardReplyContent = inpTag.parentElement.previousElementSibling.children[0];
	
	if(hbtBoardReplyContent.value == ''){
		hbtBoardReplyContent.placeholder = "내용을 입력하세요.";
		
		return ;
	}
	
	if(memId == 'anonymousUser'){
		const must_login = confirm('회원 이용 서비스 입니다. 로그인하시겠습니까?');
		
		if(must_login){
			location.href='/member/login';
		}
		return ;
	}
	
	if(writer == memId){
		alert('본인의 게시글에 직접 댓글 달 수 없습니다.');
		
		return ;
	}
	
	//ajax start
    $.ajax({
      url: '/board/regReplyAJAX', //요청경로
      type: 'post',
      async: true, // 동기방식(Ajax사용), false == 비동기방식
      //contentType: 'application/json; charset=UTF-8',
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      //필요한 데이터
      // 위의 데이터를 자바가 인식 가능한 json 문자열로 변환
      data: {'hbtBoardReplyContent' : hbtBoardReplyContent.value
      		, 'MemberVO.memId' : memId
      		, 'BoardVO.hbtBoardNum' : hbtBoardNum},
      success: function(result) {
         alert('댓글 등록');
      },
      error: function() {
         alert('실패');
      }
    });
    //ajax end

	
}

function delReply(hbtBoardReplyNum, writer, userId){
	const ask = confirm('정말로 해당 댓글을 삭제하시겠습니까?');
	
	if(ask){
		alert(hbtBoardReplyNum + '/' + writer + '/' + userId);
		
	}
	
	
	
	
}


