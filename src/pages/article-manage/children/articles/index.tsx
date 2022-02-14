import { SettingOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';
import React, { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

import { formatTime } from '../../../../common/js/util';
import { deleteArticleById, useFetchArticles } from '../../hooks/useArticleManage';

const Articles: FunctionComponent = () => {
  const authorId = '1001';
  const navigate = useNavigate();
  const { data: articles, refetch } = useFetchArticles(authorId);

  /** 跳转到文章详情 */
  const handleClick = (id: string) => {
    navigate(`/article/${id}`);
  };

  /** 删除文章 */
  const handleDelete = async (id: string) => {
    const result = await deleteArticleById(id);
    if (result.status === 200) {
      refetch();
    }
  };

  /** 编辑文章，跳转到文章编辑页面 */
  const handleEdit = (id: string) => {
    navigate(`/article-manage/edit-article/${id}`);
  };

  const PopoverContent = (props: { id: string }) => {
    const { id } = props;
    return (
      <div>
        <Button
          type="text"
          block
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(id);
          }}>
          编辑
        </Button>
        <Button
          type="text"
          block
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(id);
          }}>
          删除
        </Button>
      </div>
    );
  };

  return (
    <div>
      {articles?.map((article) => {
        return (
          <div
            className="px-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
            key={article.id}
            onClick={() => handleClick(article.id as string)}>
            <div className="flex py-3">
              <div className="flex-1">{article.title}</div>
              <Popover
                content={<PopoverContent id={article.id as string} />}
                placement="bottomRight">
                <SettingOutlined />
              </Popover>
            </div>
            <div className="pb-3">
              {formatTime(article.updateAt, 'yyyy年MM月dd日 hh:mm')}
            </div>
          </div>
        );
      })}
      <div></div>
    </div>
  );
};

export default Articles;
