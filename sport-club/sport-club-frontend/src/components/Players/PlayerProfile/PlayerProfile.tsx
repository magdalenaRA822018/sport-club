import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Player } from '../../../interfaces';
import axios from '../../../http-common'
import DashboardWrapper from '../../styled/DashboardWrapper';
import CenteredCard from '../../styled/CenteredCard';
import SkillCard from '../../styled/SkillCard';
import InlineWrapper from '../../styled/InlineWrapper';
import ProfileImage from '../../styled/ProfileImage';
const PlayerProfile = () => {

  const [player, setPlayer] = useState<Player>({} as Player);
  const { id } = useParams();

    useEffect(() => {
      axios.post('players/find',{id: id})
      .then(function (response) {
         setPlayer(response.data)
      })
      .catch(function (error) {
        alert("error")
      });
    }, []);

  return (
    <React.Fragment>
        <DashboardWrapper>
        <CenteredCard >
            <ProfileImage alt="Sample"  src={player.image}/>
                 <h1 ><b>{player.playerName}</b></h1>
            <InlineWrapper>
                 <p>{player.clubName} • {player.salary}$</p>
            </InlineWrapper>
            
            { player.skills?.map((skill)=>  
                       <SkillCard key={skill.id} >{skill.name}</SkillCard>
            )}
           
        </CenteredCard>
        </DashboardWrapper>
       
    </React.Fragment>
  );
};

export default PlayerProfile;