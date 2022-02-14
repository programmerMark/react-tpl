import { Button, Input, message } from 'antd';
import axios from 'axios';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apis from '../../../../mock/apis';

import { useSelector } from '../../../../store';
import { IArticle } from '../../interface';
import { IArticleEditorProps } from './interface';

const { TextArea } = Input;
const ArticleEditor: FunctionComponent<IArticleEditorProps> = ({ articleId }) => {
  const navigate = useNavigate();
  const authorInfo = useSelector((state) => state.articleUser.user);

  const [article, setArticle] = useState<IArticle>({
    title: '',
    authorId: authorInfo.id,
    authorName: authorInfo.name,
    content: '',
    updateAt: Date.now(),
  });

  const fetchArticleDetailById = async (id: string) => {
    const { data } = await axios.get<IArticle>(`${apis.fetchArticleDetailById}/${id}`);
    setArticle(data);
  };

  const handleInputChange = (val: string) => {
    setArticle({
      ...article,
      title: val,
      updateAt: Date.now(),
    });
  };

  const handleTextAreaChange = (val: string) => {
    setArticle({
      ...article,
      content: val,
      updateAt: Date.now(),
    });
  };

  const handleSubmit = async () => {
    if (!article.authorId || !article.authorName) {
      message.warning('用户未登录，请先点击左侧头像登录');
      return;
    }
    if (!article.title) {
      message.warning('文章标题不能为空');
      return;
    }
    if (!article.content) {
      message.warning('文章内容不能为空');
      return;
    }
    let url = apis.updateArticle;
    if (article.id) {
      url = `${apis.updateArticle}/${article.id}`;
      const { data } = await axios.put<IArticle>(url, {
        ...article,
        updateAt: Date.now(),
      });
      setArticle(data);
    } else {
      const { data } = await axios.post<IArticle>(url, {
        ...article,
        updateAt: Date.now(),
      });
      setArticle(data);
    }
    message.success('文章发布成功');
    navigate('/article-manage/articles');
  };

  useEffect(() => {
    if (articleId) {
      fetchArticleDetailById(articleId);
    }
  }, [articleId]);

  return (
    <div>
      <div className="flex items-center mb-6">
        <div className="w-20 text-sm text-gray-700 font-semibold text-right">
          文章标题
        </div>
        <div className="flex-1 border-b border-gray-300 ml-4 mr-8">
          <Input
            value={article.title}
            placeholder="请输入文章标题"
            bordered={false}
            onChange={(e) => handleInputChange(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-start">
        <div className="w-20 text-sm text-gray-700 font-semibold text-right">
          文章内容
        </div>
        <div className="flex-1 ml-4 mr-8">
          <TextArea
            value={article.content}
            placeholder="请输入文章内容"
            showCount
            autoSize={{ minRows: 18, maxRows: 20 }}
            maxLength={10000}
            allowClear
            onChange={(e) => handleTextAreaChange(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-6 ml-24">
        <Button type="primary" onClick={handleSubmit}>
          发布
        </Button>
      </div>
    </div>
  );
};

export default ArticleEditor;
