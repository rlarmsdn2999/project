const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.urlencoded({extended:false}));

app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname + '/public'));

app.get('/menu', (request, response) => {
    response.render('menu.html');
});

app.post('/menu', (request, response) => {
    const name = request.body.user_name;
    const score = request.body.user_score;

    fs.appendFileSync("ranking.txt", `\n${name}\n${score}`);

    response.render('menu.html');
});

app.get('/game', (request, response) => {
    response.render('game.html');
});

app.get('/how', (request, response) => {
    response.render('how.html');
});

app.get('/ranking', (request, response) => {
    let ranklist = sort();
    response.render('ranking.html', {rank_list:ranklist});
});

app.listen(55555, () => {
    console.log('server Running');
});

function sort() {
    let array = fs.readFileSync('ranking.txt').toString().split("\n");
    let user = [];
    let sort_user = [];
    let count = 0;

    for(i in array) {
        if(i % 2 == 1) {
            user[count] = Number(array[i]);
            count++;
        }
    }
    
    for(let i = 0; i < user.length; i++) {
        for(let j = 0; j < user.length; j++) {
            if(user[i] > user[j]) {
                swap = user[i];
                user[i] = user[j];
                user[j] = swap;
            }
        }
    }
    
    for(let i = 0; i < user.length; i++) {
        for(let j = 0; j < array.length; j++) {
            if(j % 2 == 1 && user[i] == Number(array[j])) {
                if(i == 0) {
                    sort_user[0] = array[j - 1];
                    sort_user[1] = array[j];
                } else {
                    sort_user[i * 2] = array[j - 1];
                    sort_user[(i + 1) * 2 - 1] = array[j];
                }
                
            }
        }
    }

    return sort_user;
}