  function validateForm(event) {
    
    const formElements = document.querySelectorAll('form input, form textarea');


    for (let i = 0; i < formElements.length; i++) {
      let element = formElements[i];
      
      if (element.value.trim() === '') {
        // 입력 제출 막기
        event.preventDefault();
        alert('입력되지 않은 항목이 있습니다.');
        return;
      }
    }
  }

  // 폼 제출(submit) 이벤트 리스너 등록
  const form = document.getElementById('searchForm');
  form.addEventListener('submit', validateForm);