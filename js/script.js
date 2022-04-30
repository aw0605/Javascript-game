const GAME_TIME = 9;

let time = GAME_TIME;
let isPlaying = false;
let score = 0;
let timeInterval;
let checkInterval;
const words = [
    {
        eng : 'apple',
        kor : '사과'
    },
    {
        eng : 'banana',
        kor : '바나나'
    },
    {
        eng : 'peach',
        kor : '복숭아'
    },
    {
        eng : 'grape',
        kor : '포도'
    },
    {
        eng : 'cherry',
        kor : '체리'
    },
    {
        eng : 'mango',
        kor : '망고'
    },
    {
        eng : 'strawberry',
        kor : '딸기'
    },
    {
        eng : 'watermelon',
        kor : '수박'
    },
    {
        eng : 'plum',
        kor : '자두'
    },
    {
        eng : 'pomegranate',
        kor : '석류'
    }
];

const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const beforeScore = document.querySelector('.before');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('button');

init();

function init(){
    BtnChange('Loading...');
    getWords();
    wordInput.addEventListener('input', checkMatch);
}

//게임 실행
function run(){
    if(isPlaying){
        return;
    }
    isPlaying = true;
    time = GAME_TIME;

    const randomIndex = Math.floor(Math.random()*words.length);
    wordDisplay.innerText = words[randomIndex].eng;

    wordInput.focus();
    wordInput.placeholder = '';

    beforeScore.innerText = '';
    scoreDisplay.innerText = 0;
    score = 0;

    timeDisplay.style.color = 'red';
    timeInterval = setInterval(countDown,1000);
    checkInterval = setInterval(checkStatus, 50);

    BtnChange('Gaming');
}

//게임 재시작 화면
function checkStatus(){
    if(!isPlaying && time === 0){
        wordInput.value = '';
        wordInput.placeholder = '영어단어의 뜻을 입력하세요';

        wordDisplay.innerHTML = 'Restart';

        beforeScore.innerText = '이전 ';

        BtnChange('Game Start');

        clearInterval(checkInterval);

        timeDisplay.style.color = "#000";
    }
}

// 단어불러오기 - API이용한 불특정 단어 불러오기 방법
// function getWords(){
//     axios.get('https://random-word-api.herokuapp.com/word?number=1000')
//   .then(function (response) {
//     response.data.forEach((word) => {
//         if(word.length < 10){
//             words.push(word);
//         }
//     })
//     console.log(words);
//     BtnChange('Game Start');
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
// }

// 단어 불러오기 - 내가 입력한 배열 이용
function getWords(){
    BtnChange('Game Start');
}


//단어일치 체크
function checkMatch(){
    // 입력된 값과 비교할 WordDisplay의 kor값
    const DisplayWord = wordDisplay.innerText;
    const WordIndex = words.findIndex(i => i.eng == DisplayWord);
    const MatchWord = words[WordIndex].kor;

    if(wordInput.value === MatchWord){
        // wordInput.value = null;=================?==================
        if(!isPlaying){
            return;
        }

        // 점수 획득 및 보이기
        score++;
        scoreDisplay.innerText = score;

        time = GAME_TIME;

        // 랜덤한 값 배열에서 추출 및 보이기
        const randomIndex = Math.floor(Math.random()*words.length);
        wordDisplay.innerText = words[randomIndex].eng;
    }
}

// 타이머 카운트다운
function countDown(){
    time > 0? time-- : isPlaying = false;
    if(!isPlaying){
        clearInterval(timeInterval);
    }
    timeDisplay.innerText = time;
}

// GAME START버튼 변화 - 게임실행 중에는 버튼 비활성화
function BtnChange(text){
    button.innerText = text;
    text === 'Game Start' ? button.classList.remove('loading') : button.classList.add('loading');
}