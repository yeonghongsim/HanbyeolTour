//여행지 카테고리 등록 버튼 클릭 시
function regArea(){
	//form 태그의 여행지 카테고리 인풋 태그들 가져옴
	const areaCode = document.querySelector('#areaCode');
	const areaKorName = document.querySelector('#areaKorName');
	const areaEngName = document.querySelector('#areaEngName');
	
	//인풋 태그 빈 값 확인
	if (areaCode.value == '' || areaKorName.value == '' || areaEngName.value === '') {
		alert('추가할 국가의 정보를 모두 입력하십시오.');
		return;
	}	
	
	//여행지 카테고리명 중복 확인
	
	const param = {'areaCode' : areaCode.value
					,'areaKorName' : areaKorName.value
					, 'areaEngName' : areaEngName.value 
				}
	
	//ajax start
	$.ajax({
		url: '/admin/regAreaAjax', //요청경로
		type: 'post',
		data: JSON.stringify(param), //필요한 데이터
		async : true, //default 
		contentType : 'application/json; charset=UTF-8', //json 방식
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


//여행국가 카테고리 등록 시 국가 중복 확인
function checkAreaDuplicate(){
	
}

//여행국가 카테고리 삭제
function deleteAreaCate(areaCode) {
	let result = confirm('해당 국가를 삭제하시겠습니까?');
		
		if(result){
			location.href = `/admin/deleteAreaCate?areaCode=${areaCode}`;
		}
}
