'use strict';

const e = React.createElement;



class ProgressBar extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return <div>
                <span className="badge" style={{'float': 'left', 'marginTop':'7px', 'width': '10%', 'textAlign': 'right'}}>{this.props.title}</span>
                <div className="progress m-1" style={{height: '30px', 'fontSize': '20px', 'fontWeight': 'bold'}}>
                      <div className={'p-1 progress-bar progress-bar-striped  progress-bar-animated ' + ( this.props.progress > 50 ? (this.props.progress > 80 ? 'bg-danger' : 'bg-warning') : 'bg-success')} role="progressbar" style={{width: this.props.progress+'%'}}>{this.props.progress}%</div>
                  </div>
            </div>
    }
  }

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        mem_usage: 0,
        temp: 0
    };
    this.updateStatus = this.updateStatus.bind(this)
  }


  updateStatus() {
      fetch('/api/status')
      .then((response) => response.json())
      .then((data) => this.setState(
          {
              ...this.state,
              mem_usage: data['utilization.memory [%]'],
              usage: data['utilization.gpu [%]'],
             temp: data['temperature.gpu'],
             mem_free: data['memory.free [MiB]'].replace(' MiB','')

        }))
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
                <ProgressBar progress={this.state.mem_usage} title='Memory' />
                <ProgressBar progress={this.state.usage} title='Usage' />
                <p style={{'fontSize': '24px', 'fontWeight': 'bold'}}>
                    <span className={'m-1 badge badge-secondary text-large ' + (this.state.temp > 65 ? 'badge-danger' : 'badge-success')}>{this.state.temp}&deg;C</span>
                    <span className={'m-1 badge badge-secondary text-large ' + (this.state.mem_free < 1000 ? 'badge-danger' : 'badge-success')}>{this.state.mem_free}M free</span>
                    </p>
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