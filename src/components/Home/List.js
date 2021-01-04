import {DeleteIcon} from './DeleteIcon';

export const ListComponent = (props) => {
    const elementToList = props.ItemsToList;
    const DeleteUrl = props.DeleteUrl;

    if (!elementToList || elementToList.length === 0) return <p>Nothing to show, sorry</p>;
    
    return (
      <ul>
        {elementToList.map((element) => {
          let textToDisplay = "" 
          if (element.room_name) {
            textToDisplay = element.name + " located in the " + element.room_name;
            if(element.container_name){
              textToDisplay = element.name + " located in " + element.container_name + " in the " + element.room_name;
            }
          }
          else{
            textToDisplay = element.name;
          }
          return (
            <li key={element.name} className='list'>
              <span className='repo-text'>{textToDisplay}</span>
              <DeleteIcon listChanged={props.listChanged} setListChanged={props.setListChanged} DeleteUrl={DeleteUrl} toUpdate={element} List={props.ItemsToList} setList={props.setList}/>
            </li>
          );
        })}
      </ul>
    );
  };
  