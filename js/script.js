"use strict"

document.addEventListener('DOMContentLoaded', function(){
    const loading = document.getElementById('form-loading');
    const form = document.getElementById('form');
    const popup2 = document.getElementById('popup-2');
    form.addEventListener('submit', formSend);

    async function formSend(e){
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);

        if (error === 0) {
            loading.classList.add('_sending');
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            if(response.ok){
                let result = await response.json();
                alert(result.message);
                form.reset();
                loading.classList.remove('_sending');
            }else{
                popup2.classList.add('open');
                loading.classList.remove('_sending');
            }
        }else{
            popup2.classList.add('open');
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);
            if (input.classList.contains('_tel')) {
                if(telTest(input)){
                    formAddError(input);
                    error++;
                }
            }else{
                if (input.value === '') {
                    formAddError(input);
                    error++; 
                }
            }
        }
        return error;
    }
    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    function telTest(input) {
        return !/^[\d\+][\d\(\)\ -]{4,14}\d$/.test(input.value);
    }
});
