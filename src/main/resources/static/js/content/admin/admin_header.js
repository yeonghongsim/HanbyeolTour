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