import React, { useState, useEffect } from 'react';
import { Table} from 'reactstrap';
import axiosPrivate from '../api/axios';
const SportClubs = props => {
    const [sportClubs, setSportClubs] = useState([]);
    
    useEffect(() => {
        try {
            const response = axiosPrivate.post("/sportclubs/all",
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response)
            setSportClubs(response)
        } catch (err) {
            console.log(err)
        }
    }, []);

    return (
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
            </tr>
          </thead>
       
        </Table>
    
  
  );
};
/*
   <tbody>
             {sportClubs.map((sportclub) => (
                <tr key={sportclub.id}>
                   <td>#</td>
                   <td>{sportclub.name}</td>  
                </tr>
            ))}
          </tbody>
*/ 
export default SportClubs;
