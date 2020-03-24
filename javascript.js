var playing= false;
var score;
var action;
var timeremaining;
var correctanswer;
//If we click on start/reset box
document.getElementById("startreset").onclick= function(){
    if(playing==true){//If we are playing
        location.reload();//reload page
    }
    else{//If we arfe not playing
        playing= true;
        score=0;//set score to 0
        document.getElementById("scorevalue").innerHTML=score;
        //show countdown box

        show("timeremaining");
        timeremaining=60
        document.getElementById("timeremainingvalue").innerHTML= timeremaining;
        //Change button to reset
        document.getElementById("startreset").innerHTML="Reset game"
        //hide gameover box
        hide("gameover");

        startCountdown();
        //generate Q/A
        generateQA();
    }

}
for(i=1;i<5;i++){
     document.getElementById("box"+i).onclick=function(){
         if(playing==true){
             if(this.innerHTML==correctanswer){
                 //correct answer
                 score++;
                 document.getElementById("scorevalue").innerHTML=score;

                 hide("wrong");
                 show("correct");
                 setTimeout(function(){
                     hide("correct");
                 },1000);
                 //generate Q&A
                 generateQA();
             }
             else{
                 //wrong answer
                 hide("correct");
                 show("wrong");
                 setTimeout(function(){
                     hide("wrong");
                 },1000);
             }
         }
     }
    }
//If we click on answer box
    //If we are playing
        //correct?
            //yes
                //increase score
                //show correct box for 1s//generate new Q/A
            //no
                //show try again box for 1s

//start counter
function startCountdown(){
    action= setInterval(function(){
        timeremaining-=1;
        document.getElementById("timeremainingvalue").innerHTML= timeremaining;
        if(timeremaining==0){
            stopcountdown();
            show("gameover");
            document.getElementById("gameover").innerHTML="<p>Game over!</p><p>Your score is"+score+"</p>";
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing=false;
            document.getElementById("startreset").innerHTML="Start Game";
        }
    },1000)
}

//stop counter
function stopcountdown(){
    clearInterval(action);
}
//hide elements
function hide(Id){
    document.getElementById(Id).style.display="none";
}
//show elements
function show(Id){
    document.getElementById(Id).style.display="block";
}
function generateQA(){
    var x=1+Math.round(9*Math.random());
    var y=1+Math.round(9*Math.random());
    correctanswer= x*y;
    document.getElementById("question").innerHTML=x+"x"+y;
    var correctposition=1+Math.round(3*Math.random());
    document.getElementById("box"+correctposition).innerHTML=correctanswer;//fill the box with right answer
    var answers=[correctanswer];
    //fill all other box with wrong answer
    for(i=1;i<5;i++){
        if(i!=correctposition){
            var wronganswer;
            do{
                wronganswer=(1+Math.round(9*Math.random()))*(1+Math.round(9*Math.random()));

            }while(answers.indexOf(wronganswer)>-1);
            document.getElementById("box"+i).innerHTML=wronganswer;
        }
    }
}