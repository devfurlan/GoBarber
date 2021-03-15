import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: ${getStatusBarHeight()}px 30px 0;
`;

export const Content = styled.ScrollView``;

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  color: #F4EDE8;
  margin: 24px 0;
`;

export const BackButton= styled.TouchableOpacity`
  margin-top: 20px;
`;

export const UserAvatarButton= styled.TouchableOpacity`
  margin-top: 16px;
`;

export const UserAvatar= styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  align-self: center;
`;
