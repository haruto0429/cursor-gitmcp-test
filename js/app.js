// app.js: アプリケーション全体の制御と画面遷移

// DOM要素の取得
const startScreenElement = document.getElementById('start-screen');
const quizScreenElement = document.getElementById('quiz-screen');
const resultScreenElement = document.getElementById('result-screen');

const startButton = document.getElementById('start-button');
// quiz.jsで既に取得済みのため、ここでは不要 (nextQuestionButton)
// const nextQuestionButton = document.getElementById('next-question-button');
const retryButton = document.getElementById('retry-button');

const scoreTextElement = document.getElementById('score-text');
const resultMessageElement = document.getElementById('result-message');

/**
 * 画面を切り替える
 * @param {HTMLElement} activeScreen 表示する画面の要素
 */
function switchScreen(activeScreen) {
    // 全ての画面を非表示にする
    startScreenElement.classList.remove('active');
    quizScreenElement.classList.remove('active');
    resultScreenElement.classList.remove('active');

    // 指定された画面を表示する
    activeScreen.classList.add('active');
}

/**
 * クイズを開始する処理
 */
function startQuiz() {
    switchScreen(quizScreenElement);
    initializeQuiz(); // quiz.jsの関数を呼び出してクイズを初期化・開始
}

/**
 * 結果画面を表示する処理 (quiz.jsから呼び出される)
 * この関数は quiz.js の displayQuestion の最後に呼び出される想定なので、
 * quiz.js側でのグローバルスコープへの公開、またはapp.jsからの参照方法を検討する必要があります。
 * 今回はグローバルスコープにある前提で進めます。
 */
function showResultScreen() {
    switchScreen(resultScreenElement);
    scoreTextElement.textContent = `あなたのスコアは: ${shuffledQuizData.length}問中${score}問正解です！`;

    // スコアに応じたメッセージを設定
    let message = "";
    const percentage = (score / shuffledQuizData.length) * 100;
    if (percentage === 100) {
        message = "素晴らしい！全問正解です！あなたは猫博士！";
    } else if (percentage >= 70) {
        message = "おめでとうございます！なかなかの猫知識ですね！";
    } else if (percentage >= 40) {
        message = "まずまずですね！もっと猫のことを知ってみましょう！";
    } else {
        message = "残念！もっと頑張りましょう！";
    }
    resultMessageElement.textContent = message;
}


/**
 * クイズをリトライする処理
 */
function retryQuiz() {
    switchScreen(startScreenElement);
    // 必要であれば、ここでquiz.jsの状態をリセットする処理を呼び出す
    // (initializeQuizが呼ばれるので、基本的には不要)
}

// イベントリスナーの設定
startButton.addEventListener('click', startQuiz);
// nextQuestionButtonのイベントリスナーはquiz.js内で設定済み、またはquiz.jsの関数を直接呼び出す
// 今回はquiz.jsのgoToNextQuestionを直接割り当てます。
document.getElementById('next-question-button').addEventListener('click', goToNextQuestion); // quiz.jsの関数
retryButton.addEventListener('click', retryQuiz);

// 初期画面表示
switchScreen(startScreenElement);
