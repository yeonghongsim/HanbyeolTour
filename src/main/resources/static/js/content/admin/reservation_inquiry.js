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

//예약 목록 체크박스 클릭 > 전체 체크박스 컨트롤
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


//예약 상태 변경 버튼 클릭 시
function changeBuyStatus(){
	
	const checkboxes = document.querySelectorAll('.chk');
	
	//selectbox에 선택된 예약상태 값 가져오기
	const buyStatusCode = document.querySelector('#buyStatusSelect').value;
	
	console.log(buyStatusCode);
	
	const selectedCnt = 0;
	const buyCodeList = [];
	
	for(let i = 0; i < checkboxes.length; i++){
		if(checkboxes[i].checked){
			selectedCnt++;
			buyCodeList[i] = checkboxes[i].value;
		}
	}
	
	paramData = {
		'buyStatusCode' : buyStatusCode
		, 'buyCodeList' : buyCodeList
	};
	
	//선택한 체크박스 없는 경우 alert 창
	if(selectedCnt == 0) {
		alert('선택된 예약이 없습니다.\n예약 상태 변경은 예약 건 선택 후 가능합니다.')
		return;
	}
	
	//ajax start
	$.ajax({
		url: '/admin/changeBuyStatusAjax', //요청경로
		type: 'post',
		data: JSON.stringify(paramData), //필요한 데이터
		async: true, //default 
		contentType: 'application/json; charset=UTF-8', //json 방식
		//contentType: "application/x-www-form-urlencoded; charset=UTF-8", //default 방식
		success: function(result) {
			alert('ajax 통신 성공');
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
	
	
	
}












//--------------------------이벤트
//검색 기능 체크 박스
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

//검색 기능 체크 박스들 선택 시 전체 체크박스 컨트롤
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
