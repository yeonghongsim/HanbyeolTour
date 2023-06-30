function addRecomItem(){
    const allItemSelectTag = document.querySelector('.allItemList');
    const allItemList = document.querySelectorAll('.allItemList option');

    const recomSelectTag = document.querySelector('.recomItemList');
    const recomItemList = document.querySelectorAll('.recomItemList option');

    const recomImgDiv = document.querySelector('.recomImgDiv');

    //목록중 선택된 아이템 찾아서 삭제
    for(let i = 0; i < allItemList.length; i++){
        if(allItemList[i].selected){
            //선택된 옵션정보로 추천 상품 목록에 추가하기
            const option = document.createElement("option");
            const optionText = allItemList[i].text;
            const optionValue = allItemList[i].value;

            option.text = optionText;
            option.value = optionValue;
            recomSelectTag.add(option);
            //전체 상품 목록에서 삭제
            allItemList[i].remove();
        }
    }
    //바뀐내용 그림 그리기
    drawImg();
}

function removeRecomItem(){
    const allItemSelectTag = document.querySelector('.allItemList');
    const allItemList = document.querySelectorAll('.allItemList option');

    const recomSelectTag = document.querySelector('.recomItemList');
    const recomItemList = document.querySelectorAll('.recomItemList option');

    const recomImgDiv = document.querySelector('.recomImgDiv');

    //목록중 선택된 아이템 찾아서 삭제
    for(let i = 0; i < recomItemList.length; i++){
        if(recomItemList[i].selected){
            //선택된 옵션정보로 추천 상품 목록에 추가하기
            const option = document.createElement("option");
            const optionText = recomItemList[i].text;
            const optionValue = recomItemList[i].value;

            option.text = optionText;
            option.value = optionValue;
            allItemSelectTag.add(option);
            //전체 상품 목록에서 삭제
            recomItemList[i].remove();
        }
    }
    //바뀐내용 그림 그리기
    drawImg();

}

function drawImg(){

    const recomSelectTag = document.querySelector('.recomItemList');
    const recomItemList = document.querySelectorAll('.recomItemList option');
    const recomImgDiv = document.querySelector('.recomImgDiv');

    const recomImgComment = document.querySelectorAll('.recom_img_comment');

    let img = '';

    let comments =  [];
    for(const com of recomImgComment){
        comments.push(com.textContent);
    }

    for(let i = 0; i < recomItemList.length;i++){
        const itemCode = recomItemList[i].value.split(',')[0];
        const imgName = recomItemList[i].value.split(',')[1];
        const title = recomItemList[i].text;

        img += `
                <div class="col col-2 mx-3">
                     <div class="row mb-0 d-flex justify-content-center text-center">
                        <img src="/img/item/itemImg/${imgName}" class="rounded-5 px-0 custom-border-3 recommend-img">
                        <h4 class="recom_img_comment"></h4>
                     </div>
                     <div class="row my-0">
                        <input class="form-control comment_input" type="text" placeholder="입력후 엔터" onchange="changeComment(this);">
                     </div>
                </div>
                `;
    }

    recomImgDiv.replaceChildren();
    recomImgDiv.insertAdjacentHTML('afterbegin', img);
    
    const h4Tag = document.querySelectorAll('.recom_img_comment');
    for(let i = 0; i < h4Tag.length; i++){
        h4Tag[i].textContent = comments[i]
    }

}

//변경 사항 저장 AJAX
function setRecomItem(){

    const recomSelectTag = document.querySelectorAll('.recomItemList option');
    const comment_input = document.querySelectorAll('.recom_img_comment');

    let itemCode = [];
    let comment = [];

    for(let i = 0; i < recomSelectTag.length;i++){

        itemCode.push(recomSelectTag[i].value.split(',')[0]);
        comment.push(comment_input[i].textContent);
    }

    //ajax로 db등
    $.ajax({
        url: '/admin/setRecomItemListAJAX', //요청경로
        type: 'post',
        //contentType : 'application/json; charset=UTF-8',
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        async : true,
        data: {'itemCode':itemCode, 'comment': comment},
        success: function(result) {
            alert('추천 상품 등록 완료');
            location.reload();
        },
        error: function() {
            alert('실패');
        }
    });

}

//텍스트 박스 글자 입력시 span 태그 글자 바꾸기
function changeComment(input){

    const targetTag = input.parentNode.parentNode.querySelector('.recom_img_comment');


    const commentSpan = document.querySelectorAll('.recom_img_comment');
    const comment_input = document.querySelectorAll('.comment_input');

    targetTag.textContent = input.value;

}