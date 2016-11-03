import React, { Component, PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import {Doughnut} from 'react-chartjs-2'

class JobProspectMetrics extends Component {
  static propTypes = {
    jobs: PropTypes.array.isRequired
  }

  prospectStatus = () => {
    var counts = [0, 0, 0, 0]
    for (var i=0; i < this.props.jobs.length; i++) {
        if (this.props.jobs[i].status === 'Saved') {
          counts[0] += 1
        } else if (this.props.jobs[i].status === 'Applied') {
          counts[1] += 1
        } else if (this.props.jobs[i].status === 'Interviewing') {
          counts[2] += 1
        } else {
          counts[3] += 1
        }
    }
    return counts
  }


  render() {
    const data = {
    	labels: [
        'Saved',
    		'Applied',
    		'Interviewing',
        'Closed'
    	],
    	datasets: [{
    		data: this.prospectStatus(),
    		backgroundColor: [
    		'#FF6384',
    		'#36A2EB',
    		'#FFCE56'
    		],
    		hoverBackgroundColor: [
    		'#FF6384',
    		'#36A2EB',
    		'#FFCE56'
    		]
    	}]
    }

    return (
    <div className='col-xs-12'>
      <div className='jobmetriclist'>
          <h4 className="text-xs-center">Job Prospects Breakdown</h4>
            <div>
              <Doughnut
                data={data}
                width={450}
                height={250}
                options={{
                  rotation: -3.14,
                  circumference: 3.14,
                  maintainAspectRatio: false,
                  responsive: true
                }}
              />
              </div>
      </div>
    </div>
    )
  }
}

export default JobProspectMetrics
