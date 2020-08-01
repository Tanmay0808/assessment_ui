import React, { Component } from 'react';
import "../styles/sideContent.css";

export class SideContent extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            minutes : 0,
            seconds : 0
        };
        this.handleTime = this.handleTime.bind(this);
    }

    handleTime()
    {
        const myInterval  = setInterval(()=>{
            if (this.state.seconds === 59)
            {
                this.setState({
                    minutes:this.state.minutes + 1,
                    seconds:0
                });
            }
            else{
                this.setState({
                    seconds:this.state.seconds + 1
                });
            }
            if (this.props.data.result.evaluated)
            {
                clearInterval(myInterval);
            }
        },1000);
    }

    componentDidMount() {

        //Toggle SideBar Window With Click Events
        var burgerIcon = document.querySelector('.burger-icon');
        var quesButtons = document.querySelector('.questions');
        var navBar = document.querySelector('.sidebar-content');
        var iconClose = document.querySelector('.navbar-toggle');
        burgerIcon.addEventListener('click', toggleNavbar);
        quesButtons.addEventListener('click', toggleNavbar);


        function toggleNavbar() {
            navBar.classList.toggle('collapse-navbar');
            iconClose.classList.toggle('fa-times');
            iconClose.classList.toggle('fa-bars');
        };

        this.handleTime();

    }

    render() {

        //Questions From Props Data
        const ques = [];
        for (let i = 0; i < this.props.data.numOfQues; i++) {
            ques.push(
                <button key={'#ques' + i} className="bg-primary text-white question-numbers" onClick={() => this.props.data.currQues(i)}>{i + 1}</button>
            );
        }
        //Assessment Evaluation Flag
        const evaluationDone = this.props.data.result.evaluated;

        const min = this.state.minutes;
        const sec = this.state.seconds;
        return (
            <>
                <div className="burger-icon"><i className="navbar-toggle fa fa-bars"></i></div>

                <div className="sidebar-content collapse-navbar">

                    {/* Header */}
                    <div className="sidebarNav bg-primary text-white">
                        <div>
                            {!evaluationDone ? <><span className="fa fa-clock mr-2"></span> Time Taken </> : <span>Marks</span>}
                        </div>
                        <div>
                            {!evaluationDone ? <span> {min > 9 ? min : `0${min}`} Mins {sec > 9 ? sec : `0${sec}`} Secs</span> : <span>50 / 50</span>}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="initial-section">
                        {evaluationDone ? <> <div className="result-filter">

                            {/* Filter For Results */}
                            <label for="all">
                                <input type="radio" name="filtertype" id="all" checked /> <span>All</span>
                            </label>
                            <label for="correct">
                                <input type="radio" name="filtertype" id="correct" /> <span>Correct</span>
                            </label>
                            <label for="wrong">
                                <input type="radio" name="filtertype" id="wrong" /> <span>Wrong</span>
                            </label>
                        </div>

                            {/* Results After Evaluation */}
                            <div className="result-table">
                                <table className="table">
                                    <thead>
                                        <td>Questions</td>
                                        <td>Answers</td>
                                    </thead>
                                    <tbody>
                                        {ques.map((e, i) => {
                                            return (
                                                <tr className="text-center">
                                                    <td>
                                                        {i + 1}
                                                    </td>
                                                    <td>
                                                        <span className="fa fa-check ml-3 text-success"></span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div></>
                            :
                            <>
                                {/* Questions Available  */}
                                <div className="questions">
                                    {ques}
                                </div>
                            </>}
                    </div>
                </div>
            </>
        )
    }
}

export default SideContent;
