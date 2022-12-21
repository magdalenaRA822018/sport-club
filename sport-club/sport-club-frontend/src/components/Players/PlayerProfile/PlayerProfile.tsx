import React, { useState, useEffect } from 'react';
import   './PlayerProfile.css';
import { Card, CardBody,CardTitle,CardSubtitle,CardText, ListGroup,ListGroupItem} from 'reactstrap';
import { useParams } from 'react-router-dom';
import { Player } from '../../../interfaces';
import axios from '../../../http-common'

const PlayerProfile = () => {

  const [player, setPlayer] = useState<Player>({} as Player);
  const { id } = useParams();
  const [showPlayer, setShowPlayer] = useState<boolean>(false);

    useEffect(() => {
      axios.post('players/find',{id: id})
      .then(function (response) {
         setPlayer(response.data)
         setShowPlayer(true)
      })
      .catch(function (error) {
        alert("error")
      });
    }, []);

  return (
    <React.Fragment>
        {
        showPlayer ? 
        <div className='PlayerProfile'>
        <Card body  outline style={{ width: '28rem' }}>
            <img alt="Sample"  src={player.image}/>
            <CardBody>
                 <CardTitle tag="h4"><b>{player.playerName}</b></CardTitle>
                 <CardSubtitle className="mb-2 text-muted" tag="h6" >club</CardSubtitle>
                 <CardText>{player.salary}$</CardText>
                 <ListGroup>
                    {player.skills.map((skill)=>  
                       <ListGroupItem key={skill.id} >{skill.name}</ListGroupItem>
                    )}
                 </ListGroup>
             </CardBody>
        </Card>
        </div>
        : null
        }
    </React.Fragment>
  );
};

export default PlayerProfile;
