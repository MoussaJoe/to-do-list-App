import React from "react";

class ToDo extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            completed: this.props.task.completed
        };
        this.toggleCompleted = this.toggleCompleted.bind(this);
    }
    
    toggleCompleted() {
        this.setState(prevState => (
            {
                completed: !prevState.completed,
            }
        ))
        this.props.onToggleCompleted(this.props.task.id);
    }
    
    render() {
        return(
            <li className={`list-group-item d-flex justify-content-between align-items-center ${this.state.completed && 'bg-success'}`}>
                {this.props.task.name}
                <button className={`btn btn-sm ml-auto + ${this.state.completed ? 'btn-success' : 'btn-outline-success' }`} onClick={this.toggleCompleted}>&#x2713;{this.props.task.completed}</button>
            </li> 
        );
    }
}
export default ToDo;