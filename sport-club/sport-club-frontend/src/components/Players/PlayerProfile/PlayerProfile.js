import React, { useState, useEffect,useContext } from 'react';
import { AuthContext } from '../../../context/auth-context';
import { useCallback } from 'react';
import useHttp from '../../../hooks/useHttp';
import   './PlayerProfile.css'
import { Card, CardBody,CardTitle,CardSubtitle,CardText, ListGroup,ListGroupItem} from 'reactstrap';
import { useParams } from 'react-router-dom';

const PlayerProfile = props => {
  const [playersName, setPlayersName] = useState('');
  const [playersSalary, setPlayersSalary] = useState('');
  const [playersClub, setPlayersClub] = useState('');
  const [playersImage, setPlayersImage] = useState(null);
  const [playersSkills, setPlayersSkills] =useState([]);
  const [showPlayer, setShowPlayer] = useState(false)
  const authContext = useContext(AuthContext);
  let { id } = useParams();
  const {
    data,
    sendRequest,
  } = useHttp();

  const loadPlayer = useCallback(() => {
    sendRequest(
      'players/find',
      'POST',
      JSON.stringify({id: id}),
      authContext.token,
      'PLAYERINFO'
    );

    }, [sendRequest]);

 
   useEffect(() => {
       if(data!=null){
        setPlayersName(data.playerName)
        setPlayersImage(data.image)
        setPlayersSalary(data.salary)
        setPlayersSkills(data.skills)
        setPlayersClub(data.clubName)
        setShowPlayer(true)
       }
    }, [data]);
 
    useEffect(() => {
        loadPlayer()
    }, []);

  return (
    <div >
        {
           showPlayer ? 
        <div className='playerProfile'>
        <Card body  outline style={{ width: '28rem' }}>
            
             <img alt="Sample"  src={playersImage}/>
        
            <CardBody>
                 

                 <CardTitle tag="h4"><b>{playersName}</b></CardTitle>
                 <CardSubtitle className="mb-2 text-muted" tag="h6" >{playersClub}</CardSubtitle>
                 <CardText>
                   {playersSalary}$
                    
               </CardText>
               <ListGroup>

                    {playersSkills.map((skill)=>  
                       <ListGroupItem key={skill.id} >{skill.name}</ListGroupItem>
                    )}
                 </ListGroup>
             </CardBody>
        </Card>
        </div>
        : null

}
    </div>
  );
};

export default PlayerProfile;
