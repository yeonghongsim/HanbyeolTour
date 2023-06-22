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
		
		diy_tour_container += `	<div class="row">`;
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
		for(let i = 0 ; i < diyTour.traverPeriod ; i++){
		diy_tour_container += `		<div class="row">`;
		diy_tour_container += `			<div class="col">`;
		diy_tour_container += `				<div class="row mb-3">`;
		diy_tour_container += `					<div class="col-1">`;
		diy_tour_container += `						${i+1}일`;
		diy_tour_container += `					</div>`;
		diy_tour_container += `					<div class="col-11">`;
		diy_tour_container += `						<div class="row mb-2">`;
		diy_tour_container += `							<div class="col-1">`;
		diy_tour_container += `								<span>패키지</span>`;
		diy_tour_container += `							</div>`;
		diy_tour_container += `							<div class="col">`;
		diy_tour_container += `								${diyTour.diyDetailList[i]}`;
		diy_tour_container += `							</div>`;
		diy_tour_container += `						</div>`;
		diy_tour_container += `						<div class="row">`;
		diy_tour_container += `							<div class="col-1">`;
		diy_tour_container += `								<span>호텔</span>`;
		diy_tour_container += `							</div>`;
		diy_tour_container += `							<div class="col">`;
		diy_tour_container += `								12`;
		diy_tour_container += `							</div>`;
		diy_tour_container += `						</div>`;
		diy_tour_container += `					</div>`;
		diy_tour_container += `				</div>`;
		diy_tour_container += `			</div>`;
		diy_tour_container += `		</div>`;
		}
		diy_tour_container += `	</div>`;
		diy_tour_container += `</div>`;
		
		modal_btn += `<div class="col-2 me-2">`;
		modal_btn += `	<input type="button" class="btn btn-success w-100" value="변경" onclick="changeBtnClick();">`;
		modal_btn += `</div>`;
		modal_btn += `<div class="col-2 me-2">`;
		modal_btn += `	<input type="button" class="btn btn-primary w-100" value="구매" onclick="buyBtnClick();">`;
		modal_btn += `</div>`;
		modal_btn += `<div class="col-2 me-2">`;
		modal_btn += `	<input type="button" class="btn btn-danger w-100" value="삭제" onclick="delBtnClick();">`;
		modal_btn += `</div>`;
		
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
		my_cart_container += `	<div class="col-5" style="padding-left:3rem;">`;
		
		my_cart_container += `		<p>국가명 : ${myCart.itemVO.tourAreaVO.areaKorName}</p>`;
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
		modal_btn += `	<input type="button" class="btn btn-primary w-100" value="구매" onclick="buyBtnClick();">`;
		modal_btn += `</div>`;
		modal_btn += `<div class="col-2 me-2">`;
		modal_btn += `	<input type="button" class="btn btn-danger w-100" value="삭제" onclick="delBtnClick();">`;
		modal_btn += `</div>`;
		
		
		my_cart_div_col.insertAdjacentHTML('afterbegin', my_cart_container);
		modal_btn_div.insertAdjacentHTML('afterbegin', modal_btn);
		
	}
	
	
}
function changeBtnClick(){
	alert('변경 버튼 클릭');
}

function buyBtnClick(){
	alert('구매 버튼 클릭');
}

function delBtnClick(){
	alert('삭제 버튼 클릭');
}


function init(){
	
}