
//제목 전체 체크박스 클릭 컨트롤
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


//상품 삭제
function deleteItem(itemCode){
	const result = confirm('선택한 상품을 삭제하시겠습니까?');
	
	if(result) {
		location.href = `/admin/deleteItem?itemCode=${itemCode}`;
	}
}

//상품 선택 삭제
function deleteCheckItems(){
	
	//체크된 체크박스들
	const chks = document.querySelectorAll('.chk:checked');
	
	if(chks.length == 0) {
		alert('선택한 상품이 없습니다.\n삭제할 상품을 선택하십시오.')
		return;
	}
	
	const itemCodeArr = [];
	
	chks.forEach(function(chk, index){
		itemCodeArr[index] = chk.value;
		
	})
	
	console.log(itemCodeArr);
	
	const result = confirm('선택한 상품을 삭제하시겠습니까?')
	if(result){
		location.href=`/admin/deleteCheckItems?itemCodes=${itemCodeArr}`;
	}
	
	
}








