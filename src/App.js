import React from 'react';
import ToDoList from './components/ToDoList';
import NavBar from './components/NavBar';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AddTask from './components/AddTask';
import initialData from './initialData';
import shortid from 'shortid';
import Fetching from './components/Fetching';

class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            tasks: [],
            fetching: false
        }
        this.onToggleCompleted = this.onToggleCompleted.bind(this);
        this.onAddTask = this.onAddTask.bind(this);
        this.onDeleteCompleted = this.onDeleteCompleted.bind(this);
        console.log("Bonjour de Constructor")
    }

    onToggleCompleted(taskID) {
        let taskToUpdate = this.state.tasks.find(task => (task.id === taskID));
        taskToUpdate.completed = !taskToUpdate.completed;
        this.setState(prevState => {
            prevState.tasks.map((task) => {return task.id === taskID ? taskToUpdate : task});
        })
    }

    onAddTask(newTaskName){
        let AddTask = {
            id: shortid.generate(),
            name: newTaskName,
            completed: false,
        }
        this.setState(prevState => ({
            tasks: [...prevState.tasks, AddTask]
        }))
         console.log(window);
    }

    onDeleteCompleted() {
        this.setState(prevState => {
            let newState = prevState.tasks.filter(task => !task.completed);
            return {
                tasks: newState
            }
        })
    }

    shouldComponentUpdate(){
        console.log("Bounjour de shouldComponentUpdate");
        return true;
    }

    componentDidMount(){
        let delay = Math.floor(Math.random() * 5000);

        setTimeout(() => {
            this.setState({
                tasks: initialData,
                fetching: true
            } 
            )
        }, delay);
        console.log("Bounjour de componentDidMount");
    }

    componentDidUpdate(){
        console.log("Bounjour de componentDidUpdate");
    }

    getSnapshotBeforeUpdate(){
        console.log("Bounjour de getSnapshotBeforeUpdate");
    }

    render(){
        console.log("Bounjour de render");
        return(
            
            <section id="todo">
                {this.state.fetching ? null : (<Fetching />)}
                <React.StrictMode>
                <BrowserRouter>
                <Routes>
                        <Route path="/add-task" element={<AddTask onAddTask={this.onAddTask}/>}/>
                        {/* <Route path="/*" children={({matches}) => (matches && (<ToDoList matches={matches} tasks={initialData} />))}/> */}
                        <Route path="/*" element={<ToDoList tasks={this.state.tasks} onToggleCompleted={this.onToggleCompleted}/>}/>
                        {/* render={(props) => <ToDoList {...props} tasks={initialData} />} */} 
                </Routes>
                <NavBar onDeleteCompleted={this.onDeleteCompleted}/>
                </BrowserRouter>
                </React.StrictMode>
            </section>
        )
    }
}
export default App;