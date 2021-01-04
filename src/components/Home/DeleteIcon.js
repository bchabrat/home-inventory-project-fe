import close_icon from '../../Static/close.png';
import axios from 'axios';

export const DeleteIcon = (props) =>{

    const handleDelete = (e) => {
        const updatedList = props.List.filter(function(object,index,arr){
            return object.id !== props.toUpdate
        });
        console.log(updatedList)
        
        axios.delete(props.DeleteUrl,
        {
            headers: {
              'Authorization': localStorage.getItem('ACCESS_TOKEN_NAME')
            },
            data:
                {"id":props.toUpdate.id,"name":props.toUpdate.name}
          })
        .then(res => {
                    props.setListChanged(!props.listChanged);
                
        })
        .catch(err =>alert(err.message))
        
    }
    return(
    <img src={close_icon} width="20" height="20" alt="delete" style={{backgroundColor:"white"}} onClick={handleDelete}/>
    );
};
    