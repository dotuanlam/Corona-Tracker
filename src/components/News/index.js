import React, { useState, useEffect } from "react";
import { uid } from "uid";
import { Card, Row, Avatar, Skeleton } from "antd";
import { useSelector } from "react-redux";
import "./index.scss";
const { Meta } = Card;
const News = () => {
  const [news, setNews] = useState([]);
  const [limit, setLimit] = useState(12);
  const theme = useSelector((state) => state.theme.theme);
  const [loading, setLoading] = useState(false)

  const getNews = () => {
    fetch(
      `https://corona--tracker.herokuapp.com/newslist?_page=1&_limit=${limit}`
    )
      .then((res) => res.json())
      .then((res) => {
        setNews(res);
      });
  };
  useEffect(() => {
    getNews();
  }, [limit]);

  useEffect(() => {
    window.onscroll = function (ev) {
      if (
        window.innerHeight + window.scrollY >= document.body.scrollHeight &&
        limit <= 120
      ) {
        setLimit(limit + 12);
      }
    };
    return () => { };
  }, [limit]);

  return (
    <div
      className={
        theme === "light" ? "container__news-light" : "container__news-dark"
      }
    >
      <Row justify="center" span={24}>
        {news?.map((item, index) => (
          <div className="container__news--item " key={uid()}>

            <Card
              style={{
                maxWidth: 400,
                maxHeight: 150,
                marginTop: 16,
                overflow: 'hidden',
                backgroundColor: theme === "dark" ? "rgb(28,33,40)" : "#fff",
                textOverflow: 'ellipsis',
                whiteSpace: 'wrap'
              }}
            >
              <Skeleton loading={loading} avatar active>
                <Meta
                  avatar={<Avatar style={{ width: '2rem', borderRadius: '1px', minHeight: '5rem', minWidth: '5rem' }} src={item.urlToImage} />}
                  title={item.title}
                  description={item.content}
                />
              </Skeleton>
            </Card>
          </div>
        ))}
      </Row>
    </div>
  );
};

export default News;
