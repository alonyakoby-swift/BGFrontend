import { Col } from 'antd';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import pageJson from './search-data/algolia-pages.json';

export default function HeaderText() {
  const { pathname } = useLocation();

  const [titleFix, setTitleFix] = useState('Dashboard');

  useEffect(() => {
    const getPage = pageJson?.find(({ url }) => url == pathname) || {
      title: 'Dashboard',
    };

    setTitleFix(getPage?.title?.replace('Dashboard ', ''));
  }, [pathname]);

  return (
    <Col xl={16} lg={14} className="hp-header-left-text hp-d-flex-center">
      <h1 className="hp-mb-0">{titleFix}</h1>
    </Col>
  );
}
