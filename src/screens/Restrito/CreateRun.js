import React, { Component } from 'react'
import ActionCreators from '../../redux/actionCreators'
import { connect } from 'react-redux'

import { Button, Segment, Form } from 'semantic-ui-react'

import InputMoment from 'input-moment'
import 'input-moment/dist/input-moment.css'
import moment from 'moment'
//import { Redirect } from 'react-router-dom';
//import momentTz from 'moment-timezone' 
import { Link } from 'react-router-dom'

function criarStadoInicial() {
    return {
        friendly_name: '',
        duration: 0,
        distance: 0,
        created: moment(),
        error: ''
    }
}

class CreateRun extends Component{   
    state = criarStadoInicial()
    componentDidMount(){
        this.props.reset()
    }
    handleChange = fieldname => event => {
        this.setState({
            [fieldname]: event.target.value
        })
    }
    handleCreateAnother = () => {
        /*
        this.state.friendly_name = ''
        this.state.duration = 0
        this.state.distance = 0
        this.state.created = moment()
        this.state.error = '' */
        this.setState(criarStadoInicial())
        this.props.reset()
    }
    handleSave = () => {
        const d = moment.tz(this.state.created, this.props.auth.user.timezone)
        const d2 = d.clone().utc().format('YYYY-MM-DD H:mm:ss')
        const distance = this.state.distance
        this.props.create({
            friendly_name: this.state.friendly_name,
            duration: this.state.duration,
            distance: this.props.auth.user.unit === 'metric' ? distance : distance*1.634,
            created: d2
        })
    }
    render(){
        if(this.props.runs.saved){
            return(
                <div>
                    <div>
                        <Segment color='green'>Created run with success!</Segment>
                    </div>
                    <div>
                        <Button onClick={this.handleCreateAnother} >Create Other</Button>
                        <Button as={Link} to='/restrito/runs'>Back</Button>
                    </div>
                </div>
            ) 
        }
        return (
            <div>
                <h1>Create Run</h1>
                { !this.props.runs.saved && 
                    <Form>
                        <Form.Field>
                            <label>Name:</label>
                            <input type='text' value={this.state.friendly_name} onChange={this.handleChange('friendly_name')} />
                        </Form.Field>
                        <Form.Field>
                            <label>Duration in Seconds:</label>
                            <input type='number' value={this.state.duration} onChange={this.handleChange('duration')} />
                        </Form.Field>
                        <Form.Field>
                            <label>Distance ({this.props.auth.user.unit === 'metric' ? 'Km' : 'mi'}):</label>
                            <input type='number' value={this.state.distance} onChange={this.handleChange('distance')} />
                        </Form.Field>
                        <Form.Field>
                            <label>Creation Date:</label>
                            <input type='text' value={this.state.created.format('DD/MM/YYYY  H:mm:ss')} onChange={this.handleChange('created')} />
                        </Form.Field>
                        <InputMoment 
                            moment={this.state.created}
                            onChange={(val) => this.setState({ created: val})}
                        />
                        <div>
                            <Button onClick={this.handleSave}>Create</Button>
                        </div>
                    </Form>
                }
            </div>    
        )
    }                           
}       

const mapStateToProps = state => {
    return {
        auth: state.auth,
        runs: state.runs
    }
}    

const mapDispatchToProps = dispatch => {
    return {
        create: (run) => dispatch(ActionCreators.createRunRequest(run)),
        reset: () => dispatch(ActionCreators.createRunReset())
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(CreateRun)