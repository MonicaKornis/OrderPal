import {memo } from 'react';
import ImgSrc from '../assets/search.svg';
import styled from 'styled-components';

const SearchInput = styled.input`
    width: 156px;
    background-color: #ccc;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    height: 20px;
    display: flex;
    align-self: flex-end;
    background: transparent url(${ImgSrc}) no-repeat 12px;
    font-size: 12px;
    padding: 9px 36px 7px 40px;
    border: 1px solid #80808047;
    &::placeholder {
    color: #80808085;
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
    margin: 0;
    }
`;


const SearchBar = memo(({keyword, handleChange, placeholderText}) => {
    return <SearchInput value={keyword} key="search-bar" placeholder={placeholderText} onChange={handleChange}  type="number"/>
});

export default SearchBar;