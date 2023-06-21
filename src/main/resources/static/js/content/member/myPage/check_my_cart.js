init()

function chkDetail(){
	alert(111);
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