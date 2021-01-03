import {useState } from 'react';

export const AddItemComponent = (props) => {
    const [input, setInput] = useState("");
    const [selectedRoom, setSelectedRoom] = useState(props.RoomList[0]['name']);
    const [selectedContainer, setSelectedContainer] = useState("None");
    
    const handleInputChange = (e) => {
        setInput(e.currentTarget.value);
    }

    const handleRoomSelectionChange = (e) => {
        setSelectedRoom(e.currentTarget.value);
    }

    const handleContainerSelectionChange = (e) => {
        setSelectedContainer(e.currentTarget.value);
    }

    const handleAdd = (e) =>{
        e.preventDefault();
        if (input) {
            const body="room_name=" + selectedRoom + (selectedContainer!="None" ? "&container_name="+selectedContainer:"");
            fetch(props.url + input + "?" + body , {method:'POST'})
            .then((response)=>{
                if (response.status==200){
                    props.setList([...props.ItemList,{name:input,room_name:selectedRoom,container_name:selectedContainer!="None" ? selectedContainer:""}]) 
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
        <h1>Add an item</h1>
        <label>name</label>
        <input name="name" type="text"  onChange={handleInputChange} />
        <label>Container</label>
        <select name="container" type="text" onChange={handleContainerSelectionChange}>
            <option>None</option>
            {props.ContainerList.map((element) => {
            return (
            <option>
                {element.name}
            </option>
            );
            })}
        </select>
        <label>Room</label>
        <select name="room" type="text" onChange={handleRoomSelectionChange}>
            {props.RoomList.map((element) => {
            return (
            <option>
                {element.name}
            </option>
            );
            })}
        </select>
  
        <input type="submit" value="Confirm" className="InputButton"/>
      </form>

    )
};