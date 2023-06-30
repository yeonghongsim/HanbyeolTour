function validateForm() {
	
	//입력 값 없으면 막기
	const itemTitle = document.querySelector('input[name="itemTitle"]').value;
	const itemPrice = document.querySelector('input[name="itemPrice"]').value;
	const traverPeriod = document.querySelector('input[name="traverPeriod"]').value;
	const itemIntro = document.querySelector('textarea[name="itemIntro"]').value;

	if (itemTitle.trim() === '' || itemPrice.trim() === '' || traverPeriod.trim() === '' || itemIntro.trim() === '') {
		alert('입력되지 않은 항목이 있습니다.');
		return;
	}
	
	
	const fileSubInput = document.getElementById('subImg'); 
	const subFiles = fileSubInput.files;
	
	const fileMainInput = document.getElementById('mainImg'); 
	const mainFiles = fileMainInput.files;

	if (mainFiles.length == 0 && subFiles.length == 0) {
		alert('상품 이미지 파일을 첨부하십시오.');
		return;
	}else if(mainFiles.length != 0 && subFiles.length == 0){
		alert('상세 이미지 파일을 첨부하십시오.');
		return;
	}else if(mainFiles.length == 0&& subFiles.length != 0){
		alert('메인 이미지 파일을 첨부하십시오.');
		return;
	}
	
	document.querySelector('#regForm').submit();
	alert('상품이 정상 등록되었습니다.');
}
