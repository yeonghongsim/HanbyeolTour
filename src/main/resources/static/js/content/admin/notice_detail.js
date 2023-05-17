function deleteBoardNotice(hbtBoardAdminNum){
	
	ask = confirm('해당 공지글을 정말로 삭제하시겠습니까?');
	
	if(ask){
		location.href = '/admin/deleteNotice?hbtBoardAdminNum=' + encodeURIComponent(String(hbtBoardAdminNum));
	}
	
}








