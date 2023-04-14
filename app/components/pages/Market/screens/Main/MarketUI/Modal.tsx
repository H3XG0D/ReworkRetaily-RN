import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClose} from '@fortawesome/free-solid-svg-icons/faClose';
import {COLORS, siteUrl} from '../../../../../../constants';
import styled from 'styled-components';

import ReactNativeModal from 'react-native-modal';
import Button from '../../../../../UI/Button';

interface Props {
  content: any;
  isVisible: any;
  showModal: () => void;
}

const Modal = (props: Props) => {
  return (
    <ReactNativeModal
      isVisible={props.isVisible}
      backdropOpacity={0.4}
      style={{
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0,
        justifyContent: 'flex-end',
      }}>
      <View
        style={{
          maxHeight: 1100 - 20,
          width: '100%',
          backgroundColor: 'white',
          borderRadius: 15,
          marginTop: 50,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={() => props.showModal()}>
            <FontAwesomeIcon
              icon={faClose}
              size={28}
              style={{marginLeft: 'auto', marginRight: 20, marginTop: 15}}
            />
          </TouchableOpacity>
          <Image
            source={{
              uri:
                siteUrl +
                '/api/repo/' +
                (props.content && props.content.images?.length > 0
                  ? props.content.images[0]
                  : undefined),
            }}
            style={{
              width: 330,
              height: 200,
              borderRadius: 15,
              marginTop: 20,
              alignSelf: 'center',
            }}
          />
          <MarketBannerView>
            <MarketBannerTitle>
              {props.content ? props.content.title : undefined}
            </MarketBannerTitle>
            <MarketBannerSubtitle>
              {props.content ? props.content.content : undefined}
            </MarketBannerSubtitle>
          </MarketBannerView>
          <Button
            onPress={() => ''}
            title="Перейти"
            style={{
              alignSelf: 'center',
              marginBottom: 60,
              backgroundColor: COLORS.tertiary,
            }}
          />
        </ScrollView>
      </View>
    </ReactNativeModal>
  );
};

export default Modal;

const MarketBannerView = styled(View)`
  padding: 20px 20px;
  margin-left: 10px;
  gap: 10px;
`;

const MarketBannerTitle = styled(Text)`
  color: ${COLORS.black};
  font-size: 22px;
  font-weight: 600;
`;

const MarketBannerSubtitle = styled(Text)`
  color: ${COLORS.black};
  font-size: 13px;
`;

const MarketBannerButton = styled(View)`
  background-color: ${COLORS.tertiary};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 45px;
  margin-bottom: 60px;
  margin-left: auto;
  margin-right: auto;
`;

const MarketBannerButtonText = styled(Text)`
  color: ${COLORS.white};
  font-size: 16px;
  font-weight: 600;
`;
