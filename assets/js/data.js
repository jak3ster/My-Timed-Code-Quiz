// creating an array and passing the number, questions, options, and answers
var poolQuestions = [
  q1 = {
    question: "A page designed in HTML is called _____",
    answer: "Web Page",
    options: [
      "Application",
      "Cover page",
      "Front-end",
      "Web Page"
    ]
  },
  q2 = {
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheet",
    options: [
      "Common Style Sheet",
      "Colorful Style Sheet",
      "Computer Style Sheet",
      "Cascading Style Sheet"
    ]
  },
  q3 = {
    question: "Choose the correct HTML tag for a large title.",
    answer: "H1",
    options: [
      "H1",
      "Heading",
      "Head",
      "H6"
    ]
  },
  q4 = {
    question: "Suppose we want to arrange three DIVs so that DIV 3 is placed above DIV1. Now, which CSS property are we going to use to control the stack order?",
    answer: "z-index",
    options: [
      "d-index",
      "s-index",
      "x-index",
      "z-index"
    ]
  },
  q5 = {
    question: "What does XML stand for?",
    answer: "eXtensible Markup Language",
    options: [
      "eXtensible Markup Language",
      "eXecutable Multiple Language",
      "eXTra Multi-Program Language",
      "eXamine Multiple Language"
    ]
  },
  q6 = {
    question: "If we want to place text around an image, which CSS property should we use?",
    answer: "float",
    options: [
      "push",
      "float",
      "align",
      "wrap"
    ]
  },
  q7 = {
    question: "The HTML document contains a root tag called ____",
    answer: "HTML",
    options: [
      "HEAD",
      "Title",
      "Body",
      "HTML"
    ]
  },
  q8 = {
    question: "An HTML document can contain _____",
    answer: "All the answers are true",
    options: [
      "Attributes",
      "Tags",
      "Raw text",
      "All the answers are true"
    ]
  }
  // you can uncomment the below codes and make duplicate as more as you want to add question
  // but remember you need to give the numb value serialize like 1,2,3,5,6,7,8,9.....

  // numb# = {
  //   question: "Your Question is Here",
  //   answer: "Correct answer of the question is here",
  //   options: [
  //     "Option 1",
  //     "option 2",
  //     "option 3",
  //     "option 4"
  //   ]
  // },

]// Store the object
localStorage.poolQuestionsData = JSON.stringify(poolQuestions);