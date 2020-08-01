import React, { Component } from 'react';
import MainContent from "./components/MainContent";
import SideContent from "./components/SideContent";
import './styles/main.css';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionIndex: 0,
      questionsData: [],
      showAnswer: false,
      resultData: {
        evaluated: false,
        answers: []
      },
    };

    //Methods To Trigger Changes In State
    this.goToPreviousQuestion = this.goToPreviousQuestion.bind(this);
    this.goToNextQuestion = this.goToNextQuestion.bind(this);
    this.questionByIndex = this.questionByIndex.bind(this);
    this.answerWithDescription = this.answerWithDescription.bind(this);
    this.submitTest = this.submitTest.bind(this);
  }

  //Move Back To Previous Question
  goToPreviousQuestion() {
    this.setState({
      questionIndex: this.state.questionIndex > 0 ? this.state.questionIndex - 1 : 0,
      showAnswer: false
    });
  }

  //Move To Next Question
  goToNextQuestion() {
    this.setState({
      questionIndex: this.state.questionIndex < 4 ? this.state.questionIndex + 1 : 4,
      showAnswer: false
    });
  }

  //Show Question By Index
  questionByIndex(index) {
    this.setState({
      questionIndex: index
    });
  }

  //Show Answer With Description Of Solution
  answerWithDescription() {
    this.setState({
      showAnswer: !this.state.showAnswer
    });
  }

  //Submit Test
  submitTest(e) {
    e.preventDefault();

    //Send Data To Server For Evaluation Here
    
    this.setState({
      resultData: {
        evaluated: true,
        answer: []
      }
    });
  }

  componentDidMount() {

    // API Call To Fetch Questions
    //Sample Questions Data 
    const questions = [
      {
        question: 'This is question 1?',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        answer: 'Option A',
        answerDetails: 'This Can Be Done as below ',
        userSelectedOption: ''
      },
      {
        question: 'This is question 2 ?',
        options: ['11', '121', '12', '22'],
        answer: '12',
        answerDetails: 'This Can Be Done as below',
        userSelectedOption: ''
      },
      {
        question: 'This is question 3?',
        options: ['A', 'B', 'C', 'D'],
        answer: 'C',
        answerDetails: 'This Can Be Done as below',
        userSelectedOption: ''
      },
      {
        question: 'This is question 4?',
        options: ['A', 'B', 'C', 'D'],
        answer: 'D',
        answerDetails: 'This Can Be Done as below',
        userSelectedOption: ''
      },
      {
        question: 'This is question 5?',
        options: ['A', 'B', 'C', 'D'],
        answer: 'A',
        answerDetails: 'This Can Be Done as below',
        userSelectedOption: ''
      }
    ];

    this.setState({
      questionsData: questions
    });
  }

  render() {

    //Passing Data As Props To Main Content Component
    const propsToMainContent = {
      index: this.state.questionIndex,
      questionsData: this.state.questionsData,
      numOfQues: this.state.questionsData.length,
      result: this.state.resultData,
      show: this.state.showAnswer,
      nextQues: this.goToNextQuestion,
      prevQues: this.goToPreviousQuestion,
      submit: this.submitTest,
      showSolution: this.answerWithDescription
    }

    //Passing Data As Props To Side Content Component
    const propsToSideContent = {
      numOfQues: this.state.questionsData.length,
      result: this.state.resultData,
      currQues: this.questionByIndex
    }

    return (
      <>
        {/* Main Component */}
        <MainContent data={propsToMainContent} />

        {/* Side Component */}
        <SideContent data={propsToSideContent} />
      </>
    )
  }
}

export default App;
