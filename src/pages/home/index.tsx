import { Col, Row } from 'antd';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

const Home: FunctionComponent = () => {
  return (
    <div>
      <div className="text-2xl text-center py-4">首页</div>
      <Row className="w-full h-full">
        <Col span={16}>
          <div className="ml-4 py-4 px-2 border-r border-gray-400">
            <div>
              本项目模板主要由
              <span className="text-pink-500 bg-pink-50 px-1 ">react</span>和
              <span className="text-pink-500 bg-pink-50 px-1 ">vite</span>构建，
              集成的技术栈包括：
            </div>
            <ul className="">
              <li>1. react、react-dom（UI框架：必备）</li>
              <li>2. react-router（页面路由工具：必备）</li>
              <li>3. redux、redux-saga（客户端状态管理工具：进行中）</li>
              <li>4. react-query（服务端状态管理工具：选用）</li>
              <li>5. Vite（打包工具）</li>
              <li>6. eslint（代码校验工具： 必备）</li>
              <li>7. prettier（代码格式化工具：选用）</li>
              <li>8. typescript和各种ts类型库（typescript支持：选用）</li>
              <li>9. antd（UI库：必备）</li>
              <li>10. tailwind css（CSS框架：选用）</li>
              <li>11. mock数据（json-server）</li>
            </ul>
            <div className="leading-6">
              项目中的页面路由根据目录结构自动生成，具体规则是根据src/pages目录下文件夹名称生成对应的路由，每个文件夹中名称为
              <span className="text-pink-500 bg-pink-50 px-1 ">pages</span>
              的目录下的文件夹会拼接在当前目录名后生成同级路由；名称为
              <span className="text-pink-500 bg-pink-50 px-1 ">children</span>
              的目录下的文件夹会拼接在当前目录名后生成嵌套子路由；文件夹名称以
              <span className="text-pink-500 bg-pink-50 px-1 ">_</span>
              开头的会生成动态路由。 具体用法，请参考src/pages目录下的
              <span className="text-pink-500 bg-pink-50 px-1 ">article-manage</span>和
              <span className="text-pink-500 bg-pink-50 px-1 ">article</span>
              目录下的示例代码。
              <span>
                请注意：开启示例代码需要同时开启本地mock服务。请同时运行
                <span className="text-pink-500 bg-pink-50 px-1 ">npm run dev</span>（或者
                <span className="text-pink-500 bg-pink-50 px-1 ">yarn dev</span>
                ）和 <span className="text-pink-500 bg-pink-50 px-1 ">npm run mock</span>
                （或者<span className="text-pink-500 bg-pink-50 px-1 ">yarn mock</span>
                ）。
              </span>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div className="px-4 py-4 ">
            <div className="text-base text-gray-700 font-semibold text-center">
              示例项目路由
            </div>
            <div className="py-4">
              <Link className="block" to="/article">
                文章列表：/article
              </Link>
              <Link className="block" to="/article-manage/home">
                文章管理：/article-manage/home
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
