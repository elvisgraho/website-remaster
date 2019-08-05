import React from 'react';
import QuizzOptions from '../molecules/QuizzOptions';
import quizzFinished from '../molecules/quizzFinished';

class Quizz extends React.Component {


  constructor(props) {
    super(props);

    this.animateID = 0;
    
    this.startTest = this.startTest.bind(this);
    this.closeTest = this.closeTest.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
    this.selectOption = this.selectOption.bind(this);
    this.restartTest = this.restartTest.bind(this);

    this.goBack = this.goBack.bind(this);
    this.goNext = this.goNext.bind(this);

    this.questionRef = React.createRef();

    this.answeredQuestions = [];
    this.answers = [];

    this.state = {
      isTestRunning: false,
      isTestFinished: false,

      currentQuestion: 0,
      totalQuestions: this.props.data.questions.length,
      rightAnswers: 0,

      currentSelectedIndex: undefined,

      answerClass: "",
      answerHeading: "",
      answerText: ""
    }
  }

  startTest () {
    if(!this.state.isTestRunning){
      this.setState({isTestRunning: true});
    }
  }

  selectOption (event) {
    if(undefined !== event.target.dataset.index 
      && "" === this.state.answerHeading 
      && 0 > this.answeredQuestions.indexOf(this.state.currentQuestion)){

      this.setState({currentSelectedIndex: parseInt(event.target.dataset.index)});
    }
  }

  closeTest () {
    if(this.state.isTestRunning){
      this.setState({isTestRunning: false});
    }
  }

  restartTest() {
    this.answeredQuestions = [];
    this.answers = [];

    this.setState({
      isTestRunning: true,
      isTestFinished: false,

      currentQuestion: 0,
      rightAnswers: 0,

      currentSelectedIndex: undefined,

      answerClass: "",
      answerHeading: "",
      answerText: ""
    });


    this.animateQuestion();
  }

  animateQuestion () {
    this.questionRef.current.classList.remove("quizz__active--visible");

    this.animateID = setTimeout(() => {
      this.questionRef.current.classList.add("quizz__active--visible");
    }, 100);
  }

  goBack () {
    let potentialNext = this.state.currentQuestion - 1;

    if( 0 < this.state.currentQuestion){
      if(0 <= this.answeredQuestions.indexOf(potentialNext)){
        //if this question was answered before
        this.ifQuestionWasAnswered(this.answeredQuestions.indexOf(potentialNext), potentialNext);
      }
      else {
        this.setState({
          currentQuestion: potentialNext,
          currentSelectedIndex: undefined,
          answerClass: "",
          answerHeading: "",
          answerText: ""
        });
      }

      this.animateQuestion();
      this.scrollToTop();
    }
  }

  goNext () {

    let potentialNext = this.state.currentQuestion + 1;

    if( this.state.totalQuestions > potentialNext){
      if(0 <= this.answeredQuestions.indexOf(potentialNext)){
        //if this question was answered before
        this.ifQuestionWasAnswered(this.answeredQuestions.indexOf(potentialNext), potentialNext);
      }
      else {
        this.setState({
          currentQuestion: potentialNext,
          currentSelectedIndex: undefined,
          answerClass: "",
          answerHeading: "",
          answerText: ""
        });
      }
    }
    else {
      this.setState({
        isTestFinished: true
      })
    }

    this.animateQuestion();
    this.scrollToTop();
  }

  showAnswer () {
    if(undefined !== this.state.currentSelectedIndex){
      //quizz__active__result--wrong or quizz__active__result--right
      let activeQuestion = this.props.data.questions[this.state.currentQuestion];

      if(activeQuestion.options[this.state.currentSelectedIndex].type === 'wrong'){
        this.setState({
          answerClass: "quizz__active__result--wrong",
          answerHeading: "Wrong",
          answerText: activeQuestion.options[this.state.currentSelectedIndex].help
        });

        this.answers.push({
          selectedIndex: this.state.currentSelectedIndex,
          answerClass: "quizz__active__result--wrong",
          answerHeading: "Wrong",
          answerText: activeQuestion.options[this.state.currentSelectedIndex].help
        });
      }
      else {
        this.setState({
          answerClass: "quizz__active__result--right",
          answerHeading: "Right",
          answerText: activeQuestion.options[this.state.currentSelectedIndex].help,
          rightAnswers: this.state.rightAnswers + 1
        });

        this.answers.push({
          selectedIndex: this.state.currentSelectedIndex,
          answerClass: "quizz__active__result--right",
          answerHeading: "Right",
          answerText: activeQuestion.options[this.state.currentSelectedIndex].help,
        });
      }

      this.answeredQuestions.push(this.state.currentQuestion);
    }
  }

  
  ifQuestionWasAnswered(index, currentQuestion) {
    this.setState({
      currentQuestion: currentQuestion,
      currentSelectedIndex: this.answers[index].selectedIndex,

      answerClass: this.answers[index].answerClass,
      answerHeading: this.answers[index].answerHeading,
      answerText: this.answers[index].answerText
    });
  }
  

  componentWillUnmount() {
    clearTimeout(this.animateID);
  }

  scrollToTop () {
    if(this.state.isTestRunning && 992 > window.innerWidth){
      if(this.questionRef && this.questionRef.current){
        window.scroll({
          top: this.questionRef.current.offsetTop - 100,
          behavior: 'smooth'
        });
      }   
    }
  }

  render () {
    const {isTestRunning, 
      currentQuestion, 
      totalQuestions, 
      currentSelectedIndex,
      answerText,
      answerClass,
      answerHeading,
      rightAnswers, 
      isTestFinished } = this.state;

    const { data } = this.props;

    return (
      <div className="quizz">
        {!isTestRunning ? (
          <div className="quizz__wrapper">
            <h2 className="headline headline--primary">{data.headline}</h2>
            <p className="text text--primary">{data.description}</p>
            <div className="button button--primary button--small" onClick={this.startTest}>{data.btnText}</div>
          </div>
        ) : (
          <div className="quizz__active quizz__active--visible" ref={this.questionRef}>

            {!isTestFinished ? (
              <React.Fragment>
                <h2 className="headline headline--secondary">{`Question ${currentQuestion + 1} out of ${totalQuestions}`}</h2>

                <h2 className="headline headline--quaternary">{data.questions[currentQuestion].questionText}</h2>

                <QuizzOptions 
                  questions={data.questions}
                  currentQuestion={currentQuestion}
                  currentSelectedIndex={currentSelectedIndex}
                  answerHeading={answerHeading}
                  selectOptionFunction = {this.selectOption}
                />


                <div className={"quizz__active__result " + answerClass}>
                  <h2 className="headline headline--tertiary">{answerHeading}</h2>
                  <p className="text text--secondary">{answerText}</p>
                </div>

                <div className="quizz__active__buttons">
                  <div className="button button--tertiary button--small" onClick={this.goBack}>{"< Back"}</div>
                  <div className="button button--secondary button--small" onClick={this.showAnswer}>{"Confirm"}</div>

                  {(currentQuestion + 1) === totalQuestions ? (
                    <div className="button button--tertiary button--small" onClick={this.goNext}>{"Finish!"}</div>
                  ) : (
                    <div className="button button--tertiary button--small" onClick={this.goNext}>{"Next >"}</div>
                  )}

                </div>

                <div className="button button--primary button--small" onClick={this.closeTest}>Close Quizz</div>
              </React.Fragment>
            ):(
              <React.Fragment>
                {quizzFinished(rightAnswers, totalQuestions, data.competionText, this.restartTest, this.closeTest)}
              </React.Fragment>
            )}
            

            
          </div>
        )}
      </div>
    )
  }
}


export default Quizz;