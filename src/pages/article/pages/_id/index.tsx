import { Col, Row } from 'antd';
import axios from 'axios';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apis from '../../../../mock/apis';

import { formatDateToText } from '../../../../common/js/util';
import { IArticle } from '../../../article-manage/interface';

const ArticleDetail: FunctionComponent = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<IArticle | null>(null);

  const fetchArticleDetailById = async (id: string) => {
    const { data } = await axios.get<IArticle>(`${apis.fetchArticleDetailById}/${id}`);
    setArticle(data);
  };

  useEffect(() => {
    if (id) {
      fetchArticleDetailById(id);
    }
  }, [id]);

  return (
    <Row className="w-full h-full bg-gray-100">
      {article && (
        <>
          <Col span={18}>
            <div className="h-full bg-white px-6 py-4 mr-6">
              <div className="text-xl text-gray-700 font-semibold mb-2">
                {article.title}
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <span className="mr-2 text-gray-600">{article.authorName}</span>
                <span className="mr-2">{formatDateToText(article.updateAt, true)}</span>
              </div>
              <div className="mt-4 text-gray-700 leading-6">{article.content}</div>
            </div>
          </Col>
          <Col span={6}>
            <div className="h-full bg-white px-4 py-4">
              <div className="text-center text-sm text-gray-600 mt-6">右侧留白</div>
            </div>
          </Col>
        </>
      )}
    </Row>
  );
};

export default ArticleDetail;
