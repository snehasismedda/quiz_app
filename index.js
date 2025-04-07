document.getElementById('quizForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const category = document.getElementById('category').value;
    const difficulty = document.getElementById('difficulty').value;
    const number = document.getElementById('number').value;
  
    
    const queryParams = new URLSearchParams();
  
    if (category) queryParams.append('category', category);
    if (difficulty) queryParams.append('difficulty', difficulty);
    if (number) queryParams.append('amount', number);
  
    window.location.href = `quiz.html?${queryParams.toString()}`;
    
  });
  