document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const score = params.get('score');
    const total = params.get('total');

    const scoreText = document.getElementById('scoreText');
    if (scoreText) {
        scoreText.textContent = `You scored ${score} out of ${total}`;
    }
});
