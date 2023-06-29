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
	if(checkAreaDuplicate(areaCode.value, areaKorName.value, areaEngName.value)){
		alert('중복된 카테고리명 입니다.\n확인 후 다시 입력하십시오.')
		areaCode.value = '';
		areaKorName.value = '';
		areaEngName.value = '';
		return;
		
	}
	
	const param = {'areaCode' : areaCode.value
					,'areaKorName' : areaKorName.value
					, 'areaEngName' : areaEngName.value 
				}
	
	//ajax start
	$.ajax({
		url: '/admin/regAreaAJAX', //요청경로
		type: 'post',
		data: JSON.stringify(param), //필요한 데이터
		async : true, //default 
		contentType : 'application/json; charset=UTF-8', //json 방식
		//contentType: "application/x-www-form-urlencoded; charset=UTF-8", //default 방식
		success: function(result) {
			
			alert('카테고리가 등록되었습니다.')
	       	
	       	const areaCateTableTbody = document.querySelector('#areaCateTable tbody');
			areaCateTableTbody.replaceChildren();
			
			let str = '';
			
			for(let i = 0 ; i < result.length ; i++){
				str += `<tr>`;
				str += `<td>${i + 1}</td>`;
				str += `<td>${result[i].areaCode}</td>`;
				str += `<td>${result[i].areaKorName}</td>`;
				str += `<td>${result[i].areaEngName}</td>`;
				str += `<td>`;
				str += `<div class="row">`;
				str += `<div class="form-check col-6">`;
				if(result[i].isUse == 'Y') {
					str += `<input th:name="isUse_' + ${i+1}" type="radio"
							class="form-check-input" checked onchange="changeAreaIsUse('${result[i].areaCode}');">사용중`;
				}else{
					str += `<input th:name="isUse_' + ${i+1}" type="radio"
							class="form-check-input" onchange="changeAreaIsUse('${result[i].areaCode}');">사용중`;
				}
				str += `</div>`;
				str += `<div class="form-check col-6">`;
				if(result[i].isUse == 'N') {
					str += `<input th:name="isUse_' + ${i+1}" type="radio"
							class="form-check-input" checked onchange="changeAreaIsUse('${result[i].areaCode}');">미사용`;
				}else{
					str += `<input th:name="isUse_' + ${i+1}" type="radio"
							class="form-check-input" onchange="changeAreaIsUse('${result[i].areaCode}');">미사용`;
				}
				str += `</div>`;
				str += `</div>`;
				str += `</td>`;
				
				str += `<td>`;
				str += `<div class="row">`;
				str += `<div class="form-check col-6">`;
					if(result[i].isExposeMain == 'Y') {
						str += `<input th:name="isExposeMain_' + ${i+1}" type="radio" value="Y"
								class="form-check-input isExposeRadio" checked onchange="changeIsExposeMain('${result[i].areaCode}');"
								>노출`;
					}else{
						str += `<input th:name="isExposeMain_' + ${i+1}" type="radio" value="Y"
								class="form-check-input isExposeRadio" onchange="changeIsExposeMain('${result[i].areaCode}');"
								>노출`;
					}
				str += `</div>`;
				str += `<div class="form-check col-6">`;
					if(result[i].isExposeMain == 'N') {
						str += `<input th:name="isExposeMain_' + ${i+1}" type="radio" value="N"
								class="form-check-input isExposeRadio" checked onchange="changeIsExposeMain('${result[i].areaCode}');"
								>비노출`;
					}else{
						str += `<input th:name="isExposeMain_' + ${i+1}" type="radio" value="N"
								class="form-check-input isExposeRadio" onchange="changeIsExposeMain('${result[i].areaCode}');"
								>비노출`;
					}
				str += `</div>`;
				str += `</div>`;
				str += `</td>`;
				str += `<td><input type="button" value="삭제" class="btn btn-outline"
												onclick="deleteAreaCate('${result[i].areaCode}');" style="border-color: #ffd000;"></td> `;
				str += `</tr>`;
			}
			areaCateTableTbody.insertAdjacentHTML('afterbegin', str);
			
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}


//여행국가 카테고리 등록 시 국가 중복 확인
function checkAreaDuplicate(areaCode, areaKorName, areaEngName){
	let isDuplicate = false;
	
	
	//ajax start
	$.ajax({
		url: '/admin/checkAreaAJAX', //요청경로
		type: 'post',
		data: {'areaCode' : areaCode, 'areaKorName' : areaKorName, 'areaEngName' : areaEngName}, //필요한 데이터
		async : false, //default 
		success: function(result) {
			alert('ajax 통신 성공');
			if(result == 1) {
				isDuplicate = true;
			}
			
		},
		error: function() {
			alert('실패');
		}
	});
//ajax end
	return isDuplicate;
}

//여행국가 카테고리 삭제
function deleteAreaCate(areaCode) {
	let result = confirm('해당 국가를 삭제하시겠습니까?');
		
		if(result){
			location.href = `/admin/deleteAreaCate?areaCode=${areaCode}`;
		}
}


//카테고리 사용여부 변경 (정현 추가)
function changeAreaIsUse(areaCode){
	
	//ajax start
	$.ajax({
	   url: '/admin/changeAreaIsUseAJAX', 
	   type: 'post',
	   data: {'areaCode' : areaCode}, //필요한 데이터
	   success: function(result) {
			if(result == 1){
				alert('사용 여부가 변경되었습니다.');
			}
			else{
				alert('일시적 오류가 발생했습니다.');	
			}

	   },
	   error: function() {
	      alert('실패');
	   }
	});
	//ajax end
	
}


//카테고리 메인 노출 여부 개수 제한
function checkIsExposeMain() {
    const isExposeMainRadios = document.querySelectorAll('.isExposeRadio:checked');
    let cnt = 0;
   
    for(let i =0; i < isExposeMainRadios.length ; i++){
		if (isExposeMainRadios[i].value == 'Y') {
			cnt++;
		}
	}
	if(cnt >= 4){
		alert('메인 노출은 3개까지만 가능합니다.');
		return false;
	}
	return true; 


}


//카테고리 메인 노출 여부
function changeIsExposeMain(areaCode, selectedRadio){
	//클릭한 라디오 버튼의 페어 라디오 버튼
	const selectedRadioPair = selectedRadio.parentElement.nextElementSibling.firstElementChild
		
	if(!checkIsExposeMain()){
		//노출된 국가 수 3개이상이면 누른 라디오 노출 버튼 false
		selectedRadio.checked = false;
		//페어 라디오 버튼 true
		selectedRadioPair.checked = true;
		return ;
	}
	
	//ajax start
	$.ajax({
	   url: '/admin/changeIsExposeMainAJAX', 
	   type: 'post',
	   data: {'areaCode' : areaCode}, //필요한 데이터
	   success: function(result) {
			console.log(result);
		
			if(result == 1){
				alert('메인 노출 여부가 변경되었습니다.');
			}
			else{
				alert('일시적 오류가 발생했습니다.');	
			}

	   },
	   error: function() {
	      alert('실패');
	   }
	});
	//ajax end
	
}




//여행 국가 영어 대문자만 입력 가능
function onlyEng(event) {  
  const regExp = /[^A-Z]+$/; // 영어만 허용
  const del = event.target;
  if (regExp.test(del.value)) {
	alert('영문 대문자만 입력 가능합니다.');
    del.value = del.value.replace(regExp, '');
  }
};


//여행 국가 한글만 입력 가능 
function onlyKor(event) {
  const regExp = /[^ㄱ-ㅎ|가-힣]/gi; // 한글만 허용
  const del = event.target;
  if (regExp.test(del.value)) {
	alert('한글만 입력 가능합니다.');
    del.value = del.value.replace(regExp, '');
  }
};