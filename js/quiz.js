// quiz.js: クイズのロジックを管理

// DOM要素の取得
const questionNumberElement = document.getElementById('question-number');
const questionTextElement = document.getElementById('question-text');
const questionImageElement = document.getElementById('question-image');
const choicesAreaElement = document.getElementById('choices-area');
const feedbackAreaElement = document.getElementById('feedback-area');
const feedbackTextElement = document.getElementById('feedback-text');
const explanationTextElement = document.getElementById('explanation-text');
const nextQuestionButton = document.getElementById('next-question-button');

let currentQuestionIndex = 0;
let score = 0;
let shuffledQuizData = []; // シャッフルされたクイズデータ

/**
 * クイズデータをシャッフルする (Fisher-Yatesアルゴリズム)
 * @param {Array} array シャッフルする配列
 * @returns {Array} シャッフルされた配列
 */
function shuffleArray(array) {
    const newArray = [...array]; // 元の配列をコピー
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // 要素を入れ替え
    }
    return newArray;
}

/**
 * クイズの初期化処理
 */
function initializeQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    shuffledQuizData = shuffleArray(quizData); // クイズデータをシャッフル
    feedbackAreaElement.style.display = 'none'; // フィードバックエリアを非表示
    nextQuestionButton.style.display = 'none'; // 「次の問題へ」ボタンを非表示
    displayQuestion();
}

/**
 * 現在の問題を表示する
 */
function displayQuestion() {
    // 全ての問題が終了した場合
    if (currentQuestionIndex >= shuffledQuizData.length) {
        showResultScreen(); // 結果表示画面へ
        return;
    }

    const currentQuestion = shuffledQuizData[currentQuestionIndex];

    // 問題番号と問題文の設定
    questionNumberElement.textContent = `第${currentQuestionIndex + 1}問`;
    questionTextElement.textContent = currentQuestion.question;

    // 画像の設定
    if (currentQuestion.image) {
        questionImageElement.src = currentQuestion.image;
        questionImageElement.style.display = 'block'; // 画像を表示
    } else {
        questionImageElement.style.display = 'none'; // 画像を非表示
    }

    // 選択肢の表示
    choicesAreaElement.innerHTML = ''; // 既存の選択肢をクリア
    currentQuestion.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.addEventListener('click', () => handleAnswer(index));
        choicesAreaElement.appendChild(button);
    });

    feedbackAreaElement.style.display = 'none'; // フィードバックエリアを隠す
    nextQuestionButton.style.display = 'none'; // 「次の問題へ」ボタンを隠す
    enableChoiceButtons(true); // 選択肢ボタンを有効化
}

/**
 * 回答処理
 * @param {number} selectedAnswerIndex ユーザーが選択した回答のインデックス
 */
function handleAnswer(selectedAnswerIndex) {
    enableChoiceButtons(false); // 回答後は選択肢ボタンを無効化

    const currentQuestion = shuffledQuizData[currentQuestionIndex];
    const correctAnswerIndex = currentQuestion.correctAnswerIndex;

    feedbackAreaElement.style.display = 'block'; // フィードバックエリア表示
    explanationTextElement.textContent = currentQuestion.explanation; // 解説文を設定

    if (selectedAnswerIndex === correctAnswerIndex) {
        // 正解の場合
        score++;
        feedbackTextElement.textContent = "正解！";
        feedbackTextElement.className = 'correct';
        feedbackAreaElement.className = 'correct';
        choicesAreaElement.children[selectedAnswerIndex].classList.add('correct');
    } else {
        // 不正解の場合
        feedbackTextElement.textContent = "残念！不正解...";
        feedbackTextElement.className = 'incorrect';
        feedbackAreaElement.className = 'incorrect';
        choicesAreaElement.children[selectedAnswerIndex].classList.add('incorrect');
        // 正解の選択肢もハイライト (任意)
        if (choicesAreaElement.children[correctAnswerIndex]) {
            choicesAreaElement.children[correctAnswerIndex].classList.add('correct');
        }
    }

    nextQuestionButton.style.display = 'block'; // 「次の問題へ」ボタンを表示
}

/**
 * 次の問題へ進む処理
 */
function goToNextQuestion() {
    currentQuestionIndex++;
    displayQuestion();
}

/**
 * 選択肢ボタンの有効/無効を切り替える
 * @param {boolean} enabled 有効にする場合はtrue
 */
function enableChoiceButtons(enabled) {
    const buttons = choicesAreaElement.getElementsByTagName('button');
    for (let button of buttons) {
        button.disabled = !enabled;
    }
}

// イベントリスナーの設定 (app.jsから呼び出される想定)
// nextQuestionButton.addEventListener('click', goToNextQuestion);
// initializeQuiz(); // 初期化はapp.jsのスタートボタン押下時に行う
