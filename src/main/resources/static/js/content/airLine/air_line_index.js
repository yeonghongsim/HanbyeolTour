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
            <div class="row" onclick="setAreaNAme('${name['KOR_AIRPORT_NAME']}', '${name['AIRPORT_CODE']}');">
                <div class="col">
                    <span>${name['KOR_AIRPORT_NAME']}</span>
                    <span>${name['AIRPORT_CODE']}</span>
                </div>
            </div>
    `;
    });

    drawTarget.replaceChildren();
    drawTarget.insertAdjacentHTML('afterbegin', str);
}

function setAreaNAme(name, code){

    const modalTitle = document.querySelector('.modal-title').textContent;
    const textTarget = document.querySelectorAll('.korName');

    if(modalTitle == '출발지선택'){
        textTarget[0].textContent = name.split('(')[0];
        textTarget[0].nextElementSibling.textContent = code;
    }
    else {
        textTarget[1].textContent = name.split('(')[0];
        textTarget[1].nextElementSibling.textContent = code;

    }

    $('#areaModal').modal('hide');
}
//항공정보조회
function getFlightAJAX(){

    const depAirport = document.querySelector('#depAirport').textContent;
    const arrAirport = document.querySelector('#arrAirport').textContent;
    const depDate = document.querySelector('#depDate').value;
    const arrDate = document.querySelector('#arrDate').value;

    $.ajax({
        url: '/airline/getFlightAJAX', //요청경로
        type: 'post',
        //contentType : 'application/json; charset=UTF-8',
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        async : true,
        data: {'depAirport': depAirport, 'arrAirport': arrAirport, 'depDate': depDate, 'arrDate': arrDate},
        success: function(result) {
            const flightInfo = JSON.parse(result);
            console.log(flightInfo);

            drawFlightInfo(flightInfo);
        },
        error: function() {
            alert('실패');
        }
    });
}

function drawFlightInfo(flightInfo){

    //데이터삽입위치태그
    const depInfoTable = document.querySelector('.depInfoTable > tbody');
    const arrInfoTable = document.querySelector('.arrInfoTable > tbody');

    let depInfoStr = '';
    let arrInfoStr = '';

    flightInfo['dep'].forEach(flight => {
        let time = flight['internationalTime'].toString();

        depInfoStr += `
                <tr>
                    <td>${flight['internationalNum']}</td>                
                    <td>${flight['airlineKorean']}</td>                
                    <td>${time.substring(0, 2)}시  ${time.substring(2)}분</td>                
                </tr>
        `;
    });



    if(Object.keys(flightInfo).length != 1){

        flightInfo['arr'].forEach(flight => {
            let time = flight['internationalTime'].toString();

            arrInfoStr += `
                    <tr>
                        <td>${flight['internationalNum']}</td>                
                        <td>${flight['airlineKorean']}</td>                
                        <td>${time.substring(0, 2)}시  ${time.substring(2)}분</td>                
                    </tr>
            `;
        });
        arrInfoTable.replaceChildren();
        arrInfoTable.insertAdjacentHTML('afterbegin', arrInfoStr);

    }

    depInfoTable.replaceChildren();
    depInfoTable.insertAdjacentHTML('afterbegin', depInfoStr);
}




function openOutterModal(e) {
    const text = e.querySelector('h5').textContent;
    const modalTitle = document.querySelector('.modal-title');

    modalTitle.textContent = text + '선택';

    const myModal = new bootstrap.Modal('#areaModal');
    const areaModal = document.querySelector('#areaModal');
    myModal.show(areaModal);

}





document.querySelector('.airlineCate').classList.add("ye-S-fc");

