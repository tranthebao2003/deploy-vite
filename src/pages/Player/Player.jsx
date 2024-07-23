import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  // Mục đích: Dùng để truy cập các tham số 
  // động trong URL. Rất hữu ích khi bạn cần lấy 
  // giá trị tham số từ URL để hiển thị hoặc thực 
  // hiện các logic trong component.
  console.log('tham số động', useParams())
  const {id} = useParams()

// Mục đích: Dùng để điều hướng đến các đường dẫn 
// khác trong ứng dụng React.
// Cách sử dụng: useNavigate trả về một hàm điều 
// hướng mà bạn có thể gọi với đường dẫn đích để thay 
// đổi URL hiện tại.
  const navigate = useNavigate()

  const [apiData, setApiData] = useState({
    name:"",
    key:"",
    published_at:"",
    type: ""
  })
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzdkNWVlOGYxMTQ5NTU3MGNjMmRlNDJhNTg5YTIwNiIsIm5iZiI6MTcyMTUzMDM4Ni4xMzU1OCwic3ViIjoiNjY5Yzc1ODQ0N2ViMDY2NmFjY2Q3MWVjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.lJbvJ89AoY7EtMJjnMTdbtRs721B_uxIeD5fN99KyxQ'
    }
  };
  
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results[0]))
    .catch(err => console.error(err));
  }, [])


  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        // ở đây mình dùng navigate điều hướng về
        // trang chủ
        onClick={() => {
          navigate('/');
        }}
      />
      {/* The <iframe> element is used to embed 
      another HTML page within the current page 
      and display content in frame with width and
      height set up before*/}
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>
          {apiData.published_at.slice(0, 10).split("-").reverse().join("-")}
        </p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
}

export default Player
