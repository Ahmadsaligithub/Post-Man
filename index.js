

//hide the parameters bos 
let parametersBox = document.getElementById('parametersBox')
parametersBox.style.display = 'none'

//if the user click the params box hide json box
let paramsradio = document.getElementById('paramsradio')
paramsradio.addEventListener('click', () => {
    let requestJsonBox = document.getElementById('requestJsonBox')
    requestJsonBox.style.display = 'none'

    let parametersBox = document.getElementById('parametersBox')
    parametersBox.style.display = 'block' //show=block
})


//if the user click the json box hide  params box
let jsonradio = document.getElementById('jsonradio')
jsonradio.addEventListener('click', () => {
    let parametersBox = document.getElementById('parametersBox')
    parametersBox.style.display = 'none'

    let requestJsonBox = document.getElementById('requestJsonBox')
    requestJsonBox.style.display = 'block' //show=block
})

//if the user click the + button ,more parameters 
let addedParamCount = 0;

let plusbtn = document.getElementById('plusbtn')
plusbtn.addEventListener('click', clickfunction)
function clickfunction() {
    let params = document.getElementById('params')

    let html = `<div class="row my-2">
    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Key">
    </div>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Value">
    </div>
    <button style="width: 36px;" class="btn btn-primary delbtn">-</button>
</div>`
    params.innerHTML += html;

    // if the user click the remove button to remve the parameters of clicking the - button
    let delbtn = document.getElementsByClassName('delbtn')
    for (item of delbtn) {
        item.addEventListener('click', (e) => {
            //if you delete then confirmation
            let confirmTodelete = confirm('Are you sure you want to delete it!')
            if (confirmTodelete) {
                e.target.parentElement.remove();
            }
        })
    }
    addedParamCount++;
}

//if the user click the submit button
let submit = document.getElementById('submit')
submit.addEventListener('click', () => {
    //show please wait in the response box to reqst patience from the user


    let responsePrism = document.getElementById('responsePrism').innerHTML = "Please wait...Fetching response..."


    //Fetching all the values user has entered
    let url = document.getElementById('url').value;
    let RequestType = document.querySelector("input[name='RequestType']:checked").value;
    let ContentType = document.querySelector("input[name='ContentType']:checked").value;


    //(Content type)if user select the params option instead of json, collect all the parameters in an object 
    if (ContentType == 'params') {
        data = {};
        for (let i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value
                let value = document.getElementById('parameterValue' + (i + 1)).value
                data[key] = value;
            }
            data = JSON.stringify(data)
        }
    }
    else {
        data = document.getElementById('responsePrism').innerHTML
    }


    //(Request type)if the reqest type is GET 
    if (RequestType == 'GET') {
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.text())
            .then((text) => {
            
                document.getElementById('responsePrism').innerHTML = text
                Prism.highlightAll();
            });
    }
    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('responsePrism').innerHTML = text
                Prism.highlightAll();
            });
    }

})
