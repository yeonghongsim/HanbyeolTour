//input 태그 숫자 입력 1000단위 콤마
function inputNumberFormat(obj) {
     obj.value = comma(uncomma(obj.value));
 }
 
function comma(str) {
     str = String(str);
     return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
 }

function uncomma(str) {
     str = String(str);
     return str.replace(/[^\d]+/g, '');
 }
 

//상품 등록 시 패키지 기간 input 태그 공백 제거
function noSpaceInput(inputTag) {
	       
	const strSpace = /\s/;  //공백 체크
    if(strSpace.exec(inputTag.value)) 
    {   
        alert("해당 항목에는 공백을 사용할 수 없습니다.\n공백이 제거됩니다.");
        inputTag.focus();
        inputTag.value = inputTag.value.replace(' ',''); //공백 제거
        return false;
    }
}