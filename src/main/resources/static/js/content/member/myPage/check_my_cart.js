init()

function checkDetail(myCart, diyTour){
	const modal_header = document.querySelector('.modal_header');
	const my_cart_div_col = document.querySelector('.my_cart_div_col');
	const diy_tour_div_col = document.querySelector('.diy_tour_div_col');
	const modal_btn_div = document.querySelector('.modal_btn_div');
	
	console.log(myCart);
	console.log(diyTour);
	
	let modal_btn = '';
	
	if(diyTour != null){
		let diy_tour_container = '';
		
		modal_header.innerHTML = '내가 만든 상품';
		
		my_cart_div_col.replaceChildren();
		diy_tour_div_col.replaceChildren();
		modal_btn_div.replaceChildren();
		
		diy_tour_container += `	<div class="row modal_day_plan">`;
		diy_tour_container += `		<div class="col">`;
		diy_tour_container += `			<div class="row mb-2">`;
		diy_tour_container += `				<div class="col-1">${parseInt(diyTour.traverPeriod)-1}박 ${diyTour.traverPeriod}일</div>`;
		diy_tour_container += `				<div class="col">`;
		diy_tour_container += `					<span>항공편 번호 : ${diyTour.airlineCode}</span>`;
		diy_tour_container += `				</div>`;
		diy_tour_container += `				<div class="col">`;
		diy_tour_container += `					<span>출발 시각 : ${diyTour.departDate}</span>`;
		diy_tour_container += `				</div>`;
		diy_tour_container += `			</div>`;
		diy_tour_container += `			<div class="row mb-2">`;
		diy_tour_container += `				<div class="col-1"></div>`;
		diy_tour_container += `				<div class="col">`;
		diy_tour_container += `					<span>국가 : ${diyTour.tourAreaVO.areaKorName}</span>`;
		diy_tour_container += `				</div>`;
		diy_tour_container += `				<div class="col">`;
		diy_tour_container += `					<span>도착 시각 : ${diyTour.arriveDate}</span>`;
		diy_tour_container += `				</div>`;
		diy_tour_container += `			</div>`;
		diy_tour_container += `		</div>`;
		diy_tour_container += `	</div>`;
		diy_tour_container += `<div class="row">`;
		diy_tour_container += `	<div class="col">`;
		
			diyTour.diyDetailList.forEach(function(diyDetail){
		diy_tour_container += `	<input data-hbt-diy-day="${diyDetail.hbtDiyDay}" data-hbt-hotel-code="${diyDetail.hbtHotelCode}" data-hbt-tour-item-code="${diyDetail.hbtTourItemCode}" type="hidden" class="diyDetail">`;
		diy_tour_container += `<div class="row modal_day_plan">`;
		diy_tour_container += `	<div class="col">`;
		diy_tour_container += `				<div class="row mb-3">`;
		diy_tour_container += `					<div class="col-1">`;
		diy_tour_container += `						${diyDetail.hbtDiyDay}일`;
		diy_tour_container += `					</div>`;
		diy_tour_container += `					<div class="col-11">`;
		diy_tour_container += `						<div class="row mb-2">`;
		diy_tour_container += `							<div class="col-1">`;
		diy_tour_container += `								<span>패키지</span>`;
		diy_tour_container += `							</div>`;
				if(diyDetail.hbtTourItemCode != null){
		diy_tour_container += `							<div class="col">`;
		diy_tour_container += `								<div class="row">`;
		diy_tour_container += `									<div class="col">`;
		diy_tour_container += `										<span>${diyDetail.tourItemList[0].hbtTourItemName}</span>`;
		diy_tour_container += `									</div>`;
		diy_tour_container += `									<div class="col">`;
		diy_tour_container += `										<span>일정 : ${diyDetail.tourItemList[0].hbtTourItemRunTime}</span>`;
		diy_tour_container += `									</div>`;
		diy_tour_container += `									<div class="col">`;
		diy_tour_container += `										<span>가격 : ${parseInt(diyDetail.tourItemList[0].hbtTourItemPrice).toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })}</span>`;
		diy_tour_container += `									</div>`;
		diy_tour_container += `								</div>`;
		diy_tour_container += `								<div class="row">`;
		diy_tour_container += `									<div class="col">`;
				diyDetail.tourItemList[0].tourItemImgList.forEach(function(tourItem){
					
		diy_tour_container += `										<img src="/img/item/tourItem/${tourItem.hbtTourItemAttechedFileName}" class="modal_img">`;
				});
		diy_tour_container += `									</div>`;
		diy_tour_container += `								</div>`;
		diy_tour_container += `							</div>`;
				} else {
		diy_tour_container += `							<div class="col">`;
		diy_tour_container += `								<span>선택하신 패키지가 없습니다.</span>`;
		diy_tour_container += `							</div>`;
			
				}
		diy_tour_container += `						</div>`;
		diy_tour_container += `						<div class="row">`;
		diy_tour_container += `							<div class="col-1">`;
		diy_tour_container += `								<span>호텔</span>`;
		diy_tour_container += `							</div>`;
				if(diyDetail.hbtHotelCode != null){
		diy_tour_container += `							<div class="col">`;
		diy_tour_container += `								<div class="row">`;
		diy_tour_container += `									<div class="col">`;
		diy_tour_container += `										<span>${diyDetail.hotelList[0].hbtHotelName}</span>`;
		diy_tour_container += `									</div>`;
		diy_tour_container += `									<div class="col">`;
		diy_tour_container += `										<span>평점 : ${diyDetail.hotelList[0].hbtHotelGrade}</span>`;
		diy_tour_container += `									</div>`;
		diy_tour_container += `									<div class="col">`;
		diy_tour_container += `										<span>가격 : ${parseInt(diyDetail.hotelList[0].hbtHotelPrice).toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })}</span>`;
		diy_tour_container += `									</div>`;
		diy_tour_container += `								</div>`;
		diy_tour_container += `								<div class="row">`;
		diy_tour_container += `									<div class="col">`;
				diyDetail.hotelList[0].hotelImgList.forEach(function(img){
		diy_tour_container += `										<img src="/img/item/hotel/${img.hbtHotelAttchedFileName}" class="modal_img">`;
					
				});
		diy_tour_container += `									</div>`;
		diy_tour_container += `								</div>`;
		diy_tour_container += `							</div>`;
				} else {
		diy_tour_container += `							<div class="col">`;
		diy_tour_container += `								<span>선택하신 호텔이 없습니다.</span>`;
		diy_tour_container += `							</div>`;
				}
		diy_tour_container += `						</div>`;
		diy_tour_container += `					</div>`;
		diy_tour_container += `				</div>`;
		diy_tour_container += `	</div>`;
		diy_tour_container += `</div>`;
			
			});
		
		diy_tour_container += `	</div>`;
		diy_tour_container += `</div>`;
		
		modal_btn += `<div class="col-2 me-2">`;
		modal_btn += `	<input type="button" class="btn btn-yellow-reverse w-100" value="구매" onclick="buyBtnClick('${diyTour.hbtDiyCode}', 'empty');">`;
		modal_btn += `</div>`;
		modal_btn += `<div class="col-2 me-2">`;
		modal_btn += `	<input type="button" class="btn btn-red w-100" value="삭제" onclick="delBtnClick('${diyTour.hbtDiyCode}', 'empty', '${diyTour.memCode}');">`;
		modal_btn += `</div>`;
		modal_btn += `<input type="hidden" value="${diyTour.hbtDiyCode}" id="hbtDiyCode">`;
		modal_btn += `<input type="hidden" value="${diyTour.memCode}" id="memCode">`;
		modal_btn += `<input type="hidden" value="${diyTour.totalPrice}" id="totalPrice">`;
		modal_btn += `<input type="hidden" value="${diyTour.traverPeriod}" id="traverPeriod">`;
		modal_btn += `<input type="hidden" value="${diyTour.areaCode}" id="areaCode">`;
		modal_btn += `<input type="hidden" value="${diyTour.airlineCode}" id="airlineCode">`;
		modal_btn += `<input type="hidden" value="${diyTour.areaCode}" id="areaCode">`;
		modal_btn += `<input type="hidden" value="${diyTour.arriveDate}" id="arriveDate">`;
		modal_btn += `<input type="hidden" value="${diyTour.departDate}" id="departDate">`;
		modal_btn += `<input type="hidden" value="${diyTour.traverPeriod}" id="traverPeriod">`;
		
		diy_tour_div_col.insertAdjacentHTML('afterbegin', diy_tour_container);
		modal_btn_div.insertAdjacentHTML('afterbegin', modal_btn);
		
	}
	
	if(myCart != null){
		
		let my_cart_container = '';
		
		modal_header.innerHTML = '내가 담은 상품';
		
		my_cart_div_col.replaceChildren();
		diy_tour_div_col.replaceChildren();
		modal_btn_div.replaceChildren();
		
		
		my_cart_container += `<div class="row mb-3">`;
		my_cart_container += `	<div class="col-5" style="padding-left:3rem; padding-top: 5rem;">`;
		
		my_cart_container += `		<p">국가명 : ${myCart.itemVO.tourAreaVO.areaKorName}</p>`;
		my_cart_container += `		<p>총기간 : ${myCart.itemVO.traverPeriod}</p>`;
		my_cart_container += `		<p>내용</p>`;
		my_cart_container += `		<p>: ${myCart.itemVO.itemIntro}</p>`;
		my_cart_container += `		<p>상품 가격 : ${myCart.cartTotalPrice.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })}</p>`;
		my_cart_container += `		<p>인원 : ${myCart.numOfPeople}명</p>`;
		my_cart_container += `		<p>담은 날짜 : ${myCart.regDate}</p>`;
		my_cart_container += `	</div>`;
		my_cart_container += `	<div class="col-7">`;
		
		my_cart_container += `<div id="mainImgSlide" class="carousel slide" data-bs-ride="carousel">`;
		my_cart_container += `	<div class="carousel-inner rounded-5 custom-border-5 shadow">`;
		for(let i = 0 ; i < myCart.itemVO.imgList.length ; i++){
			if(i == 0){
		my_cart_container += `			<div class="carousel-item active" data-bs-interval="5000">`;
		my_cart_container += `				<img src="/img/item/itemImg/${myCart.itemVO.imgList[i].itemImgAttachedName}"`;
		my_cart_container += `					 class="w-100" alt="메인이미지">`;
		my_cart_container += `			</div>`;
			} else {
		my_cart_container += `			<div class="carousel-item" data-bs-interval="5000">`;
		my_cart_container += `				<img src="/img/item/itemImg/${myCart.itemVO.imgList[i].itemImgAttachedName}"`;
		my_cart_container += `					 class="w-100" alt="메인이미지">`;
		my_cart_container += `			</div>`;
			}
		}
		my_cart_container += `		</div>`;
		my_cart_container += `<button class="carousel-control-prev" type="button"`;
		my_cart_container += `	data-bs-target="#mainImgSlide" data-bs-slide="prev">`;
		my_cart_container += `	<span class="carousel-control-prev-icon" aria-hidden="true"></span>`;
		my_cart_container += `	<span class="visually-hidden">Previous</span>`;
		my_cart_container += `</button>`;
		my_cart_container += `<button class="carousel-control-next" type="button"`;
		my_cart_container += `	data-bs-target="#mainImgSlide" data-bs-slide="next">`;
		my_cart_container += `	<span class="carousel-control-next-icon" aria-hidden="true"></span>`;
		my_cart_container += `	<span class="visually-hidden">Next</span>`;
		my_cart_container += `</button>`;
		my_cart_container += `</div>`;
		
		my_cart_container += `	</div>`;
		my_cart_container += `</div>`;
		
		modal_btn += `<div class="col-2 me-2">`;
		modal_btn += `	<input type="button" class="btn btn-yellow-reverse w-100" value="구매" onclick="buyBtnClick('empty', '${myCart.cartCode}');">`;
		modal_btn += `</div>`;
		modal_btn += `<div class="col-2 me-2">`;
		modal_btn += `	<input type="button" class="btn btn-red w-100" value="삭제" onclick="delBtnClick('empty', '${myCart.cartCode}', '${myCart.memberVO.memCode}');">`;
		modal_btn += `</div>`;
		modal_btn += `	<input type="hidden" value="${myCart.memberVO.memCode}" id="memCode">`;
		modal_btn += `	<input type="hidden" value="${myCart.cartTotalPrice}" id="cartTotalPrice">`;
		modal_btn += `	<input type="hidden" value="${myCart.itemVO.itemCode}" id="itemCode">`;
		modal_btn += `	<input type="hidden" value="${myCart.itemVO.areaCode}" id="areaCode">`;
		modal_btn += `	<input type="hidden" value="${myCart.departDate}" id="departDate">`;
		modal_btn += `	<input type="hidden" value="${myCart.arriveDate}" id="arriveDate">`;
		modal_btn += `	<input type="hidden" value="${myCart.numOfPeople}" id="numOfPeople">`;
		
		my_cart_div_col.insertAdjacentHTML('afterbegin', my_cart_container);
		modal_btn_div.insertAdjacentHTML('afterbegin', modal_btn);
		
	}
	
	
}

function buyBtnClick(hbtDiyCode, cartCode){
	const ask = confirm('해당 상품을 구매하시겠습니까?');
	
	if(ask){
		
		if(cartCode != 'empty'){
		const memCode = document.querySelector('#memCode').value;
		const cartTotalPrice = document.querySelector('#cartTotalPrice').value;
		const itemCode = document.querySelector('#itemCode').value;
		const areaCode = document.querySelector('#areaCode').value;
		const departDate = document.querySelector('#departDate').value;
		const arriveDate = document.querySelector('#arriveDate').value;
		const numOfPeople = document.querySelector('#numOfPeople').value;
		
		cart = {
			'type' : 'cart'
			, 'cartCode' : cartCode
			, 'memberVO.memCode' : memCode
			, 'buyTotalPrice' : cartTotalPrice
			, 'itemCode' : itemCode
			, 'areaCode' : areaCode
			, 'departDate' : departDate
			, 'arriveDate' : arriveDate
			, 'numOfPeople' : numOfPeople 
		}
		
	}
	
	if(hbtDiyCode != 'empty'){
		const hbtDiyCode = document.querySelector('#hbtDiyCode').value;
		const airlineCode = document.querySelector('#airlineCode').value;
		const memCode = document.querySelector('#memCode').value;
		const totalPrice = document.querySelector('#totalPrice').value;
		const traverPeriod = document.querySelector('#traverPeriod').value;
		const areaCode = document.querySelector('#areaCode').value;
		const arriveDate = document.querySelector('#arriveDate').value;
		const departDate = document.querySelector('#departDate').value;
		
		const diyDetails = document.querySelectorAll('.diyDetail');
		
		
		diyDetailList = []
		diyDetails.forEach(function(diyDetail, index){
			//console.log(diyDetail.dataset);
			
			diyDetailVO = {
				'hbtDiyDay' : diyDetail.dataset.hbtDiyDay
				, 'hbtHotelCode' : diyDetail.dataset.hbtHotelCode
				, 'hbtTourItemCode' : diyDetail.dataset.hbtTourItemCode 
			}
			
			diyDetailList[index] = diyDetailVO
		
		});
		console.log(diyDetailList);
		
		diyTour = {
			'type' : 'diyTour'
			, 'hbtDiyCode' : hbtDiyCode
			, 'memCode' : memCode
			, 'airlineCode' : airlineCode
			, 'areaCode' : areaCode
			, 'departDate' : departDate
			, 'arriveDate' : arriveDate
			, 'totalPrice' : totalPrice
			, 'traverPeriod' : traverPeriod
			, 'isPaid' : 'N'
			, 'diyDetailList' : diyDetailList
		}
	}
	
	if(cartCode != 'empty'){
		data = cart
	} else if(hbtDiyCode != 'empty'){
		data = diyTour
	}
	
	
	//ajax start
	$.ajax({
		url: '/myPage/addMyCartAjax', //요청경로
		type: 'post',
		async: true, // 동기방식(Ajax사용), false == 비동기방식
		//contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		//필요한 데이터
		// 위의 데이터를 자바가 인식 가능한 json 문자열로 변환
		data : {'data' : JSON.stringify(data)},
		
		success: function(result) {
			location.href="/myPage/checkMyCart?memId="+result;
		},
		error: function() {
			alert('실패');
		}
	});
   //ajax end
		
	}
	
	
	
}

function delBtnClick(hbtDiyCode, cartCode, memCode){
	const ask = confirm('해당 상품을 정말로 삭제하시겠습니까?');
	
	if(ask){
		//ajax start
		$.ajax({
			url: '/myPage/delMyCartAJAX', //요청경로
			type: 'post',
			async: true, // 동기방식(Ajax사용), false == 비동기방식
			//contentType: 'application/json; charset=UTF-8',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			//필요한 데이터
			// 위의 데이터를 자바가 인식 가능한 json 문자열로 변환
			data: {'cartCode' : cartCode
				,'hbtDiyCode' : hbtDiyCode
				, 'memCode' : memCode},
			success: function(result) {
				location.href="/myPage/checkMyCart?memId="+result;
			},
			error: function() {
				alert('실패');
			}
		});
	   //ajax end	
	}
	
	
}


function getImgList(imgList){
	
	const main_img_col = document.querySelector('.main_img_col');
	const sub_img_col = document.querySelector('.sub_img_col');

	main_img_col.replaceChildren();
	sub_img_col.replaceChildren();
	
	let main_img = '';
	let sub_img = '';
	
	for(let img of imgList){
		if(img.isMain == 'Y'){
			main_img += `<img src="/img/item/itemImg/${img.itemImgAttachedName}" style="width: 300px;">`;
			main_img_col.insertAdjacentHTML('afterbegin', main_img);
			console.log(img);
		} 
	}
	
	for(let img of imgList){
		if(img.isMain == 'N'){
			console.log(img);
			sub_img += `<img src="/img/item/itemImg/${img.itemImgAttachedName}" style="width: 300px;">`;
			sub_img_col.insertAdjacentHTML('afterbegin', sub_img);
		}
	}
	
	
	
}

function init(){
	
}