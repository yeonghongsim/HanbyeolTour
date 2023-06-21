/* init();

function init() {

	let url = location.search

	console.log(location.search)
	

	if(url == '?buyStatusCode=1') {
		const checkboxes = document.querySelectorAll('.searchChk');

		
		for (let i = 0; i < checkboxes.length; i++) {
			if (checkboxes[i].value == '1') {
				checkboxes[i].checked = true;
			}
		}

		const searchButton = document.querySelector("input[type='submit']");
		searchButton.click();
	}else if(url == '?buyStatusCode=3'){
		const checkboxes = document.querySelectorAll('.searchChk');

		
		for (let i = 0; i < checkboxes.length; i++) {
			if (checkboxes[i].value == '3') {
				checkboxes[i].checked = true;
			}
		}
		const searchButton = document.querySelector("input[type='submit']");
		searchButton.click();
	}
} */
	

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
function changeDivBuyStatus(){
	
	const checkboxes = document.querySelectorAll('.chk:checked');
	
	//selectbox에 선택된 예약상태 값 가져오기
	const buyStatusCode = document.querySelector('#buyStatusSelect').value;
	
	//예약 상태 select 안 한 경우
	if(buyStatusCode == '예약상태변경'){
		alert('변경할 예약 상태를 선택하십시오.');
		return;
	}
	
	const memNames = [];
	const memDTells = [];
	
	//예약 상태 예약 완료 select한 경우
	if (buyStatusCode == 2) {
		
		//예약 완료로 변경하는 구매건의 구매자 아이디, 휴대폰번호 가져오기
		checkboxes.forEach(function(checkbox) {
			const row = checkbox.parentNode.parentNode;
			const memName = row.querySelector('td:nth-child(5) div:first-child').innerHTML;
			const memDTell = row.querySelector('td:nth-child(5) div:last-child').innerHTML;

			memNames.push(memName);
			memDTells.push(memDTell);
			
		});
		
			console.log(memNames);
			console.log(memDTells);
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
	
	console.log(buyCodeList)
	
	let paramData = {
		'buyStatusCode' : buyStatusCode
		, 'buyCodeList' : buyCodeList
		, 'memNames' : memNames
		, 'memDTells' : memDTells
	};
	
	
	//ajax start
	$.ajax({
		url: '/admin/changeDivBuyStatusAJAX', //요청경로
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


//검색 기간 버튼 날짜 세팅
function setDate(dateButton) {
	let dateButtonValue = dateButton.value;

	//날짜 구하는 함수
	function getFormattedDate(date) {

		let year = date.getFullYear();
		let month = String(date.getMonth() + 1).padStart(2, '0');
		let day = String(date.getDate()).padStart(2, '0');
		return year + '-' + month + '-' + day;
	}

	function getPreviousDates() {
		let today = new Date(); // 오늘 날짜
		let oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // 일주일 전
		let oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()); // 1개월 전
		let threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate()); // 3개월 전

		return {
			today: getFormattedDate(today),
			oneWeekAgo: getFormattedDate(oneWeekAgo),
			oneMonthAgo: getFormattedDate(oneMonthAgo),
			threeMonthsAgo: getFormattedDate(threeMonthsAgo)
		};
	}

	let dates = getPreviousDates();
	
	const todayInput = document.querySelector('#endDate');
	todayInput.value = dates.today;
	
	const setDayInput = document.querySelector('#strtDate');

	if (dateButtonValue == '7일') {
		setDayInput. value = dates.oneWeekAgo;
	}
	else if(dateButtonValue == '1개월'){
		setDayInput. value = dates.oneMonthAgo;
	}
	else if(dateButtonValue == '3개월'){
		setDayInput. value = dates.threeMonthsAgo;
	}
}

