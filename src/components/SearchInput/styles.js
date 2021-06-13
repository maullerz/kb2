import styled from 'styled-components'
import { IconButton, FilledInput } from '@material-ui/core'

export const Root = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;

  // @media (max-width: 500px) {
  //   position: absolute;
  //   left: 0;
  //   right: 10px;
  //   padding-right: 10px;
  //   z-index: 100;
  // }
`

export const InputWrapper = styled.div`
  position: relative;
  border-radius: 4px;

  // @media (max-width: 500px) {
  //   background-color: #424242;
  // }
`

export const StyledIconButton = styled(IconButton)`
  min-width: 30px;
  min-height: 30px;
  margin-right: 8px;
  background: transparent;
`

export const StyledInput = styled(FilledInput)`
  background-color: var(--searchInputBackground);
  border-radius: 4px;

  min-width: 300px;

  @media (max-width: 500px) {
    min-width: 200px;
    // width: 100%;
  }

  :hover {
    background-color: var(--tableHeaderBackground);
  }

  &&.Mui-focused {
    background-color: var(--tableHeaderBackground);
  }

  .MuiInputBase-input {
    height: 40px;
    max-height: 40px;
    padding: 0 12px;
  }

  &&.MuiFilledInput-adornedEnd {
    padding-right: 0px;
  }

  &&.MuiFilledInput-underline:before,
  &&.MuiFilledInput-underline:after {
    content: none;
    // content: '';
    // border: none;
    // transition: none;
  }

  .MuiFilledInput-input::-webkit-outer-spin-button,
  .MuiFilledInput-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

export const ItemName = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 5px;

  > div {
    display: flex;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    span {
      margin-left: 6px;
    }
  }

  > span {
    margin-left: 4px;
    font-size: 12px;
    color: grey;
  }

  &:hover {
    background-color: #888;

    > span {
      color: white;
    }
  }
`

export const Separator = styled.div`
  height: 1px;
  border-top: 1px solid var(--tableBorder);
`

export const Dropdown = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  // margin-left: 50px;
  z-index: 100;
  font-size: 14px;
  color: white;
`

export const Overlay = styled.div`
  z-index: 1;
  position: absolute;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 0;
  background-color: #333;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
`
