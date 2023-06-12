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
	
	const checkboxes = document.querySelectorAll('.chk:checked');
	
	//selectbox에 선택된 예약상태 값 가져오기
	const buyStatusCode = document.querySelector('#buyStatusSelect').value;
	
	//예약 상태 select 안 한 경우
	if(buyStatusCode == '예약상태변경'){
		alert('변경할 예약 상태를 선택하십시오.');
		return;
	}
	
	//선택한 체크박스 없는 경우
	if(checkboxes.length == 0) {
		alert('선택된 예약이 없습니다.\n예약 상태 변경은 예약 건 선택 후 가능합니다.');
		return;
	}
	
	console.log(buyStatusCode);
	
	const buyCodeList = [];
	
	for(let i = 0; i < checkboxes.length; i++){
		buyCodeList[i] = checkboxes[i].value;
	}
	
	let paramData = {
		'buyStatusCode' : buyStatusCode
		, 'buyCodeList' : buyCodeList
	};
	
	
	//ajax start
	$.ajax({
		url: '/admin/changeBuyStatusAJAX', //요청경로
		type: 'post',
		data: JSON.stringify(paramData), //필요한 데이터
		async: true, //default 
		contentType: 'application/json; charset=UTF-8', //json 방식
		//contentType: "application/x-www-form-urlencoded; charset=UTF-8", //default 방식
		success: function(result) {
			alert('ajax 통신 성공');
			location.reload();
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}

//검색 기능 검색 버튼 클릭 시 
function searchBuyList(){
	//체크 박스가 있는 form 선택
	const search_form = document.querySelector('#searchForm');
	//체크가 된 체크박스들의 개수
	const checked_cnt = search_form.querySelectorAll('input[type="checkbox"]:checked').length;
	
	if(checked_cnt == 0) {
		alert('검색할 예약 상태를 선택하십시오.');
		
		return;
	}
	//아닐 경우 form 태그 submit
	search_form.submit();	
	
}


//페이지 번호 누를 때 검색 영역 submit
function getBuyListPaging(pageNum){
	document.querySelector('#nowPage').value = pageNum;
	const search_form = document.querySelector('#searchForm');
	
	search_form.submit();	
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
