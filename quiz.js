document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.querySelector('.quiz-container');
    const questionText = document.getElementById('questionText');
    const optionButtons = document.querySelectorAll('.option-btn');
    const nextButton = document.getElementById('nextBtn');
    const qnoText = document.getElementById('questionNumber');
  
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const difficulty = params.get('difficulty');
    const amount = params.get('amount') || 5;
  
    let query = `amount=${amount}&type=multiple`;
    if (category) query += `&category=${category}`;
    if (difficulty) query += `&difficulty=${difficulty}`;
    const API_URL = `https://opentdb.com/api.php?${query}`;
  
    let questions = [];
    let current = 0;
    let score = 0;
  
    loadQuiz();
  
    async function loadQuiz() {
      document.getElementById('loader').style.display = 'flex'; // Show loader
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    
        const data = await response.json();
        questions = data.results;
        if (!questions || questions.length === 0) throw new Error('No questions found.');
    
        renderQuestion();
      } catch (error) {
        console.log(error);
        alert("Error Occurred!! Please Retry");
        window.location.href=`index.html`
      } finally {
        document.getElementById('loader').style.display = 'none'; // Hide loader
      }
    }
    
  
    function renderQuestion() {
        const currentQuestion = questions[current];
        const options = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
        const shuffledOptions = options.sort(() => Math.random() - 0.5);
        nextBtn.disabled = true;
        nextBtn.classList.add('disabled');
    
    
        qnoText.textContent = `Question ${current + 1} of ${questions.length}`;
        questionText.innerHTML = decodeHTML(currentQuestion.question);
    
        optionButtons.forEach((btn, idx) => {
            btn.textContent = decodeHTML(shuffledOptions[idx]);
            btn.classList.remove('correctans', 'wrongans');
            btn.disabled = false;
            btn.onclick = checkAns;
        });
  
      
    }
  
    function checkAns(e) {
      const selected = e.target;
      const selectedAnswer = selected.textContent;
      const correctAnswer = decodeHTML(questions[current].correct_answer);
  
      if (selectedAnswer === correctAnswer) {
        selected.classList.add('correctans');
        score++;
      } else {
        selected.classList.add('wrongans');
        optionButtons.forEach(btn => {
          if (btn.textContent === correctAnswer) {
            btn.classList.add('correctans');
          }
        });
      }
  
      optionButtons.forEach(btn => btn.disabled = true);
      nextBtn.disabled = false;
      nextBtn.classList.remove('disabled');
      
    }
  
    nextButton.addEventListener('click', () => {
      current++;
      if (current < questions.length) {
        renderQuestion();
      } else {
        const totalQs = questions.length;
        window.location.href = `result.html?score=${score}&total=${totalQs}`;   
      }
    });
  
    function decodeHTML(html) {
      const txt = document.createElement('textarea');
      txt.innerHTML = html;
      return txt.value;
    }
  });
  