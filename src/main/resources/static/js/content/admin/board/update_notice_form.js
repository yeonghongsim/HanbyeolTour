function updateNotice(){
	const hbtBoardTitle = document.querySelector('#hbtBoardTitle');
	const hbtBoardContent = document.querySelector('#hbtBoardContent');
	
	if(hbtBoardTitle.value == '' || hbtBoardContent.value =='') {
		if(hbtBoardTitle.value == ''){
			hbtBoardTitle.placeholder = '제목을 입력해주세요.';
		}

		if(hbtBoardContent.value == ''){
			hbtBoardContent.placeholder = '내용을 입력해주세요.';
		}
		
		alert('제목 혹은 내용을 확인해 주세요.');
		
		return ;
	} 
	
	
	ask = confirm('정말로 공지글 내용을 수정하시겠습니까?');
	
	if(ask){
		document.querySelector('#updateNoticeForm').submit();
	}
}





