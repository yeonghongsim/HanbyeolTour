init();
/* 바로 실행되는 함수 */
function init(){
	
	
	
}

/* 함수들 */

// 검색 버튼을 이용한 검색 기능 
function searchByInput(){
	searchInputValue = document.querySelector('#searchInput').value;
	
	alert(searchInputValue);
}

// 검색 버튼 밑의 버튼을 이용한 검색 기능
function searchTypeRequest(typeRequestName){
	
	alert(typeRequestName.innerText);
	
	
}

// 해당 질문의 제목 클릭 시 질문의 답 토글 기능
function toggleAnswer(selectedTitle){
	answerTr = selectedTitle.closest('tr').nextElementSibling;
	chevronClass = selectedTitle.parentElement.nextElementSibling;
	
	if(answerTr.classList.contains('hide')){
		answerTr.classList.remove('hide');
		chevronClass.classList.remove('bi-chevron-up');
		chevronClass.classList.add('bi-chevron-down');
	} else {
		answerTr.classList.add('hide');
		chevronClass.classList.add('bi-chevron-up');
		chevronClass.classList.remove('bi-chevron-down');
	}
}


// 이벤트 리스너 

