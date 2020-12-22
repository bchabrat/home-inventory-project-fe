import close_icon from './close.png';

export const DeleteIcon = (props) =>{

    const handleDelete = (e) => {
        const updatedList = props.List.filter(function(object,index,arr){
            return object.name != props.toUpdate
        });
        
        fetch(props.DeleteUrl+props.toUpdate, {method:"DELETE"})
        .then(function(response) {
                if(response.status==200){
                    props.setList(updatedList);
                }
                else{
                    return response.json();
                }
        })
        .then((data)=>{
            if(data){
                alert(data.message);
            }
        })
        
        
        


        
    }
    return(
    <img src={close_icon} width="20" height="20" alt="delete" style={{backgroundColor:"white"}} onClick={handleDelete}/>
    );
};
    