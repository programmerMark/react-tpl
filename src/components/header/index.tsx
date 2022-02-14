import { Col, Row } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  const navs = [
    { path: '/home', title: '首页' },
    { path: '/article', title: '文章列表' },
    { path: '/article-manage/home', title: '文章管理' },
  ];

  return (
    <div className="w-full flex items-center h-16 min-h-16 shadow-md">
      <Row className="w-full">
        <Col span={20} offset={2}>
          <div className="flex items-center">
            {navs.map((nav) => {
              return (
                <li
                  className="list-none  px-4 py-1 text-gray-700 hover:text-blue-400"
                  key={nav.path}>
                  <NavLink
                    className={({ isActive }) => {
                      return isActive ? 'text-blue-400' : 'text-gray-700';
                    }}
                    to={nav.path}>
                    {nav.title}
                  </NavLink>
                </li>
              );
            })}
          </div>
        </Col>
      </Row>
    </div>
  );
};
