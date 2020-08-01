import React, { Component } from 'react';
import "../styles/mainContent.css";

export class MainContent extends Component {

    render() {

        //Current Question To Show 
        const questionNumber = this.props.data.index;

        const evaluationDone = this.props.data.result.evaluated;

        //Mapping Questions Recieved Through Props
        const data = this.props.data.questionsData.map((data, index) => {
            return (
                <div /* Unique Key */ key={'#' + index}>

                    <div className="question-title">
                        <p>Q {index + 1}. {data.question}</p>
                    </div>

                    <div className="question-options">
                        <ul>
                            {/* Mapping Options */}
                            {data.options.map((option, i) => {
                                return (
                                    <li /* Unique Key */ key={'#option' + i} className={`${data.answer === option && evaluationDone ? 'correct' : ''}`}>
                                        <label className="option-label" htmlFor={'option' + i}>
                                            <input type="radio" name="option" id={'option' + i} /> <span>{option}</span>
                                        </label>
                                    </li>);
                            })}
                        </ul>
                    </div>

                    {/* If Evaluated Show Option To View Answer With Explanation */}
                    {evaluationDone && <> <div className="btn btn-success btn-sm" onClick={this.props.data.showSolution}>{this.props.data.show ? 'Hide' : 'Show'} Answer</div>
                        {this.props.data.show && <p class="answer-detail">{data.answerDetails}</p>}</>}
                </div>
            );
        })

        return (
            <div className="main-content">

                {/* Header */}
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <button className="back-btn btn btn-sm btn-outline-primary">Back</button>
                    <div id="navbarNav">
                        <span className="nav-link" >Assessment Test : <span>V Class - Maths/Batch C1</span></span>
                    </div>
                </nav>

                {/* Question Section */}
                <main className="questions-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-sm-12 col-xs-12 col-lg-12 col-md-12">
                                {data[questionNumber]}
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="footer">
                    <div className="footer-first btn-group">
                        <button className="btn btn-sm btn-primary mr-2" onClick={this.props.data.prevQues}>Previus</button>
                        <button className="btn btn-sm btn-primary" onClick={this.props.data.nextQues}>Skip / Next</button>
                    </div>
                    <div className="footer-second">
                        <small className="text-black-50 text-center">{questionNumber + 1} of {this.props.data.numOfQues}</small>
                    </div>
                    <div className="footer-third">
                        <button className="btn btn-sm btn-primary" onClick={this.props.data.submit} >Submit Test</button>
                    </div>
                </footer>
            </div>
        )
    }
}

export default MainContent;
