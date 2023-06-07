//예약 목록 전체 체크박스 클릭 컨트롤
function AllCheckboxControl() {
	const checkAll = document.querySelector('#allCheck');
	const chks = document.querySelectorAll('.chk');
	
	if(checkAll.checked){
		for(const chk of chks){
			chk.checked = true;
		}
	}
	else{
		for(const chk of chks){
			chk.checked = false;
		}
	}
}

//목록 체크박스 클릭 > 전체 체크박스 컨트롤
function listCheckboxControl(){
	
	//체크 박스 개수
	const cnt = document.querySelectorAll('.chk').length;
	//체크된 체크 박스 개수
	const checkedCnt = document.querySelectorAll('.chk:checked').length;
	const checkAll = document.querySelector('#allCheck');
	
	if(cnt == checkedCnt) {
		checkAll.checked = true;
	}
	else{
		checkAll.checked = false;
	}
}







//--------------------------이벤트
const checkAll = document.querySelector('#searchAllCheck');

//전체를 제외한 체크박스들
const checkboxes = document.querySelectorAll('.searchChk');

checkAll.addEventListener('click', function(){
	
	//전체 체크 박스 체크(true)
	if(checkAll.checked){
		for(const checkbox of checkboxes){
			checkbox.checked = true;
		}
	}
	//체크 해제
	else{
		for(const checkbox of checkboxes){
			checkbox.checked = false;
		}
	}
	
});

//카테고리 체크 박스들 선택 시 전체 체크박스 컨트롤
for(const checkbox of checkboxes){
	checkbox.addEventListener('click', function(){
		//전체를 제외한 체크박스 개수
		const totalCnt = checkboxes.length
		//전체를 제외한 체크박스 중 체크된 체크박스 개수
		const checkCnt = document.querySelectorAll('.searchChk:checked').length
		
		if(totalCnt == checkCnt){
			checkAll.checked = true;
		}
		else{
			checkAll.checked = false;
		}
	});
}
