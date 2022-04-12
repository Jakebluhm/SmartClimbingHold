import styled from 'styled-components/native';

export const BackgoundImage = styled.ImageBackground.attrs(props => ({
  imageStyle: {
    width: '150%',
    height: '100%',
    transform: [
      {
        translateX: props.translateIn.inX,
      },
    //   {
    //     translateY: props.translateIn.inY,
    //   },
      {
        rotate: '0deg',
      },
    ],
  },
}))`
  position: absolute;  
  left: 0;
  flex: 1;
  width: 100%;
  height: 100%;
  opacity: 1;
`;