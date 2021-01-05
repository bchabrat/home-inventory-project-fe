import {useState } from 'react';
import axios from 'axios';

export const AddContainerComponent = (props) => {
    const [input, setInput] = useState("");
    const [selectedRoom, setSelectedRoom] = useState(props.RoomList[0]['id']);
    const [selectedContainer, setSelectedContainer] = useState(0);
    
    const handleInputChange = (e) => {
        setInput(e.currentTarget.value);
    }

    const handleRoomSelectionChange = (e) => {
        var index = e.target.selectedIndex;
        var optionElement = e.target.childNodes[index]
        var option =  optionElement.getAttribute('data-id');
        setSelectedRoom(parseInt(option));
    }

    const handleContainerSelectionChange = (e) => {
        var index = e.target.selectedIndex;
        var optionElement = e.target.childNodes[index]
        var option =  optionElement.getAttribute('data-id');
        setSelectedContainer(parseInt(option));
    }

    const handleAdd = (e) =>{
        e.preventDefault();
        if (input) {
            let payload = {}
            if (selectedContainer){
                payload={"name":input,"room_id":selectedRoom,"container_id":selectedContainer}
            }
            else{
                payload={"name":input,"room_id":selectedRoom}
            }
            
            axios.post(props.url, payload,{headers: {
                'Authorization': localStorage.getItem('ACCESS_TOKEN_NAME')
              }
            })
            .then((response)=>{
                    props.setListChanged(!props.listChanged)
            })
            .catch((err)=>{
                    alert(err.message)  
            }) 
        }
        else{alert("please enter a name")}
      }
    
    
    return(
        <form onSubmit={handleAdd} className="Form"> 
        <h1>Add an item or container</h1>
        <label>name</label>
        <input name="name" type="text"  onChange={handleInputChange} />
        <label>Container</label>
        <select name="container" type="text" onChange={handleContainerSelectionChange}>
            <option data-id="0" >None</option>
            {props.ContainerList.map((element) => {
            return (
            <option data-id={element.id}>
                {element.name}
            </option>
            );
            })}
        </select>
        <label>Room</label>
        <select name="room" type="text" onChange={handleRoomSelectionChange}>
            {props.RoomList.map((element) => {
            return (
            <option data-id={element.id}>
                {element.name}
            </option>
            );
            })}
        </select>
  
        <input type="submit" value="Confirm" className="InputButton"/>
      </form>

    )
};