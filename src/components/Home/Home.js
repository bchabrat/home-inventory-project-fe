import './Home.css';
import React, { useEffect, useState } from 'react';
import {ListComponent} from './List';
import {AddRoomComponent} from './AddRoom';
import {AddContainerComponent} from './AddContainer';
import {AddItemComponent} from './AddItem';
import {API_BASE_URL} from '../../constants/constants';
import axios from 'axios';


function Home() {

  const roomListUrl = API_BASE_URL + 'list_rooms';
  const containerListUrl = API_BASE_URL + 'list_containers';
  const itemListUrl = API_BASE_URL + 'list_items';
  const roomUrl = API_BASE_URL + 'room';
  const containerUrl = API_BASE_URL + 'container';
  const itemUrl = API_BASE_URL + 'item';
  
  const [listChanged, setListChanged] = useState(false); 
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

  useEffect(() => {
    setLoading(true);
    const response = axios.get(roomListUrl,{
      headers: {
        'Authorization': localStorage.getItem('ACCESS_TOKEN_NAME')
      }
    }).then(res=>{setRoomList(res.data);
      setLoading(false);})
      .catch(err => {
        alert(err.message); 
      });    
    },[listChanged]);
  
  useEffect(() => {
    setLoading(true);
    const response = axios.get(containerListUrl,{
      headers: {
        'Authorization': localStorage.getItem('ACCESS_TOKEN_NAME')
      }
    }).then(res=>{setContainerList(res.data);
      setLoading(false);}).catch(err => {
        alert(err.message); 
      });
    },[listChanged]);
  
  useEffect(() => {
    setLoading(true);
    const response = axios.get(itemListUrl,{
      headers: {
        'Authorization': localStorage.getItem('ACCESS_TOKEN_NAME')
      }
    }).then(res=>{setItemList(res.data);
      setLoading(false);}).catch(err => {
        alert(err.message); 
      });
      
    },[listChanged]);

  
  if (isLoading) return <p>loading...please wait </p>;

  return (

    <div className="App">
              <header className="App-header">
              <div>
              <ListComponent listChanged= {listChanged} setListChanged={setListChanged} ItemsToList={RoomList} DeleteUrl={roomUrl} setList={setRoomList}/>         
              <button onClick={toggleRoomPopup}>Add a room</button>
              </div>
              <div>
              <ListComponent listChanged= {listChanged} setListChanged={setListChanged} ItemsToList={ContainerList} DeleteUrl={containerUrl} setList={setContainerList}/> 
              <button onClick={toggleContainerPopup}>Add a container</button>
              </div>
              <div>
              <ListComponent listChanged= {listChanged} setListChanged={setListChanged} ItemsToList={ItemList} DeleteUrl={itemUrl} setList={setItemList}/> 
              <button onClick={toggleItemPopup}>Add an item</button>
              </div>
              {/* <MainComponent List={RoomList} setList={setRoomList} type="Room" className="RoomComponent" url='http://127.0.0.1:5000/room'/>
              <MainComponent List={ContainerList} setList={setContainerList} type="Container" className="ContainerComponent" url='http://127.0.0.1:5000/container'/>
              <MainComponent List={ItemList} setList={setItemList} type="Item" className="ItemComponent" url='http://127.0.0.1:5000/item'/> */}
            </header>
              {ShowRoomAdd ? <AddRoomComponent listChanged= {listChanged} setListChanged={setListChanged} url={roomUrl} List={RoomList} setList={setRoomList}/> : null }
              {ShowContainerAdd ? <AddContainerComponent listChanged= {listChanged} setListChanged={setListChanged} url={containerUrl} RoomList={RoomList} ContainerList={ContainerList} setList={setContainerList}/> : null }
              {ShowItemAdd ? <AddItemComponent listChanged= {listChanged} setListChanged={setListChanged} url={itemUrl} RoomList={RoomList} ContainerList={ContainerList} ItemList={ItemList} setList={setItemList}/> : null }
    </div>    
  );
};

export default Home;
