import CommonUtil from '@/utils/CommonUtil';
import { TreeSelect } from 'antd';
import classNames from 'classnames';
import { useState } from 'react';
import CommonInputError from './CommonInputError';

/*

    value(string, [])
    onChange : (selectKeys(string, []), treeLabel(string), componentTreeInfo)
    treeData : []
    showSearch = false,
    treeCheckable = true(true면 multi, false면 single)

*/
function AppTreeSelect(props) {
  const {
    name = '',
    id = CommonUtil.getUUID(),
    label,
    value,
    treeData = [],
    onChange,
    placeholder = '',
    errorMessage,
    style = { width: '100%' },
    showSearch = false,
    treeCheckable = true,
    ...rest
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const applyClassName = classNames('app-form-select', {});

  const applyValue = value ? value : null;

  return (
    <>
      <TreeSelect
        {...rest}
        status={!isFocused && errorMessage ? 'error' : ''}
        style={style}
        className={applyClassName}
        dropdownStyle={{
          maxHeight: 400,
          overflow: 'auto',
        }}
        id={id}
        name={name}
        value={applyValue}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        treeData={treeData}
        showSearch={showSearch}
        treeCheckable={treeCheckable}
      ></TreeSelect>
      <CommonInputError errorMessage={errorMessage} label={label} />
    </>
  );
}

export default AppTreeSelect;
