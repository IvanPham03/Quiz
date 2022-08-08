// question
(function () {
  const myQuestion = [
    {
      question: "Who invented JavaScript",
      answers: {
        a: "Douglas Crockford",
        b: "Sheryl Sandberg",
        c: "Brendan Eich",
      },
      correctAnswer: "c",
    },

    {
      question: "Which one of these is a JavaScript package manager?",

      answers: {
        a: "Node.js",
        b: "TypeXScript",
        c: "npm",
      },
      correctAnswer: "c",
    },

    {
      question: "Which tool can you use to ensure code quality?",
      answers: {
        a: "Angular",
        b: "jQuery",
        c: "RequireJS",
        d: "ESLint",
      },
      correctAnswer: "d",
    },
  ];

  //  store references
  const nextBtn = document.getElementById("next");
  const preBtn = document.getElementById("pre");
  const submitBtn = document.getElementById("submit");
  const result = document.getElementById("result");
  const quizContainer = document.getElementById("quiz");
  
  function buildQuiz() {
    // luu cau hoi, dap an ra man hinh
    const output = [];
    
    myQuestion.forEach((valueQ, indexQ) => {
      // luu cac dap an a b c
      const answer = [];
      for (key in valueQ.answers) {
        // console.log(valueQ);
        // console.log(key);
        // console.log(valueQ.answers[key])
        answer.push(
          `<label>
          <input type='radio' name='question${indexQ}' value='${key}'>
          ${key}: ${valueQ.answers[key]}
          </label>`
          );
        }
        // console.log(answer);
      output.push(
        `<div class="slide">
        <div class="question">${valueQ.question}</div>
        <div class="answers">${answer.join("")}</div>
        </div>`
        );
      });
    quizContainer.innerHTML = output.join("");
  }
  
  function showQuiz() {
    // gather the answer from quiz
    const answerContainers = document.querySelectorAll(".answers");
    
    // correct answer
    let correctNumber = 0;
    // loop for answer
    myQuestion.forEach((v, i) => {
      // find answer
      const answerContainer = answerContainers[i];
      const selector = `input[name=question${i}]:checked`;
      
      // lay ket qua/ chua chon thi tra ve rong
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // neu dung thi cong
      if (v.correctAnswer === userAnswer) {
        correctNumber++;
        answerContainers[i].style.color = "blue";
      } else {
        answerContainers[i].style.color = "red";
      }
    });

    result.innerHTML = `${correctNumber} out of ${myQuestion.length} question`;
  }
  
  function nextSlide() {
    showSlide(currentSLide+1);
  }
  function preSlide() {
    showSlide(currentSLide-1);
  }
  function showSlide(n) {
    slide[currentSLide].classList.remove('active-slide');
    slide[n].classList.add('active-slide');
    currentSLide = n;
    
    if(currentSLide === 0) {
      preBtn.style.display = 'none';
      
    }
    else {
      preBtn.style.display = 'inline-block';
    }
    if(currentSLide === myQuestion.length-1) {
      submitBtn.style.display = 'inline-block';
      nextBtn.style.display = 'none';
    }
    else {
      submitBtn.style.display = 'none';
      nextBtn.style.display = 'inline-block';
    
    }
  }
  // always show
  buildQuiz();
  
  let currentSLide = 0;
  const slide = document.querySelectorAll('.slide');
  showSlide(currentSLide);
  // slide[1].style.opacity = '1';
  
  
  submitBtn.addEventListener("click", showQuiz);
  preBtn.addEventListener('click', preSlide);
  nextBtn.addEventListener('click', nextSlide);
})();
