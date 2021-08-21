import React, { useEffect, useState } from 'react';
import { Avatar} from 'antd';
import { auth } from '../../config/firebase';
import '../../assets/css/Profile.css'
import { Col, Row } from 'reactstrap';
import TextArea from 'antd/lib/input/TextArea';
import results from '../../config/results';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Bio = () => {
    const [bio, setBio] = useState('');
    const history = useHistory();
    const [dataGet, setDataGet] = useState<any>([]);
    const [changed, setChanged] = useState(false);

    useEffect(() => {
      results.get('/Bios.json').then(res => {
          const fetch = [];
          for(let key in res.data){
            fetch.unshift({ ...res.data[key], id: key })  
          }
          setDataGet(fetch);
          console.log(dataGet);
      })
      
  }, [])

    function bioHandle(this: any) {
        let id: any;
        id = auth.currentUser?.uid;

        const data = {
          userID: id,
          bio: bio
        }

        for(let i in dataGet){
          if(dataGet[i].userID === id){
            axios.delete(`https://cooking-gallery-8d52f-default-rtdb.asia-southeast1.firebasedatabase.app/Bios/${dataGet[i].id}.json`);
          }
        }

        results.post('/Bios.json', data).then(res => {
            console.log(res);
            history.push('/profile');
            window.location.reload();
            alert('Updated successful!');
        })
    }

    function changeBio() {
      setChanged(true);
    }
    return (
        <div className="bio">
          <h1>{auth.currentUser?.displayName}</h1>
          <h3>{auth.currentUser?.email}</h3>
          <Avatar size={128+32} src={auth.currentUser?.photoURL} />
          {changed === false ? (
            <div className="bioStyle">
              {dataGet.map((value:any) => {
              if(value.userID === auth.currentUser?.uid){
                return(
                    <div >
                      <h2 style={{marginTop: "1%"}}>"{value.bio}"</h2>
                    </div>
                )
              }
            })}
            <button onClick={changeBio}>Change your Bio</button>
            </div>
          ): (
            <div>
              <Row>
                <label htmlFor="feDescription">Bio</label>
                <Col className="form-group">
                    <TextArea value={bio} onChange={e => setBio(e.target.value)}/>
                </Col>
                </Row>
                <button onClick={bioHandle}>Save</button>
            </div>
          )}
        </div>
    );
};

export default Bio;