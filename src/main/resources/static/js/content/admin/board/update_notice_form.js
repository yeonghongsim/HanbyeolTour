function updateNotice(){
	
	ask = confirm('정말로 공지글 내용을 수정하시겠습니까?');
	
	if(ask){
		document.querySelector('#updateNoticeForm').submit();
	}
}





