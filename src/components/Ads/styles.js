import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  max-width: 728px;
  min-width: 320px;
  // margin: 8px 0;

  > ins {
    width: 320px;
    height: 300px;

    @media(max-width: 499px) {
      width: 100%;
      min-width: 320px;
      max-width: 499px;
      height: 300px;
    }

    @media(min-width: 500px) {
      width: 468px;
      height: 60px;
    }

    @media(min-width: 800px) {
      width: 728px;
      height: 90px;
    }

    @media(min-width: 1024px) {
      width: 1000px;
      height: 90px;
    }
  }

  .background {
    background: grey;
  }
`
