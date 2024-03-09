txtInput = document.getElementById('txtInput');
btnVarSubmit = document.getElementById('btnVarSubmit');
frmVar = document.getElementById('frmVar');
varList = document.getElementById('varList');

structure = {
    "name": "test",
    "vars": [],
    "rules": []
}
active = -1

function getActiveCell() {
    lnkVar = document.getElementsByName('lnkVar');
    for (let i = 0; i < lnkVar.length; i++) {
        const element = lnkVar[i];
        if (element.classList.contains("active")){
            return element
        }        
    }
}

frmVar.addEventListener('submit', (e) => {
    varName = txtInput.value
    if (varName == '') {
        window.alert('Por favor preencha os campos corretamente.')
    }
    txtInput.value = ''
    activeCell = getActiveCell()
    
    if (activeCell) {
        structure["vars"].forEach(el => {
            console.log(el["name"]);
            console.log(activeCell.id);
            if (el["name"] == activeCell.id) {
                el["value"].push(varName)
                console.log(el);
            }
        })
        activeCell.innerHTML += `
            <ul>
                <li>${varName}</li>
            </ul>
        `
    } else {
        if (!structure["vars"].find((el) => el["name"] == varName)) {
            structure["vars"].push({
                "name": varName,
                "value": []
            })
            varList.innerHTML += `<a href="#" class="list-group-item list-group-item-action" name="lnkVar" id="${varName}">${varName}</a>`;
        } else {
            window.alert('Esta variável já existe')
        }
    }
    setCellClickListener()
    // console.log(structure)
    e.preventDefault();
})

function setCellClickListener() {
    lnkVar = document.getElementsByName('lnkVar');
    lnkVar.forEach(element => {
        element.addEventListener('click', (e) => {
            if (lnkVar[active] == undefined || lnkVar[active] != e.target) {
                if (lnkVar[active] != undefined && lnkVar[active] != e.target) {
                    lnkVar[active].classList.remove("active")
                }
                e.target.classList.add("active")
                active = Array.from(e.target.parentNode.children).indexOf(e.target);
            } else {
                lnkVar[active].classList.remove("active")
                active = -1
            }
        })
    })
}

setCellClickListener()

/*
<a href="#" class="list-group-item list-group-item-action active" aria-current="true">
The current link item
</a>
<a href="#" class="list-group-item list-group-item-action">A second link item</a>
<a href="#" class="list-group-item list-group-item-action">A third link item</a>
<a href="#" class="list-group-item list-group-item-action">A fourth link item</a>
<a class="list-group-item list-group-item-action disabled" aria-disabled="true">A disabled link item</a>
*/