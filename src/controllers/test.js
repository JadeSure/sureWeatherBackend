
const bcrypt = require('bcrypt')
const fs = require('fs')

async function hashPassword(a) {
    return await bcrypt.hash(a, 10)
}

async function validatePassword(password1, password2) {
    return bcrypt.compare(password1, password2)
}


async function check() {
    const a = await hashPassword('sure')
    const b = await validatePassword('suree', a)
    console.log(b);
}


function a(b) {

    switch (b) {
        case 'eric':
            return 'fuck'
        case 'likui':
            return 'eat'
        default:
            console.log(`Fuck u!`);
    }

}

async function getStateCode() {
    fs.readFile('stateCode.csv', (err, data) => {
        if (err) throw err;
        console.log(data);
    })
}

getStateCode();
