import React from 'react';

import { useSelector } from 'react-redux';

import { Button, Badge, Row, Col, Dropdown, Divider, Avatar } from 'antd';
import { NotificationBing, TickCircle } from 'iconsax-react';

import avatarImg1 from '../../../assets/images/memoji/user-avatar-1.png';
import avatarImg2 from '../../../assets/images/memoji/user-avatar-2.png';
import avatarImg3 from '../../../assets/images/memoji/user-avatar-3.png';

export default function HeaderNotifications() {
  const direction = useSelector((state) => state.customise.direction);

  const notificationMenu = (
    <div
      className="hp-notification-dropdown hp-border-radius hp-border-color-black-40 hp-bg-black-0 hp-bg-dark-100 hp-border-color-dark-80 hp-pt-24 hp-pb-18 hp-px-24"
      style={{ marginTop: 23 }}
    >
      <Row
        wrap={false}
        align="middle"
        justify="space-between"
        className="hp-mb-16"
      >
        <Col className="h5 hp-text-color-black-100 hp-text-color-dark-0 hp-mr-64">
          Notifications
        </Col>

        <Col className="hp-badge-text hp-font-weight-500 hp-text-color-black-80 hp-ml-24">
          4 New
        </Col>
      </Row>

      <Divider className="hp-mt-0 hp-mb-4" />

      <div
        className="hp-overflow-y-auto hp-px-10"
        style={{ maxHeight: 400, marginRight: -10, marginLeft: -10 }}
      >
        <Row
          className="hp-cursor-pointer hp-border-radius hp-transition hp-hover-bg-primary-4 hp-hover-bg-dark-80 hp-py-12 hp-px-10"
          style={{ marginLeft: -10, marginRight: -10 }}
        >
          <Col className="hp-mr-12">
            <Avatar
              size={48}
              src={avatarImg1}
              className="hp-d-flex-center-full"
            />
          </Col>

          <Col flex="1 0 0">
            <p className="hp-d-block hp-font-weight-500 hp-p1-body hp-text-color-black-100 hp-text-color-dark-0 hp-mb-4">
              Debi Cakar{' '}
              <span className="hp-text-color-black-60">commented on</span>{' '}
              Ecosystem and conservation
            </p>

            <span className="hp-d-block hp-badge-text hp-font-weight-500 hp-text-color-black-60 hp-text-color-dark-40">
              1m ago
            </span>
          </Col>
        </Row>

        <Row
          className="hp-cursor-pointer hp-border-radius hp-transition hp-hover-bg-primary-4 hp-hover-bg-dark-80 hp-py-12 hp-px-10"
          style={{ marginLeft: -10, marginRight: -10 }}
        >
          <Col className="hp-mr-12">
            <Avatar
              size={48}
              src={avatarImg2}
              className="hp-d-flex-center-full"
            />
          </Col>

          <Col flex="1 0 0">
            <p className="hp-d-block hp-font-weight-500 hp-p1-body hp-text-color-black-100 hp-text-color-dark-0 hp-mb-4">
              Edward Adams{' '}
              <span className="hp-text-color-black-60">invite you to</span>{' '}
              Prototyping
            </p>

            <span className="hp-d-block hp-badge-text hp-font-weight-500 hp-text-color-black-60 hp-text-color-dark-40">
              9h ago
            </span>
          </Col>
        </Row>

        <Row
          className="hp-cursor-pointer hp-border-radius hp-transition hp-hover-bg-primary-4 hp-hover-bg-dark-80 hp-py-12 hp-px-10"
          style={{ marginLeft: -10, marginRight: -10 }}
        >
          <Col className="hp-mr-12">
            <Avatar
              size={48}
              src={avatarImg3}
              className="hp-d-flex-center-full"
            />
          </Col>

          <Col flex="1 0 0">
            <p className="hp-d-block hp-font-weight-500 hp-p1-body hp-text-color-black-100 hp-text-color-dark-0 hp-mb-4">
              Richard Charles{' '}
              <span className="hp-text-color-black-60">mentioned you in</span>{' '}
              UX Basics Field
            </p>

            <span className="hp-d-block hp-badge-text hp-font-weight-500 hp-text-color-black-60 hp-text-color-dark-40">
              13h ago
            </span>
          </Col>
        </Row>

        <Row
          className="hp-cursor-pointer hp-border-radius hp-transition hp-hover-bg-primary-4 hp-hover-bg-dark-80 hp-py-12 hp-px-10"
          style={{ marginLeft: -10, marginRight: -10 }}
        >
          <Col className="hp-mr-12">
            <Avatar
              size={48}
              icon={
                <TickCircle
                  size={24}
                  variant="Bold"
                  className="hp-text-color-success-1"
                />
              }
              className="hp-d-flex-center-full hp-bg-success-4 hp-bg-dark-success"
            />
          </Col>

          <Col flex="1 0 0">
            <p className="hp-d-block hp-font-weight-500 hp-p1-body hp-text-color-black-100 hp-text-color-dark-0 hp-mb-4">
              <span className="hp-text-color-black-60">
                You swapped exactly
              </span>{' '}
              0.230000 ETH <span className="hp-text-color-black-60">for</span>{' '}
              28,031.99
            </p>

            <span className="hp-d-block hp-badge-text hp-font-weight-500 hp-text-color-black-60 hp-text-color-dark-40">
              17h ago
            </span>
          </Col>
        </Row>
      </div>
    </div>
  );

  return (
    <Col className="hp-d-flex-center">
      <Button
        ghost
        className="hp-border-none hp-hover-bg-black-10 hp-hover-bg-dark-100"
        icon={
          <Dropdown overlay={notificationMenu} placement="bottomRight">
            <div className="hp-position-relative">
              <div
                className="hp-position-absolute"
                style={
                  direction == 'rtl'
                    ? { left: -5, top: -5 }
                    : { right: -5, top: -5 }
                }
              >
                <Badge dot status="processing" />
              </div>

              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.3282 13.7463C16.8946 12.9994 16.2501 10.8861 16.2501 8.12597C16.2501 6.46837 15.5916 4.87866 14.4195 3.70656C13.2474 2.53445 11.6577 1.87597 10.0001 1.87597C8.34247 1.87597 6.75276 2.53445 5.58065 3.70656C4.40855 4.87866 3.75007 6.46837 3.75007 8.12597C3.75007 10.8869 3.10476 12.9994 2.67116 13.7463C2.56044 13.9362 2.50174 14.1519 2.50098 14.3717C2.50023 14.5915 2.55745 14.8076 2.66687 14.9982C2.77629 15.1889 2.93404 15.3473 3.12422 15.4575C3.31439 15.5677 3.53027 15.6258 3.75007 15.626H6.93835C7.08255 16.3316 7.46603 16.9657 8.02392 17.4211C8.58182 17.8765 9.2799 18.1253 10.0001 18.1253C10.7202 18.1253 11.4183 17.8765 11.9762 17.4211C12.5341 16.9657 12.9176 16.3316 13.0618 15.626H16.2501C16.4698 15.6257 16.6856 15.5675 16.8757 15.4572C17.0657 15.3469 17.2234 15.1885 17.3327 14.9979C17.442 14.8073 17.4992 14.5912 17.4984 14.3715C17.4976 14.1518 17.4389 13.9361 17.3282 13.7463ZM10.0001 16.876C9.61243 16.8759 9.23435 16.7556 8.91788 16.5317C8.60141 16.3079 8.3621 15.9914 8.23288 15.626H11.7673C11.638 15.9914 11.3987 16.3079 11.0823 16.5317C10.7658 16.7556 10.3877 16.8759 10.0001 16.876ZM3.75007 14.376C4.35163 13.3416 5.00007 10.9447 5.00007 8.12597C5.00007 6.79989 5.52686 5.52812 6.46454 4.59044C7.40222 3.65276 8.67399 3.12597 10.0001 3.12597C11.3262 3.12597 12.5979 3.65276 13.5356 4.59044C14.4733 5.52812 15.0001 6.79989 15.0001 8.12597C15.0001 10.9424 15.6469 13.3393 16.2501 14.376H3.75007Z"
                  fill="#636E72"
                />
              </svg>
            </div>
          </Dropdown>
        }
      />
    </Col>
  );
}
