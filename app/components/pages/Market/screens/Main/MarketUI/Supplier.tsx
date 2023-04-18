import React from 'react';
import styled from 'styled-components';

import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import {COLORS, siteUrl} from '../../../../../../constants';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MarketRootParamList} from '../../../../../../Navigation/routes';
import SupplierSkeleton from '../../../Skeletons/SupplierSkeleton';
import {useAppDispatch} from '../../../../../../../redux/store/store.hooks';
import {ISupplier} from '../../../../../../../redux/types';

interface Props {
  suppliers: any;
  active: any;
  setContent: any;
  loadSkeleton: any;
}

const Supplier = (props: Props) => {
  const dispatch = useAppDispatch();

  const [supplier, setSupplier] = React.useState<any>(undefined);

  const navigation =
    useNavigation<NativeStackNavigationProp<MarketRootParamList>>();

  return (
    <ScrollView>
      {props.loadSkeleton ? (
        <SupplierSkeleton />
      ) : (
        <MarketContentContainer>
          {props.suppliers?.suppliers && props.suppliers.suppliers.length > 0
            ? props.suppliers.suppliers
                .filter(
                  (f: any) =>
                    (f.tags &&
                      f.tags.some(
                        (t: any) =>
                          t === props.active && f.parent_code != 'parent_01',
                      )) ||
                    (!props.active && f.parent_code != 'parent_01'),
                )
                .map((supplier: any) => {
                  return (
                    <TouchableOpacity
                      onPressIn={() => {
                        {
                          setSupplier(supplier);
                        }
                      }}
                      onPress={() =>
                        supplier.code === 'parent_01'
                          ? navigation.navigate('ParentMeat', {supplier})
                          : navigation.navigate('Address', {supplier})
                      }>
                      {/* // ! TODO: Add skeleton here */}
                      <MarketContentBoxContainer>
                        <MarketContentBox>
                          <Image
                            source={{
                              uri:
                                supplier &&
                                supplier.images &&
                                supplier.images.length > 0
                                  ? siteUrl + '/api/repo/' + supplier.images[0]
                                  : undefined,
                            }}
                            style={{width: 130, height: 130}}></Image>
                          <MarketContentBoxText>
                            {supplier.name}
                          </MarketContentBoxText>
                        </MarketContentBox>
                      </MarketContentBoxContainer>
                    </TouchableOpacity>
                  );
                })
            : undefined}
        </MarketContentContainer>
      )}
    </ScrollView>
  );
};

export default Supplier;

const MarketContentContainer = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 25px;

  padding: 30px 20px 20px 25px;
`;

const MarketContentBox = styled(View)`
  width: 160px;
  height: 190px;

  align-items: center;
  justify-content: center;

  border-radius: 10px;
`;

const MarketContentBoxText = styled(Text)`
  color: ${COLORS.black};

  font-size: 18px;
  text-align: center;
`;

const MarketContentBoxContainer = styled(View)`
  width: 160px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
`;
