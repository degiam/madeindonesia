import { Component } from 'react';
import Question from './question';

const lsTitle = 'surveyapps'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Website Satisfaction Survey',
      survey: [],
      isStart: false,
      isOver: false,
      time: {},
      seconds: 300,
    }
    this.timer = 0
    this.startTimer = this.startTimer.bind(this)
    this.countDown = this.countDown.bind(this)
    this.handleStart = this.handleStart.bind(this)
    this.handleEnd = this.handleEnd.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds)
    this.setState({ time: timeLeftVar })

    if ( window.localStorage.getItem(lsTitle+'-answer') ) {
      let data_timer = JSON.parse(window.localStorage.getItem(lsTitle+'-timer'))
      let data_answer = JSON.parse(window.localStorage.getItem(lsTitle+'-answer'))
      this.setState({
        isStart: true,
        survey: data_answer,
        seconds: data_timer,
      })
      this.startTimer()
    } else {
      window.localStorage.setItem(lsTitle+'-answer','')
      window.localStorage.setItem(lsTitle+'-timer','')
    }
  }

  secondsToTime(s) {
    let hours = Math.floor(s / (60 * 60))

    let divisor_for_minutes = s % (60 * 60)
    let minutes = Math.floor(divisor_for_minutes / 60)

    let divisor_for_seconds = divisor_for_minutes % 60
    let seconds = Math.ceil(divisor_for_seconds)

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    }
    return obj
  }

  startTimer() {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000)
    }
  }

  countDown() {
    let seconds = this.state.seconds - 1
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    })

    window.localStorage.setItem(lsTitle+'-timer',this.state.seconds)

    if ( seconds === 0 ) { 
      this.setState({
        isOver: true,
      })
      clearInterval(this.timer)
    }
  }

  handleStart() {
    this.startTimer()
    this.setState({
      isStart: true,
    })
  }

  handleEnd() {
    this.timer = 0
    this.setState({
      survey: [],
      isStart: false,
      isOver: false,
      time: {},
      seconds: 300,
    })
    window.localStorage.removeItem(lsTitle+'-timer')
    window.localStorage.removeItem(lsTitle+'-answer')
  }

  handleSubmit(event) {
    event.preventDefault()
    if ( this.state.survey.length !== 10 ) {
      let data_new = [
        {
          number: event.target.number.value,
          answer: event.target.survey.value,
        }
      ]
      if ( this.state.survey.length === 0 ) {
        this.setState({
          survey: data_new
        })
      } else {
        this.setState({
          survey: [...this.state.survey, ...data_new]
        })
      }
    }
    if ( this.state.survey.length >= 9 ) {
      clearInterval(this.timer)
      this.timer = 0
      this.setState({
        time: {},
        seconds: 300,
      })
    }
    setTimeout(() => {
      window.localStorage.setItem(lsTitle+'-answer',JSON.stringify(this.state.survey))
    },500)
  }

  render() {
    return (
      <div className="App max-md:h-screen max-md:overflow-hidden">
        <div className="h-screen max-md:overflow-auto max-md:pb-[6.7rem]">
          <div className="flex flex-col items-center justify-center min-h-full p-7">

            <div className="w-full max-w-[500px]">

              <section className="card">
                <div className="w-fit mx-auto mb-8 px-4 py-3 bg-zinc-100 rounded-lg">
                  {(this.state.survey.length !== 10 && !this.state.isOver && this.state.isStart) &&
                    <>
                      {this.state.time.m < 10 ? `0${this.state.time.m}` : this.state.time.m} : {this.state.time.s < 10 ? `0${this.state.time.s}` : this.state.time.s}
                    </>
                  }
                  {(this.state.survey.length === 10 || this.state.isOver || !this.state.isStart) &&
                    <>
                      -- : --
                    </>
                  }
                </div>

                {!this.state.isStart &&
                  <>
                    <h1 className="text-xl mt-4 mb-3 text-center font-bold">
                      {this.state.title}
                    </h1>
                    <p className="text-center mb-10 opacity-50">You only have 5 minutes for 10 questions</p>
                    <button type="button" className="button mt-7" onClick={this.handleStart}>
                      Start
                    </button>
                  </>
                }
                {this.state.isStart && this.state.survey.length < 1 &&
                  <Question 
                    number="1"
                    question="How satisfied are you with the overall design of the website?"
                    answer1="Very Satisfied"
                    answer2="Somewhat Satisfied"
                    answer3="Not Satisfied"
                    onSubmit={this.handleSubmit}
                  />
                }
                {this.state.survey.length === 1 && !this.state.isOver &&
                  <Question 
                    number="2"
                    question="How easy was it to navigate the website?"
                    answer1="Very Easy"
                    answer2="Somewhat Easy"
                    answer3="Not Easy"
                    onSubmit={this.handleSubmit}
                  />
                }
                {this.state.survey.length === 2 && !this.state.isOver &&
                  <Question 
                    number="3"
                    question="How satisfied are you with the speed of the website?"
                    answer1="Very Satisfied"
                    answer2="Somewhat Satisfied"
                    answer3="Not Satisfied"
                    onSubmit={this.handleSubmit}
                  />
                }
                {this.state.survey.length === 3 && !this.state.isOver &&
                  <Question 
                    number="4"
                    question="How useful was the information provided on the website?"
                    answer1="Very Useful"
                    answer2="Somewhat Useful"
                    answer3="Not Useful"
                    onSubmit={this.handleSubmit}
                  />
                }
                {this.state.survey.length === 4 && !this.state.isOver &&
                  <Question 
                    number="5"
                    question="Were you able to find what you were looking for on the website?"
                    answer1="Yes"
                    answer2="No"
                    answer3="Partially"
                    onSubmit={this.handleSubmit}
                  />
                }
                {this.state.survey.length === 5 && !this.state.isOver &&
                  <Question 
                    number="6"
                    question="How visually appealing is the website?"
                    answer1="Very Appealing"
                    answer2="Somewhat Appealing"
                    answer3="Not Appealing"
                    onSubmit={this.handleSubmit}
                  />
                }
                {this.state.survey.length === 6 && !this.state.isOver &&
                  <Question 
                    number="7"
                    question="How satisfied are you with the website's mobile responsiveness?"
                    answer1="Very Satisfied"
                    answer2="Somewhat Satisfied"
                    answer3="Not Satisfied"
                    onSubmit={this.handleSubmit}
                  />
                }
                {this.state.survey.length === 7 && !this.state.isOver &&
                  <Question 
                    number="8"
                    question="Were you able to complete your desired action on the website (e.g. making a purchase, filling out a form)?"
                    answer1="Yes"
                    answer2="No"
                    answer3="Partially"
                    onSubmit={this.handleSubmit}
                  />
                }
                {this.state.survey.length === 8 && !this.state.isOver &&
                  <Question 
                    number="9"
                    question="How satisfied are you with the website's customer support?"
                    answer1="Very Satisfied"
                    answer2="Somewhat Satisfied"
                    answer3="Not Satisfied"
                    onSubmit={this.handleSubmit}
                  />
                }
                {this.state.survey.length === 9 && !this.state.isOver &&
                  <Question 
                    number="10"
                    question="How likely are you to visit the website again in the future?"
                    answer1="Very Likely"
                    answer2="Somewhat Likely"
                    answer3="Not Likely"
                    onSubmit={this.handleSubmit}
                  />
                }
                {(this.state.survey.length === 10 || this.state.isOver) &&
                  <>
                    <h2 className="text-xl font-bold mt-4 mb-8 text-center">
                      Thank you for completing the {this.state.title}
                    </h2>
                    <button type="button" className="button mt-7" onClick={this.handleEnd}>
                      Take a survey again
                    </button>
                  </>
                }
              </section>

            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default App;
