import React,{Component} from 'react';

import {Line} from 'react-chartjs-2';

class Chart extends Component{
    state={
            type: 'line',
            data: this.props.data,
    }

    static defaultProps={
        displayTitle:true,
        displayLengent:true,
        legendPosition:'right',
    }

    render(){
        return(
            <div className="Dashboard__Chart">
                <Line
                    data={this.state.data}
                    width={100}
                    height={45}
                    options={{
                        title:{
                            display: this.props.displayTitle,
                            text: "Bar Chart",
                            fontSize: '25'
                        },
                        legend:{
                            display: this.props.displayLengent,
                            position: this.props.legendPosition,
                        },
                    }}
                />
            </div>
        );
    }
}

export default Chart;