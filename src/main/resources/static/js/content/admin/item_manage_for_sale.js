//상품 상세 정보
function openModal(itemCode, areaCateList){
	const itemDetailModal = new bootstrap.Modal('#itemDetailModal');
	
	//ajax start
	$.ajax({
		url: '/admin/getItemDetailForAdminAJAX', //요청경로
		type: 'post',
		data: {'itemCode' : itemCode}, //필요한 데이터
		async : true, //default 
		//contentType : 'application/json; charset=UTF-8', //json 방식
		contentType: "application/x-www-form-urlencoded; charset=UTF-8", //default 방식
		success: function(result) {
			
			console.log(result);
			console.log(areaCateList);
			console.log(result['tourAreaVO'].areaKorName);
			
			//div 안의 모달 내용 지워주기.
			const modalBody = document.querySelector('.modal-body');
			modalBody.replaceChildren();
			
			//상품 정보 나올 모달 그리기
			let str = '';



			str += `	<form class="row" id="itemDetailForm" action="/admin/updateItem" method="post" enctype="multipart/form-data"> `;
			str += `		<input type="hidden" name="itemCode" value="${result.itemCode}"> `;     
			str += `				<div class="col-3">                                                                             `;
			str += `					<label for="" class="form-label">여행 국가</label>                                          `;
			str += `					<select id="" name="areaCode" class="form-select">                                          `;
										for(const area  of areaCateList){
											const selected = result['tourAreaVO'].areaKorName == area.areaKorName ? 'selected' : '';
		    str += `           				<option value="${area.areaCode}" ${selected}>${area.areaKorName}</option>                                                                   `;
											
										}
		    str += `        			</select>                                                                                   `;
			str += `				</div>                                                                                          `;
			str += `				<div class="col-9">                                                                             `;
			str += `					<label for="" class="form-label">패키지 이름</label>                                        `;
			str += `					<input type="text" class="form-control" id="" name="itemTitle" value="${result.itemTitle}">                   `;
			str += `				</div>                                                                                          `;
			str += `				<div class="col-3">                                                                             `;
			str += `					<label for="" class="form-label">기본 가격</label>                                          `;
			str += `					<input type="text" class="form-control" id="" name="itemPrice" value="${result.itemPrice}">                             `;
			str += `				</div>                                                                                          `;
			str += `				<div class="col-3">                                                                             `;
			str += `					<label for="" class="form-label">땡처리할인</label>                                         `;
			str += `					<select id="" name="isBombSale" class="form-select">                                        `;
											if(result.isBombSale == 'Y'){
			str += `							<option value="${result.isBombSale}" selected>${result.isBombSale}</option>                                                            `;
			str += `							<option value="N">N</option>                                                            `;
											}else{
			str += `							<option value="Y">Y</option>                                                            `;
			str += `							<option value="${result.isBombSale}" selected>${result.isBombSale}</option>                                                            `;
											}
			str += `					</select>                                                                                   `;
			str += `				</div>                                                                                          `;
			str += `				<div class="col-3">                                                                             `;
			str += `					<label for="" class="form-label">성수기요금</label>                                         `;
			str += `					<select id="" name="isPeak" class="form-select">                                            `;
											if(result.isPeak == 'Y'){
			str += `							<option value="${result.isPeak}" selected>${result.isPeak}</option>                                                            `;
			str += `							<option value="N">N</option>                                                            `;
											}else{
			str += `							<option value="Y">Y</option>                                                            `;
			str += `							<option value="${result.isPeak}" selected>${result.isPeak}</option>                                                            `;
											}
			str += `					</select>                                                                                   `;
			str += `				</div>                                                                                          `;
			str += `				<div class="col-3">                                                                             `;
			str += `					<label for="" class="form-label">출발요일할증</label>                                       `;
			str += `					<select id="" name="isExtraCharge" class="form-select">                                     `;
											if(result.isExtraCharge == 'Y'){
			str += `							<option value="${result.isExtraCharge}" selected>${result.isExtraCharge}</option>                           `;
			str += `							<option value="N">N</option>                                                            `;
											}else{
			str += `							<option value="Y">Y</option>                                                            `;
			str += `							<option value="${result.isExtraCharge}" selected>${result.isExtraCharge}</option>                            `;
											}
			str += `					</select>                                                                                   `;
			str += `				</div>                                                                                          `;
			str += `				<div class="col-4">                                                                             `;
			str += `					<label for="" class="form-label">패키지 기간</label>                                        `;
			str += `					<input type="text" class="form-control" id="" name="traverPeriod" value="${result.traverPeriod}">                          `;
			str += `				</div>                                                                                          `;
			str += `				<div class="col-4">                                                                             `;
			str += `					<label for="" class="form-label">판매시작일</label>                                         `;
			str += `					<input type="date" class="form-control" id="" name="sellingStart" value="${result.sellingStart}">                          `;
			str += `				</div>                                                                                          `;
			str += `				<div class="col-4">                                                                             `;
			str += `					<label for="" class="form-label">판매종료일</label>                                         `;
			str += `					<input type="date" class="form-control" id="" name="sellingEnd" value="${result.sellingEnd}">                            `;
			str += `				</div>                                                                                          `;
			str += `				<div class="col-12">                                                                            `;
			str += `					<label for="" class="form-label">패키지 소개</label>                                        `;
			str += `					<textarea rows="5" class="form-control" name="itemIntro">${result.itemIntro}</textarea>                        `;
			str += `				</div>                                                                                          `;
			str += `				<div class="col-6" id="mainImgDiv">                                                                             `;
			str += `					<label for="" class="form-label">메인 이미지</label>                                        `;
			str += `					<input type="file" class="form-control" id="mainImg" name="mainImg" disabled accept="image/*">                               `;
										for(const img of result.imgList){
											if(img.isMain == 'Y') {
			str += `							<div style="font-size:0.8rem; margin: 5px;"><a href="javascript:void(0);" onclick="openImgModal('${img.itemImgAttachedName}', '${img.itemImgOriginName}');">* 업로드 된 파일 : ${img.itemImgOriginName}</a>`;
			str += `								<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16" onclick="deleteItemImgAjax('${img.itemImgCode}', this);" style="cursor:pointer; color:red;"> `;
  			str += `								<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" pointer-events="visible"/>`;
			str += `								</svg> `;
			str += `							</div>`;
											}
										}
			str += `				</div>                                                                                          `;
			str += `				<div class="col-6 mb-2" id="subImgDiv">                                                                             `;
			str += `					<label for="" class="form-label">상세 이미지</label>                                        `;
			str += `					<input type="file" class="form-control" id="subImg" name="subImg" multiple accept="image/*">                       `;
										for(const img of result.imgList){
											if(img.isMain == 'N'){
			str += `							<div style="font-size:0.8rem; margin: 5px;"><a href="javascript:void(0);" onclick="openImgModal('${img.itemImgAttachedName}', '${img.itemImgOriginName}');">* 업로드 된 파일 : ${img.itemImgOriginName}</a>`;
  			str += `								<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16" onclick="deleteItemImgAjax('${img.itemImgCode}', this);" style="cursor:pointer; color:red;">`;
  			str += `									<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" pointer-events="visible"/>`;
			str += `								</svg> `;
			str += `							</div>`;
											}
										}
			str += `				</div>                                                                                          `;
			str += `				<div class="col-12">                                                                            `;
			str += `					<div class="form-check form-check-inline">                                                  `;
										if(result.statusCode == 1){
											
			str += `						<input class="form-check-input" value="1" type="radio" id="" name="statusCode" checked> `;
			str += `						<label class="form-check-label" for="">판매중</label>                                   `;
			str += `					</div>                                                                                      `;
			str += `					<div class="form-check form-check-inline">                                                  `;
			str += `						<input class="form-check-input" value="2" type="radio" id="" name="statusCode">         `;
			str += `						<label class="form-check-label" for="">준비중</label>                                   `;
			str += `					</div>                                                                                      `;
			str += `					<div class="form-check form-check-inline">                                                  `;
			str += `						<input class="form-check-input" value="3" type="radio" id="" name="statusCode">         `;
			str += `						<label class="form-check-label" for="">품절</label>                                     `;
			str += `					</div>                                                                                      `;
										} else if(result.statusCode == 2){
											
			str += `						<input class="form-check-input" value="1" type="radio" id="" name="statusCode" > `;
			str += `						<label class="form-check-label" for="">판매중</label>                                   `;
			str += `					</div>                                                                                      `;
			str += `					<div class="form-check form-check-inline">                                                  `;
			str += `						<input class="form-check-input" value="2" type="radio" id="" name="statusCode" checked>         `;
			str += `						<label class="form-check-label" for="">준비중</label>                                   `;
			str += `					</div>                                                                                      `;
			str += `					<div class="form-check form-check-inline">                                                  `;
			str += `						<input class="form-check-input" value="3" type="radio" id="" name="statusCode">         `;
			str += `						<label class="form-check-label" for="">품절</label>                                     `;
			str += `					</div>                                                                                      `;
										}else{
											
			str += `						<input class="form-check-input" value="1" type="radio" id="" name="statusCode"> `;
			str += `						<label class="form-check-label" for="">판매중</label>                                   `;
			str += `					</div>                                                                                      `;
			str += `					<div class="form-check form-check-inline">                                                  `;
			str += `						<input class="form-check-input" value="2" type="radio" id="" name="statusCode">         `;
			str += `						<label class="form-check-label" for="">준비중</label>                                   `;
			str += `					</div>                                                                                      `;
			str += `					<div class="form-check form-check-inline">                                                  `;
			str += `						<input class="form-check-input" value="3" type="radio" id="" name="statusCode" checked>         `;
			str += `						<label class="form-check-label" for="">품절</label>                                     `;
			str += `					</div>                                                                                      `;
										}
			str += `				</div>                                                                                          `;
			str += `				<div class="col-3">                                                                             `;
			str += `					<input id="" type="button" class="btn" value="수정" onclick="updateItem();"                                                     `;
			str += `						style="background-color: #ffd000;">                                     `;
			str += `				</div>                                                                                          `;
			str += `			</form> `;
			
				modalBody.insertAdjacentHTML('afterbegin', str);
				
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
	
	itemDetailModal.show();
	
	
}
	
	



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


//상품 이미지 x 표시 클릭 시 이미지 삭제
function deleteItemImgAjax(itemImgCode, xBtn){

	//ajax start
	$.ajax({
		url: '/admin/deleteItemImgAJAX', //요청경로
		type: 'post',
		data: {'itemImgCode' : itemImgCode}, //필요한 데이터
		success: function(result) {
			alert('ajax 통신 성공');
			
			//버튼의 부모 태그 선택
			const previousId = xBtn.parentElement.previousElementSibling.id;
			xBtn.parentElement.remove();
			
			if(previousId == 'mainImg'){
				document.querySelector('#mainImg').disabled=false;
					
			}
		},
		error: function() {
			alert('실패');
		}
	});
//ajax end
}


//상품 수정 시 이미지 등록 여부 확인
function updateItem(){
	
	let childrenCnt = document.querySelector('#mainImgDiv').children.length;
	const mainImg = document.querySelector('#mainImg').value;
	if(!(childrenCnt == 3 || mainImg != '')){
		alert('메인 이미지를 선택하십시오.');
		return;
	}

	childrenCnt = document.querySelector('#subImgDiv').children.length;
	
	const subImg = document.querySelector('#subImg').value;
	if(!(childrenCnt >= 3 || subImg != '')){
		alert('상세 이미지를 선택하십시오.');
		return;
	}
	
	
	document.querySelector('#itemDetailForm').submit();
	
}








