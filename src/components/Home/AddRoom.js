import {useState } from 'react';

export const AddRoomComponent = (props) => {
    const [input, setInput] = useState("");

    const handleInputChange = (e) => {
        setInput(e.currentTarget.value);
    }

    const handleAdd = (e) =>{
        e.preventDefault();
        if (input) {
            fetch(props.url + input, {method:'POST'})
            .then((response)=>{
              if (response.status==200){
                props.setList([...props.List,{name:input}])
              }
              else{
                return(response.json())
              }
            })
            .then((data)=> {
              if (data) {
                alert(data.message)  
              }
            })
                   
        }
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