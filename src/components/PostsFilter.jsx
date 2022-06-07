import React from 'react';
import MyInput from './UI/input/MyInput.jsx';
import MySelect from './UI/select/MySelect.jsx'

const PostsFilter = ({filter, setFilter}) => {
     return (
          <div>
               <MyInput
                    placeholder='Поиск...'
                    value={filter.search}
                    onChange={e => setFilter({...filter, search: e.target.value})}
               />
               <MySelect
                    value={filter.sort}
                    onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                    defaultValue='Сортировка'
                    options={[
                         { value: 'title', name: 'По названию' },
                         { value: 'body', name: 'По описанию' }
                    ]}
               />
          </div>
     );
};

export default PostsFilter;