import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Row } from 'antd';
import React, { FunctionComponent } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../store';
import { login } from '../../store/modules/article-user';
import { IArticleUser } from '../../store/modules/article-user/interface';

const ArticleManage: FunctionComponent = () => {
  const navs = [
    { name: '首页', url: '/article-manage/home' },
    { name: '文章管理', url: '/article-manage/articles' },
  ];

  const location = useLocation();
  const navigate = useNavigate();
  const authorInfo = useSelector((state) => state.articleUser.user);
  const dispatch = useDispatch();

  /** 用户未登录时，写入登录数据 */
  const handleAvatarClick = () => {
    if (!authorInfo?.portrait) {
      const user: IArticleUser = {
        id: '1001',
        name: 'Mark',
        title: '前端工程师',
        portrait:
          'https://image.immortalboy.cn/public/uploads/2021/12/24/1640340263455776.png',
      };
      setTimeout(() => {
        dispatch(login(user));
      }, 1000);
    }
  };

  const handleAddArticle = () => {
    navigate('/article-manage/add-article');
  };

  return (
    <>
      <Row className="w-full h-full bg-gray-100">
        <Col span={6}>
          <div className=" h-full bg-white px-4 py-4">
            <div>
              <div className="flex">
                <div onClick={handleAvatarClick}>
                  {authorInfo?.portrait ? (
                    <Avatar
                      className="w-12 h-12"
                      size={48}
                      shape="circle"
                      src={
                        <img
                          className="w-12 h-12 rounded-3xl"
                          src={authorInfo?.portrait}
                          alt="作者头像"
                        />
                      }
                    />
                  ) : (
                    <Avatar
                      style={{ lineHeight: 'initial' }}
                      size={48}
                      icon={<UserOutlined />}
                      shape="circle"
                    />
                  )}
                </div>
                <div className="flex-1 ml-3">
                  <div className="text-base text-gray-600 font-semibold">
                    {authorInfo?.name}
                  </div>
                  <div className="text-sm text-gray-400">{authorInfo?.title}</div>
                </div>
              </div>

              <Button className="my-4" type="primary" block onClick={handleAddArticle}>
                写文章
              </Button>
              <div>
                {navs.map((nav) => {
                  return (
                    <NavLink
                      className={() => {
                        const classStr = 'block py-2  px-4';
                        const activeClass =
                          location.pathname === nav.url ? 'text-blue-400 bg-blue-50' : '';
                        return `${classStr} ${activeClass}`;
                      }}
                      key={nav.url}
                      to={nav.url}>
                      {nav.name}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          </div>
        </Col>
        <Col span={18}>
          <div className="h-full ml-4 bg-white py-4">
            <Outlet />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ArticleManage;
