// 공지글 등록 함수
function regNotice(){
	
	const hbtBoardTitle = document.querySelector('#hbtBoardTitle');
	const hbtBoardContent = document.querySelector('#hbtBoardContent');
	
	if(hbtBoardTitle.value == '' || hbtBoardContent.value == ''){
		if(hbtBoardTitle.value == ''){
			hbtBoardTitle.placeholder = '제목을 입력하세요';
		}

		if(hbtBoardContent.value == ''){
			hbtBoardContent.placeholder = '내용을 입력하세요';

		}
		
		alert('다시 한번 확인해 주세요.');
		
		return ;
	}
	
	
	document.querySelector('#regNoticeForm').submit();
	
	
}