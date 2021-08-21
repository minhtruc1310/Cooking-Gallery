import React, { useEffect, useState } from 'react';
import AppHeader from '../../components/Header/Header';
import { Layout } from 'antd';
import results from '../../config/results';
import '../../assets/css/Gallery.css'
import PostCard from '../../components/Post/PostCard';

const { Footer, Content } = Layout;

const Gallery = () => {
    const [allData, setAllData] = useState<any>([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        results.get('/Posts.json').then(res => {
            const fetchData = [];
            for(let key in res.data){
              fetchData.unshift({ ...res.data[key], id: key })
            }
            setAllData(fetchData);
        })
    },[])

    const handleFilter = (data: any) => {
      return data.filter((item: any) => {
        return ["name"].some((newItem) => {
            return (
                item[newItem].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
              );
          });
      });
    }

    return (
      <Layout style={{ minHeight: '100vh' }}>
      <AppHeader/>
      <Content>
        <div className="search-box">
            <input type="text" className="search-bar" placeholder="Search your favorites" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>

        <div style={{padding:10, display: "flex", flexWrap: "wrap", textAlign: 'left'}}>
          {handleFilter(allData).map((value: any)=>{
            return( <PostCard key={value.id} post={value}></PostCard> )
          })}
          </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>&copy; {new Date().getUTCFullYear()} CoderMinhChuc</Footer>
    </Layout>
    );
};

export default Gallery;

