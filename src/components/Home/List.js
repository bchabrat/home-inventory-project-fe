import {DeleteIcon} from './DeleteIcon';

export const ListComponent = (props) => {
    const elementToList = props.ItemsToList;
    const DeleteUrl = props.DeleteUrl;

    if (!elementToList || elementToList.length === 0) return <p>Nothing to show, sorry</p>;
    
    return (
      <ul>
        {elementToList.map((element) => {
          console.log("element",element)
          let textToDisplay = "" 
          if (element.name){
            textToDisplay = element.name;
          }
          else{
            if(element.container){
              textToDisplay = element.element.name + " located in " + element.container.name + " in the " + element.room.name;
            }
            else{
              textToDisplay = element.element.name + " located in the " + element.room.name; 
            }
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
  