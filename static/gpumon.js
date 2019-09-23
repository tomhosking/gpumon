'use strict';

const e = React.createElement;



class ProgressBar extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return <div className="progress" style={{height: '30px', 'font-size': '20px', 'font-weight': 'bold'}}>
                      <div className={'p-1 progress-bar progress-bar-striped  progress-bar-animated ' + ( this.props.progress > 50 ? (this.props.progress > 80 ? 'bg-danger' : 'bg-warning') : 'bg-success')} role="progressbar" style={{width: this.props.progress+'%'}}>{this.props.progress}%</div>
                  </div>
    }
  }

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { usage: 0 };
    this.updateStatus = this.updateStatus.bind(this)
  }


  updateStatus() {
      fetch('/api/status')
      .then((response) => response.json())
      .then((data) => this.setState({...this.state, usage: data['utilization.memory [%]']}))
      .catch((err) => console.log(err))

      console.log(this.state)

      setTimeout(this.updateStatus, 10000)
  }

  componentDidMount()
  {
      this.updateStatus()
  }


  render() {
    return <div className="container p-2">
                <ProgressBar progress={this.state.usage} />
                {/* <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div> */}
            </div>
  }
}





const domContainer = document.querySelector('#react_root');


ReactDOM.render(e(App), domContainer);