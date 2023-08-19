const inquirer = require('inquirer');
const table = require('table');

function showTable(data){
    let tableData = [];
    tableData = [
        Object.keys(data[0]),
         ...data.map(val => Object.values(val))];

    return await inquirer.prompt([
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