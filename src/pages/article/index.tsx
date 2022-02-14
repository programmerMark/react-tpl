import { Col, Row } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import ArticleCard from './components/article-card';
import { useFetchAllArticle } from './hooks';

const Article = () => {
  const navigate = useNavigate();
  const { data: allArticles } = useFetchAllArticle();

  const handleClick = (id: string) => {
    navigate(`/article/${id}`);
  };

  return (
    <Row className="w-full h-full bg-gray-100">
      <Col span={18}>
        <div className="h-full bg-white pb-4-4 mr-6">
          {allArticles?.map((article) => {
            return (
              <ArticleCard key={article.id} article={article} handleClick={handleClick} />
            );
          })}
        </div>
      </Col>
      <Col span={6}>
        <div className="h-full bg-white px-4 py-4">
          <div className="text-center text-sm text-gray-600 mt-6">右侧留白</div>
        </div>
      </Col>
    </Row>
  );
};

export default Article;
