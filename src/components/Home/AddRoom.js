import {useState } from 'react';
import axios from 'axios';

export const AddRoomComponent = (props) => {
    const [input, setInput] = useState("");

    const handleInputChange = (e) => {
        setInput(e.currentTarget.value);
    }

    const handleAdd = (e) =>{
        e.preventDefault();
        if (input) {
            axios.post(props.url, {'name':input}, {
              headers: {
                'Authorization': localStorage.getItem('ACCESS_TOKEN_NAME')
              }
            })
            .then((response)=>{
              props.setListChanged(!props.listChanged)
            })
            .catch((err)=> {
                alert(err.message)  
            })
                   
        }
        else{alert("please enter a name")}
    } 
    return(
        <form onSubmit={handleAdd} className="Form"> 
        <h1>Add a room</h1>
        <label>name</label>
        <div>  
          <input type="text"  onChange={handleInputChange} />
        </div>
        <input type="submit" value="Confirm" className="InputButton"/>
      </form>

    )
};