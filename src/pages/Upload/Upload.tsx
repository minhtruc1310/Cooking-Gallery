import React, { useState } from 'react';
import results from '../../config/results';
import AppHeader from '../../components/Header/Header';
import { Layout, Input } from 'antd';
import { Col, Row } from 'reactstrap';
import TextArea from 'antd/lib/input/TextArea';
import '../../assets/css/Upload.css'
import firebase, { auth } from '../../config/firebase';
import { useHistory } from 'react-router-dom';

const { Footer, Content } = Layout;

const Upload = () => {
    const [dishName, setDishName] = useState('');
    const [prices, setPrices] = useState('');
    const [foodLocation, setFoodLocation] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<any>();
    const history = useHistory();

    function notUpImg() {
        if (!image) {
            alert("PLease upload image!");
            window.location.reload();
        }
    }

    async function postHandle() {
        notUpImg();

        const data = {
            name: dishName,
            prices: prices,
            location: foodLocation,
            description: description,
            user: auth.currentUser?.displayName
        }
        
        results.post('/Posts.json', data).then(res => {
            var storageRef = firebase.storage().ref('Images').child(res.data.name);
            storageRef.put(image);
            history.push('/');
            alert('Uploaded successful!');
        })
    }

    const handleChange = (e: any) => {
        if (e.target.files[0]) {
          setImage(e.target.files[0]);
        }
      };

    return (
        <Layout style={{ minHeight: '100vh' }}>
        <AppHeader/>
        <Content className="upload-menu">
            <div className="upload">
                <form>
                    <Row>
                        {/* Email */}
                        <label htmlFor="feEmail">Dish Name</label>
                        <Col className="form-upload">
                            <Input type="text" placeholder="Enter your dish name" value={dishName} onChange={e => setDishName(e.target.value)}
                            />
                        </Col>

                        <label htmlFor="feLastName">Prices</label>
                        <Col className="form-upload">
                            <Input type="text" placeholder="Prices" value={prices} onChange={e => setPrices(e.target.value)}
                            />
                        </Col>

                        <label htmlFor="feCity">Location</label>
                        <Col className="form-upload">
                            <Input type="text" placeholder="Location" value={foodLocation} onChange={e => setFoodLocation(e.target.value)}
                            />
                        </Col>

                        <label htmlFor="feDescription">Description</label>
                        <Col className="form-upload">
                            <TextArea value={description} onChange={e => setDescription(e.target.value)} />
                        </Col>
                        <input type="file" onChange={handleChange} />
                    </Row>
                    <button type="button" onClick={postHandle}>Submit</button>
                </form>
            </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>&copy; {new Date().getUTCFullYear()} CoderMinhChuc</Footer>
        </Layout>
    );
};

export default Upload;