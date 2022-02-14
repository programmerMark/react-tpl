import './index.css';

import { Col, Row } from 'antd';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Outlet } from 'react-router-dom';

import { Footer } from '../../components/footer';
import { Header } from '../../components/header';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen flex flex-col">
        <Header />
        <div className="flex-1">
          <Row className="w-full h-full bg-gray-100">
            <Col span={20} offset={2}>
              <div className="h-full py-6 ">
                <div className="h-full bg-white rounded border border-gray-100">
                  <Outlet />
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
