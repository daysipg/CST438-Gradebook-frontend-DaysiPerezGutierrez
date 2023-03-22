import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js'

class AddAssignment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assignmentName: '',
            dueDate: '',
            courseName: ''
        };
    }
    assignmentChangeHandler = (event) => {
        this.setState({[event.target.assignmentName]: event.target.value});
    };
    dueDateChangeHandler = (event) => {
        this.setState({[event.target.dueDate]: event.target.value});
    }
    courseNameChangeHandler = (event) => {
        this.setState({[event.target.courseName]: event.target.value});
    }

    submitHandler = (event) => {
        event.preventDefault();
        const token = Cookies.get('XSRF-TOKEN');

      fetch(`${SERVER_URL}/assignment?name=${this.state.assignmentName}&dueDate=${this.state.dueDate}&courseId=${this.state.dueDate}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
                        'X-XSRF-TOKEN': token },
                    Body: {
                            assignmentName: this.state.assignmentName,
                            dueDate: this.state.dueDate,
                            courseName: this.state.courseName
                        }
        })
        .then(res => {
            if (res.ok) {
                toast.success("Assignment has been added", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            } else {
                toast.error("Error, could not add assignment", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            console.error('Error Status =' + res.status);
        }})
      .catch(err => {
            toast.error("Error, could not add assignment", {
            position: toast.POSITION.BOTTOM_LEFT
        });
            console.error(err);
      })
      }

    render() {
        return (
        <div>
            <div className="App">
                <Grid container>
                    <Grid container>
                    <h4>Create New Assignment </h4>
                    </Grid>
                </Grid>
                <form onSubmit={this.mySubmitHandler}>
                <p>Enter the Assignment Name</p>
                <input name='assignmentName' onChange={this.assignmentChangeHandler} />
                <p>Enter the due Date</p>
                <input type="date" name='dueDate' onChange={this.dueDateChangeHandler}  />
                <p>Enter the Course Name</p>
                <input variant="outlined" name='courseName' onChange={this.courseNameChangeHandler}/>
            </form> 
            <Button id ="Submit" varient="outlined" color="primary" style={{margin: 10}} onClick={this.submitHandler}>
                Add Assignment
            </Button>
            </div>
            <ToastContainer autoClose={1500} /> 
        </div>

         )
     }
 }
export default AddAssignment;