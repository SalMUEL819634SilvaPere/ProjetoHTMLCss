let B7Validator = {
    handleSubmit: (event) => {

        event.preventDefault();

        let send = true;

        let inputs = form.querySelectorAll('input');

        B7Validator.clearErrors();

        for (let i = 0; i < inputs.length; i++){

            let input = inputs[i];
            let check = B7Validator.checkInput(input);
            if ( check !== true){
                send = false;

                // exibir o erro
                B7Validator.showError(input , check);

            }
            console.log(input);
        }

        if(send){

            form.submit();

        }
    },
    checkInput: (input) =>{
        let rules = input.getAttribute('data-rules');
        if (rules !== null){
            rules = rules.split('|');
            for (let k in rules){
                let rDetails = rules[k].split('=');
                switch (rDetails[0]){

                    case 'required':
                        if (input.value == ''){
                            return 'Field Cannot be Empty.';
                        }
                    break;
                    case 'min':
                        if (input.value.length < rDetails[1]){
                            return 'Field Has to Have at Least '+rDetails[1]+' Characters';
                        }
                    break;
                    case 'email':
                        if(input.value != '' ){
                            let regex = /^([0-9a-zA-Z]+([_.-]?[0-9a-zA-Z]+)*@[0-9a-zA-Z]+[0-9,a-z,A-Z,.,-]*(.){1}[a-zA-Z]{2,4})+$/;
                            if (!regex.test(input.value.toLowerCase())){
                                return 'Email Typed is not Valid';
                            }
                        }
                    break    
                }

            }
        }
        return true;
    },
    showError:(input, error)=>{
        input.style.borderColor = '#FF0000';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement .insertBefore(errorElement, input.ElementSibling);
    },
    clearErrors:() =>{

        let inputs = form.querySelectorAll('input');

        for(let i = 0; i < inputs.length; i++){

            inputs[i].style = '';

        }

        let errorElements = document.querySelectorAll('.error');
        for (let i = 0; i< errorElements.length; i++){

            errorElements[i].remove();

        }
    }
}

let form = document.querySelector('.b7validator');
form.addEventListener('submit' , B7Validator.handleSubmit);