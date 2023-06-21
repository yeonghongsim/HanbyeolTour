function getNationNames(e){
    //const drawTarget = e.nextElementSibling.querySelector('ul');
    //
    const areaName = e.value;


    $.ajax({
        url: '/airline/getNationalNamesAJAX', //요청경로
        type: 'post',
        //contentType : 'application/json; charset=UTF-8',
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        async : true,
        data: {'areaName': areaName},
        success: function(result) {
            drawInnerAccordion(result, e);
        },
        error: function() {
            alert('실패');
        }
    });
}



function drawInnerAccordion(nationalNames, e){

    const drawTarget = e.parentNode.parentNode.querySelector('.accordion-body');

    let str = '';

    nationalNames.forEach((name, index) => {

    str += `
            <div class="accordion" id="inneraccordion">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button onclick="getAirportInfo('${name}',this)" class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#innerCollapse${index}" aria-expanded="true"
                                aria-controls="collapseOne">
                            ${name}
                        </button>
                    </h2>
                    <div id="innerCollapse${index}" class="accordion-collapse collapse"
                         data-bs-parent="#inneraccordion">
                        <div class="accordion-body airportList">
        
                        </div>
                    </div>
                </div>
            </div>
    `;
    });

    drawTarget.replaceChildren();
    drawTarget.insertAdjacentHTML('afterbegin', str);

}



//해당국가 공항정보조회
function getAirportInfo(nationalName, e){

    $.ajax({
        url: '/airline/getAirportInfoAJAX', //요청경로
        type: 'post',
        //contentType : 'application/json; charset=UTF-8',
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        async : true,
        data: {'nationalName': nationalName},
        success: function(result) {
            console.log(result);
            drawAirportInfo(result, e);
        },
        error: function() {
            alert('실패');
        }
    });
}

//공항정보 그리기
function drawAirportInfo(result, e){

    const airportList = e.parentNode.parentNode.querySelector('.airportList');

    console.log(airportList);

    let airportStr = '';

    result.forEach(i => {
        const trimStr = i['KOR_AIRPORT_NAME'].replace(' 국제공항', '');

        airportStr += `
            <p onclick="setAreaNAme('${trimStr}', '${i['AIRPORT_CODE']}');">${i['KOR_AIRPORT_NAME']}(${i['AIRPORT_CODE']})</p><br>
        `;
    });

    airportList.replaceChildren();
    airportList.insertAdjacentHTML('afterbegin', airportStr);
}

function setAreaNAme(name, code){

    const modalTitle = document.querySelector('.modal-title').textContent;
    const textTarget = document.querySelectorAll('.korName');

    if(modalTitle == '출발지선택'){
        textTarget[0].textContent = name;
        textTarget[0].nextElementSibling.textContent = code;
    }
    else {
        textTarget[1].textContent = name;
        textTarget[1].nextElementSibling.textContent = code;

    }


}









function openOutterModal(e) {
    const text = e.querySelector('h5').textContent;
    const modalTitle = document.querySelector('.modal-title');

    modalTitle.textContent = text + '선택';

    const myModal = new bootstrap.Modal('#areaModal');
    const areaModal = document.querySelector('#areaModal');
    myModal.show(areaModal);

}




