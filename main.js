txtInput = document.getElementById('txtInput');
btnVarSubmit = document.getElementById('btnVarSubmit');
frmVar = document.getElementById('frmVar');
varList = document.getElementById('varList');

txtRegras = document.getElementById('txtRegras');
btnRegSubmit = document.getElementById('btnRegSubmit');
frmReg = document.getElementById('frmReg');
regList = document.getElementById('regList');

varSelectModal = document.getElementById('varSelectModal');
btnVarSelectSave = document.getElementById('btnVarSelectSave');
varNameSelect = document.getElementById('varNameSelect');
varValSelect = document.getElementById('varValSelect');
varOpSelect = document.getElementById('varOpSelect');

formModal = document.getElementById('formModal');
finalForm = document.getElementById('finalForm');

closeModal = document.getElementsByName('closeModal');

bxRulDisplay = document.getElementById('bxRulDisplay');
bxFactDisplay = document.getElementById('bxFactDisplay');
btnFormRun = document.getElementById('btnFormRun');

structure = {
    'name': 'test',
    'vars': [],
    'rules': []
}
active = {
    'activeVar': -1,
    'activeReg': -1
}
dialog = null

function getActiveCell(name) {
    lnkVar = document.getElementsByName(name);
    for (let i = 0; i < lnkVar.length; i++) {
        const element = lnkVar[i];
        if (element.classList.contains('active')){
            return element
        }        
    }
}

function renderSelect() {
    if (structure['rules'][active['activeReg']] != undefined) {
        bxRulDisplay.innerHTML = ''
        bxFactDisplay.innerHTML = ''
        structure['rules'][active['activeReg']]['value'].forEach((el) => {
            bxRulDisplay.innerHTML += `
                <div class="col-5">
                    <select class="form-select" disabled>
                        <option value="${el['var']}">${el['var']}</option>
                    </select>
                </div>
                <div class="col-5">
                    <select class="form-select" disabled>
                        <option value="${el['value']}">${el['value']}</option>
                    </select>
                </div>
                <div class="col-2">
                    <select class="form-select" disabled>
                        <option value="${el['operator']}">${el['operator']}</option>
                    </select>
                </div>
            `
        })
        structure['rules'][active['activeReg']]['result'].forEach((el) => {
            bxFactDisplay.innerHTML += `
                <div class="col-5">
                    <select class="form-select" disabled>
                        <option value="${el['var']}">${el['var']}</option>
                    </select>
                </div>
                <div class="col-5">
                    <select class="form-select" disabled>
                        <option value="${el['value']}">${el['value']}</option>
                    </select>
                </div>
                <div class="col-2">
                    <select class="form-select" disabled>
                        <option value="${el['operator']}">${el['operator']}</option>
                    </select>
                </div>
            `
        })
    }
}

function setCellClickListener(name) {
    activeStr = ''
    if (name == 'lnkReg') {
        activeStr = 'activeReg'
    } else if (name == 'lnkVar') {
        activeStr = 'activeVar'
    }

    lnk = document.getElementsByName(name);
    lnk.forEach(element => {
        element.addEventListener('click', (e) => {
            console.log(active[activeStr]);
            console.log(lnk[active[activeStr]]);
            if (lnk[active[activeStr]] == undefined || lnk[active[activeStr]] != e.target) {
                console.log('1');
                if (lnk[active[activeStr]] != undefined && lnk[active[activeStr]] != e.target) {
                    console.log('2');
                    lnk[active[activeStr]].classList.remove('active')
                }
                e.target.classList.add('active')
                active[activeStr] = Array.from(e.target.parentNode.children).indexOf(e.target);
            } else {
                console.log('3');
                lnk[active[activeStr]].classList.remove('active')
                active[activeStr] = -1
            }
            if (activeStr == 'activeReg') {
                renderSelect()
            }
        })
    })
}

frmVar.addEventListener('submit', (e) => {
    varName = txtInput.value
    if (varName == '') {
        window.alert('Por favor preencha os campos corretamente.')
    } else {
        txtInput.value = ''
        activeCell = getActiveCell('lnkVar')
        
        if (activeCell) {
            structure['vars'].forEach(el => {
                if (el['name'] == activeCell.id) {
                    el['value'].push(varName)
                }
            })
            activeCell.innerHTML += `
                <ul>
                    <li>${varName}</li>
                </ul>
            `
        } else {
            if (!structure['vars'].find((el) => el['name'] == varName)) {
                structure['vars'].push({
                    'name': varName,
                    'value': []
                })
                varList.innerHTML += `<a href='#' class='list-group-item list-group-item-action' name='lnkVar' id='${varName}'>${varName}</a>`;
            } else {
                window.alert('Esta variável já existe')
            }
        }
        setCellClickListener('lnkVar')
    }
    e.preventDefault();
})

frmReg.addEventListener('submit', (e) => {
    regName = txtRegras.value
    if (regName == '') {
        window.alert('Por favor preencha os campos corretamente.')
    } else {
        txtRegras.value = ''
        activeCell = getActiveCell('lnkReg')
    
        if (!structure['rules'].find((el) => el['name'] == regName)) {
            structure['rules'].push({
                'name': regName,
                'value': [],
                'result': []
            })
            regList.innerHTML += `<a href='#' class='list-group-item list-group-item-action' name='lnkReg' id='${regName}'>${regName}</a>`;
        } else {
            window.alert('Esta regra já existe')
        }
        setCellClickListener('lnkReg')
    }
    e.preventDefault();
})

varNameSelect.addEventListener('change', (e) => {
    selectedVar = e.target.value
    varData = structure['vars'].filter((el) => el['name']==selectedVar)
    
    varValSelect.innerHTML = `
        ${varData[0]['value'].map((el) => {
            return `
                <option value="${el}">${el}</option>
            `
        })}
    `
})

addRuleVar.addEventListener('click', (e) => {
    if (active['activeReg'] == -1) {
        window.alert('Por favor selecione uma regra antes')
    } else {
        dialog = 'rule'
        varSelectModal.showModal()
        varNameSelect.innerHTML = `
            ${structure['vars'].map((el) => {
                return `
                    <option value="${el['name']}">${el['name']}</option>
                `
            })}
        `
        varData = structure['vars'].filter((el) => el['name']==varNameSelect.value)
    
        varValSelect.innerHTML = `
            ${varData[0]['value'].map((el) => {
                return `
                    <option value="${el}">${el}</option>
                `
            })}
        `
    }
})

addFactVar.addEventListener('click', (e) => {
    if (active['activeReg'] == -1) {
        window.alert('Por favor selecione uma regra antes')
    } else {
        dialog = 'fact'
        varSelectModal.showModal()
        varNameSelect.innerHTML = `
            ${structure['vars'].map((el) => {
                return `
                    <option value="${el['name']}">${el['name']}</option>
                `
            })}
        `
        varData = structure['vars'].filter((el) => el['name']==varNameSelect.value)
    
        varValSelect.innerHTML = `
            ${varData[0]['value'].map((el) => {
                return `
                    <option value="${el}">${el}</option>
                `
            })}
        `
    }
})

btnVarSelectSave.addEventListener('click', (e) => {
    structure['rules'][active['activeReg']][dialog=='fact' ? 'result' : 'value'].push({
        'var': varNameSelect.value,
        'value': varValSelect.value,
        'operator': varOpSelect.value
    })
    e.target.parentElement.close()
    renderSelect()    
})

closeModal.forEach((el) => {
    el.addEventListener('click', (e) => {
        e.target.parentElement.close()
    })
})

btnRun.addEventListener('click', (e) => {
    formModal.showModal()
    finalForm.innerHTML = ''
    for (let i = 0; i < structure['vars'].length; i++) {
        const varObj = structure['vars'][i];

        finalForm.innerHTML += `
            <div class="col-5">
                <select class="form-select" disabled>
                    <option value="${varObj['name']}">${varObj['name']}</option>
                </select>
            </div>
        `
        if (varObj['value'].length > 0) {
            finalForm.innerHTML += `
                <div class="col-5">
                    <select class="form-select" id="${varObj['name']}Result">
                        ${varObj['value'].map((el) => {
                            return `
                                <option value="${el}">${el}</option>
                            `
                        })}
                    </select>
                </div>
            `
        } else {
            finalForm.innerHTML += `
                <div class="col-5">
                    <select class="form-select" id="${varObj['name']}Result">
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>
            `
        }
    }
})

btnFormRun.addEventListener('click', (e) => {
    result = []
    structure['rules'].forEach((el) => {
        pastOperator = ''
        ruleResult = false
        console.log(el);
        el['value'].forEach((ele) => {
            projection = document.getElementById(ele['var']+'Result')
            intendedVal = ele['value'] ? ele['value'] : 'true'
            if (pastOperator=='E') {
                ruleResult = (projection.value=='true' && ruleResult)
            } else if (pastOperator=='OU') {
                ruleResult = (projection.value=='true' || ruleResult)
            } else {
                ruleResult = projection.value=='true'
            }
            pastOperator = ele['operator']
        })
        console.log(ruleResult);
        if (ruleResult) {
            result.push(el['result'])
        }
    })
    console.log(result);
    // e.target.parentElement.close()
})

// varSelect.addEventListener()

setCellClickListener('lnkVar')
setCellClickListener('lnkReg')
renderSelect()

/*
<a href='#' class='list-group-item list-group-item-action active' aria-current='true'>
The current link item
</a>
<a href='#' class='list-group-item list-group-item-action'>A second link item</a>
<a href='#' class='list-group-item list-group-item-action'>A third link item</a>
<a href='#' class='list-group-item list-group-item-action'>A fourth link item</a>
<a class='list-group-item list-group-item-action disabled' aria-disabled='true'>A disabled link item</a>
*/