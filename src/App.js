import './App.css';
import React, { useEffect, useState } from 'react';
import {ListComponent} from './List';
import {AddRoomComponent} from './AddRoom';
import {AddContainerComponent} from './AddContainer';
import {AddItemComponent} from './AddItem';

function App() {
  const baseurl = "https://home-inventory-project-be.herokuapp.com/"
  const roomListUrl = baseurl + 'list_rooms';
  const containerListUrl = baseurl + 'list_containers';
  const itemListUrl = baseurl + 'list_items';
  const roomUrl = baseurl + 'room/';
  const containerUrl = baseurl + 'container/';
  const itemUrl = baseurl + 'item/';
  
  const [isLoading, setLoading] = useState(false);
  
  const [RoomList, setRoomList] = useState([]);
  const [ContainerList, setContainerList] = useState([]);
  const [ItemList, setItemList] = useState([]);
  
  const [ShowRoomAdd, setShowRoomAdd] = useState(false);
  const [ShowContainerAdd, setShowContainerAdd] = useState(false);
  const [ShowItemAdd, setShowItemAdd] = useState(false);

  const toggleRoomPopup = () => {
    setShowRoomAdd(!ShowRoomAdd);
    setShowContainerAdd(false);
    setShowItemAdd(false);
  };

  const toggleContainerPopup = () => {
    setShowContainerAdd(!ShowContainerAdd);
    setShowItemAdd(false);
    setShowRoomAdd(false);
  };

  const toggleItemPopup = () => {
    setShowItemAdd(!ShowItemAdd);
    setShowContainerAdd(false);
    setShowRoomAdd(false);
  };

  useEffect(async () => {
    setLoading(true);
    const response = await fetch(roomListUrl);
    if (response.status == 200){
      const data = await response.json();
      setRoomList(data);
      setLoading(false);
    }
    else alert(response.status)
    
    
    },[]);
  
  useEffect(async () => {
    setLoading(true);
    const response = await fetch(containerListUrl);
    const data = await response.json();
    setContainerList(data);
    setLoading(false);
    },[]);
  
  useEffect(async () => {
    setLoading(true);
    const response = await fetch(itemListUrl);
    const data = await response.json();
    setItemList(data);
    setLoading(false);
    },[]);

  
  if (isLoading) return <p>loading...please wait </p>;

  return (
    <div className="App">
      <header className="App-header">
        <div>
        <ListComponent ItemsToList={RoomList} DeleteUrl={roomUrl} setList={setRoomList}/>         
        <button onClick={toggleRoomPopup}>Add a room</button>
        </div>
        <div>
        <ListComponent ItemsToList={ContainerList} DeleteUrl={containerUrl} setList={setContainerList}/> 
        <button onClick={toggleContainerPopup}>Add a container</button>
        </div>
        <div>
        <ListComponent ItemsToList={ItemList} DeleteUrl={itemUrl} setList={setItemList}/> 
        <button onClick={toggleItemPopup}>Add an item</button>
        </div>
        {/* <MainComponent List={RoomList} setList={setRoomList} type="Room" className="RoomComponent" url='http://127.0.0.1:5000/room'/>
        <MainComponent List={ContainerList} setList={setContainerList} type="Container" className="ContainerComponent" url='http://127.0.0.1:5000/container'/>
        <MainComponent List={ItemList} setList={setItemList} type="Item" className="ItemComponent" url='http://127.0.0.1:5000/item'/> */}
      </header>
        {ShowRoomAdd ? <AddRoomComponent url={roomUrl} List={RoomList} setList={setRoomList}/> : null }
        {ShowContainerAdd ? <AddContainerComponent url={containerUrl} RoomList={RoomList} ContainerList={ContainerList} setList={setContainerList}/> : null }
        {ShowItemAdd ? <AddItemComponent url={itemUrl} RoomList={RoomList} ContainerList={ContainerList} ItemList={ItemList} setList={setItemList}/> : null }

    </div>
    
  );
};

export default App;
