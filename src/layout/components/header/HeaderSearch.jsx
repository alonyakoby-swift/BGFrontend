import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { createAutocomplete } from '@algolia/autocomplete-core';

import { Input } from 'antd';
import { SearchNormal1 } from 'iconsax-react';

import pagesJson from './search-data/algolia-pages.json';

export default function HeaderSearch(props) {
  const [autocompleteState, setAutocompleteState] = useState({});

  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        onStateChange({ state }) {
          setAutocompleteState(state);
        },
        getSources() {
          return [
            {
              sourceId: 'pages-source',
              getItemInputValue({ item }) {
                return item.query;
              },
              getItems({ query }) {
                if (!query) {
                  return pagesJson;
                }
                return pagesJson.filter((item) =>
                  item.title.toLowerCase().includes(query.toLowerCase())
                );
              },
              getItemUrl({ item }) {
                return item.url;
              },
              templates: {
                item({ item }) {
                  return item.title;
                },
              },
            },
          ];
        },
      }),
    []
  );

  function linkHandleClick() {
    autocompleteState.query = '';
    props.setSearchHeader(false);
  }

  return (
    <div {...autocomplete.getRootProps({})}>
      <Input
        {...props.inputFocusProp}
        {...autocomplete.getInputProps({})}
        placeholder="Search..."
        prefix={
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.9424 17.0588L14.0306 13.1479C15.1644 11.7867 15.7298 10.0408 15.6091 8.27342C15.4884 6.50604 14.691 4.85321 13.3828 3.65876C12.0745 2.46432 10.3561 1.82024 8.5851 1.86049C6.81406 1.90074 5.12671 2.62223 3.87407 3.87487C2.62143 5.12751 1.89994 6.81486 1.85969 8.5859C1.81944 10.3569 2.46353 12.0753 3.65797 13.3836C4.85241 14.6918 6.50524 15.4892 8.27263 15.6099C10.04 15.7306 11.7859 15.1652 13.1471 14.0314L17.058 17.9432C17.1161 18.0012 17.185 18.0473 17.2609 18.0787C17.3367 18.1101 17.4181 18.1263 17.5002 18.1263C17.5823 18.1263 17.6636 18.1101 17.7395 18.0787C17.8154 18.0473 17.8843 18.0012 17.9424 17.9432C18.0004 17.8851 18.0465 17.8162 18.0779 17.7403C18.1094 17.6644 18.1255 17.5831 18.1255 17.501C18.1255 17.4189 18.1094 17.3375 18.0779 17.2617C18.0465 17.1858 18.0004 17.1169 17.9424 17.0588ZM3.12518 8.75097C3.12518 7.63845 3.45508 6.55092 4.07316 5.62589C4.69124 4.70087 5.56975 3.9799 6.59758 3.55415C7.62542 3.12841 8.75642 3.01702 9.84756 3.23406C10.9387 3.4511 11.941 3.98683 12.7277 4.7735C13.5143 5.56017 14.0501 6.56245 14.2671 7.65359C14.4841 8.74473 14.3727 9.87573 13.947 10.9036C13.5213 11.9314 12.8003 12.8099 11.8753 13.428C10.9502 14.0461 9.8627 14.376 8.75018 14.376C7.25884 14.3743 5.82906 13.7812 4.77453 12.7266C3.72 11.6721 3.12683 10.2423 3.12518 8.75097Z"
              fill="#636E72"
            />
          </svg>
        }
      />

      <div
        className="hp-header-search-result"
        {...autocomplete.getPanelProps({})}
      >
        {autocompleteState.isOpen &&
          autocompleteState.collections.map((collection, index) => {
            const { source, items } = collection;

            return (
              items.length > 0 && (
                <ul key={index} {...autocomplete.getListProps()}>
                  {items.map(
                    (item, index) =>
                      index < 4 && (
                        <li
                          key={index}
                          {...autocomplete.getItemProps({
                            item,
                            source,
                          })}
                          className="hp-font-weight-500"
                        >
                          <Link to={item.url} onClick={linkHandleClick}>
                            {item.title}
                          </Link>
                        </li>
                      )
                  )}
                </ul>
              )
            );
          })}
      </div>
    </div>
  );
}
