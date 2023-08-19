const inquirer = require('inquirer');
const table = require('table');

function showTable(data, cb){
    let tableData = "test"
    inquirer.createPromptModule([
        {
            message: tableData,
            type: 'input',
            name: 'name'
        }
    ])
    .then( () => {
        if(cb) cb();
        console.log("done!");
    })
}

dbData = [
    { id: 1, name: "Rich" },
    { id: 2, name: "Scarlet" },
    { id: 3, name: "Nellie" },
]