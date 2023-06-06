init()

function selectType(){
	let select_tag = document.querySelector('#typeRequestCode');
	let option_val = select_tag.options[select_tag.selectedIndex].value;
	let item_code_input = document.querySelector('#showItemCode'); 
	const img_tr = document.querySelector('.img_tr');
	
	if(option_val == 2){
		img_tr.classList.remove('hide');
	} else {
		img_tr.classList.add('hide');
		item_code_input.value = '';
	}
	
	
}

function selectItem(imgTag){
	let item_code = imgTag.previousElementSibling.value;

	let item_code_input = document.querySelector('#showItemCode');
	const itemCode = document.querySelector('#itemCode');
	
	const ask = confirm('해당 패키지에 대한 문의를 하시겠습니까?');
	
	if(ask){
		item_code_input.value = item_code;
		itemCode.value = item_code;
	}
	
}

function regRequest(){
	const regRequestForm = document.querySelector('#regRequestForm');
	
	const hbtBoardRequestTitle = document.querySelector('#hbtBoardRequestTitle');
	const hbtBoardRequestContent = document.querySelector('#hbtBoardRequestContent');
	const requestPw = document.querySelector('#requestPw');
	
	if(requestPw.value == '' || hbtBoardRequestTitle.value == '' || hbtBoardRequestContent.value == ''){
		if(requestPw.value == ''){
			requestPw.placeholder = '비밀번호를 입력하세요.';
		}
		if(hbtBoardRequestTitle.value == ''){
			hbtBoardRequestTitle.placeholder = '제목을 입력하세요.';
		}
		if(hbtBoardRequestContent.value == ''){
			hbtBoardRequestContent.placeholder = '내용을 입력하세요.';
		}
		
		return ;
	}
	
	
	regRequestForm.submit();
	
	
}



function init(){
	
}