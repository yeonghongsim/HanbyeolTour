function validateForm() {
	
	const regForm = document.getElementById('regForm');

	const formElements = document.querySelectorAll('form input, form textarea');


	for (let i = 0; i < formElements.length; i++) {
		let element = formElements[i];

		if (element.value.trim() === '') {
			// 입력 제출 막기
			alert('입력되지 않은 항목이 있습니다.');
			return;
		}else{
			regForm.submit();
		}
	}
}