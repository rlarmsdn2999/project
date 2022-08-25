const game = document.querySelector("#game");
const player = document.querySelector("#player");
const Enemy1 = document.querySelector("#Enemy1");
const Enemy2 = document.querySelector("#Enemy2");
const ScoreText = document.querySelector("#ScoreText span");
const SaveText = document.querySelector("#SaveText");
const SaveTextSpan = document.querySelector("#SaveText span");
const YesBtn = document.querySelector("#YesBtn");
const NoBtn = document.querySelector("#NoBtn");
const Score = document.getElementById("score");
const Name = document.getElementById("name");
Enemy1.classList.add("hidden");
Enemy2.classList.add("hidden");
game.classList.add("bgmove");
player.classList.add("move");
let isJump = false;
let Gameover = false;
let Enemytype = 0;
        
document.addEventListener("keydown", (e) => {
    if(e.key == "ArrowUp" && !isJump) {
        player.classList.add("jump");
        isJump = true;
    } else if (isJump) {
        return ;
    }
    setTimeout(() => {
        if(!Gameover)
        {
            player.classList.remove("jump");
            isJump = false;
        }
    }, 1000);
});

setInterval(() => {
    if(!Gameover)
    {
        //Enemytype = 0;
        let randNum = Math.random();
        Enemytype = (Math.floor(Math.random() * 100)) % 2;
        if(Enemytype) {
            Enemy2.classList.add("moveE2");
            Enemy1.classList.remove("moveE1");
            Enemy2.classList.remove("hidden");
            Enemy1.classList.add("hidden");
        }
        else {
            Enemy1.classList.add("moveE1");
            Enemy2.classList.remove("moveE2");
            Enemy2.classList.add("hidden");
            Enemy1.classList.remove("hidden");
        }
    }
    
}, 1400);

setInterval(() => {
    let PlayerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
    let Enemy1Left = parseInt(window.getComputedStyle(Enemy1).getPropertyValue("left"));
    let Enemy2Left = parseInt(window.getComputedStyle(Enemy2).getPropertyValue("left"));

    if(PlayerTop > 20 && (Enemy1Left < 150 || Enemy2Left < 100)) {
        player.classList.add("pause");
        Enemy1.classList.add("pause");
        Enemy2.classList.add("pause");
        game.classList.add("pause");
        Gameover = true;
        isJump = true;

        SaveText.classList.remove("hidden");
        YesBtn.classList.remove("hidden");
        NoBtn.classList.remove("hidden");
        Name.classList.remove("hidden");
        

        SaveTextSpan.textContent = ScoreText.textContent;
        Score.value = ScoreText.textContent;

        NoBtn.addEventListener("click", () => {
            window.location.href = '/menu';
        });
    }
}, 100);


setInterval(() => {
    if(!Gameover)
        ScoreText.textContent++;
}, 100)