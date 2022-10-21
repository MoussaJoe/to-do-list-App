import React from 'react';
import { useMatch } from 'react-router-dom';
import ToDo from './ToDo';

const ToDoList = ({tasks, onToggleCompleted}) => {
    let match = useMatch("/*");
    let filteredTasks;
    
   switch(match.pathname.split('/')[1]){
        case 'completed':
            filteredTasks= tasks.filter(task => task.completed);
        break;
        default:
            filteredTasks = tasks;
   }
   
    return(
        <React.Fragment>
            <h1 className="m-3">Liste de tâches</h1>
            <ul className="list-group m-3">
                {filteredTasks.length === 0 ? 
                    <li className="list-group-item">Aucune Tâche</li>
                :
                filteredTasks.map((task) => <ToDo key={task.id} task={task} onToggleCompleted={onToggleCompleted}/>)}
            </ul>
        </React.Fragment>
);
}

export default ToDoList;