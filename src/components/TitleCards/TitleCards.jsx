import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'

const TitleCards = ({title, category}) => {
  console.log('title',category)
  // mỗi khi show ra ui thì component này sẽ được render
  // lại và mỗi lần component sẽ có 1 phạm vi độc lập
  // chính vì thế để lưu 1 biến mà dùng cho component
  // cho all phạm vi trên thì dùng useRef. Có cách dễ
  // hơn là chỉ cần khai bao biến khỏi phạm vi component
  // nhưng vì nó ko phù hợp quy ước của react, là 1 file
  // là 1 component nên ko nên làm thế

  // useRef nhận value init tương tự useState, nó sẽ
  // luôn luôn trả về 1 object có props là current,
  // nếu muốn lấy giá trị, hay sửa đều qua thằng này
  const cardsRef = useRef();

  const [apiData, setApiData] = useState([])

  const handleWheel = (event) => {
    // ngăn chặn sự kiện mặc định của event wheel
    // là cuộn trang theo hướng của con trỏ chuột
    event.preventDefault();

    // event.deltaY: Lượng cuộn theo trục Y. Giá
    // trị dương có nghĩa là cuộn xuống, và giá
    // trị âm có nghĩa là cuộn lên

    // scrollLeft là một thuộc tính của các phần tử DOM
    // Thuộc tính này xác định hoặc thiết lập vị trí cuộn hiện
    // tại của phần tử theo chiều ngang. Giá trị của scrollLeft là
    // số pixel mà nội dung của phần tử đã được cuộn sang trái

    // ở đây nó mượt như vậy là mình dùng scrollbar-behavor: smooth
    // nhưng nó sẽ quá chậm, chính vì vậy mình nhân thêm 2.6 lần
    // cho khoảng cuộn chuột theo chiều dọc (deltaY)
    cardsRef.current.scrollLeft += event.deltaY * 2.6;
  };

  // call api
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzdkNWVlOGYxMTQ5NTU3MGNjMmRlNDJhNTg5YTIwNiIsIm5iZiI6MTcyMTUzMDM4Ni4xMzU1OCwic3ViIjoiNjY5Yzc1ODQ0N2ViMDY2NmFjY2Q3MWVjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.lJbvJ89AoY7EtMJjnMTdbtRs721B_uxIeD5fN99KyxQ",
    },
  };
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`,
      options
    )
      // bước chuyển về json này qtrong giúp thấy data dễ hơn
      .then((response) => response.json())
      .then((response) => setApiData(response.results))
      .catch((err) => console.error(err));

    // event wheel được thực hiện khi user lăn chuột
    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netfix"}</h2>
      {/* Trong React, ref là một cách để truy cập 
      trực tiếp vào các phần tử DOM hoặc các thành 
      phần React. ref này để mình gắn cardsRef vào thẻ div.
      Sau khi div đc render thì cardsRef.current sẽ
      trỏ đến phần tử DOM thực tế này*/}
      {/* vào trang này để lấy api phim: https://www.themoviedb.org/ */}
      {/* url của img https://developer.themoviedb.org/docs/image-basics */}
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            // thẻ Link để điều hướng page mà ko cần load lại
            // attribute to để điều hướng đến đâu
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500/`+card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default TitleCards
