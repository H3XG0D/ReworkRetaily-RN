import React from 'react';
import styled from 'styled-components';

import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {COLORS} from '../../../../../../constants';
import {getClient} from '../../../../../../api/api';

const [active, setActive] = React.useState<string | undefined>(undefined);
const [suppliers, setSuppliers] = React.useState<any>([]);

const getSuppliers = async () => {
  const result = await getClient({cmd: 'getsuppliers'});
  setSuppliers(result);
};

const Tags = () => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{marginTop: 25}}>
      <TouchableOpacity onPress={() => setActive(undefined)}>
        <MarketPaginationFilterAll
          style={{
            backgroundColor: active === undefined ? '#288AF4' : '#E4E4E6',
          }}>
          <MarketPaginationFilterTextTabs
            style={{color: active === undefined ? 'white' : 'black'}}>
            Все
          </MarketPaginationFilterTextTabs>
        </MarketPaginationFilterAll>
      </TouchableOpacity>
      <MarketPaginationSpace>
        {suppliers?.tags?.map((item: any) => {
          return (
            <TouchableOpacity onPress={() => setActive(item.code)}>
              <MarketPagnationFilters
                style={{
                  backgroundColor: item.code === active ? '#288AF4' : '#E4E4E6',
                }}>
                <MarketPaginationFilterTextTabs
                  style={{
                    color: item.code === active ? 'white' : 'black',
                  }}>
                  {item.name}
                </MarketPaginationFilterTextTabs>
              </MarketPagnationFilters>
            </TouchableOpacity>
          );
        })}
      </MarketPaginationSpace>
    </ScrollView>
  );
};

React.useEffect(() => {
  getSuppliers();
}, []);

export default Tags;

const MarketPaginationFilterAll = styled(View)`
  background-color: ${COLORS.brightgray};

  align-items: center;
  justify-content: center;

  border-radius: 10px;

  padding: 10px 15px;
  margin-left: 15px;
`;

const MarketPagnationFilters = styled(View)`
  background-color: ${COLORS.brightgray};

  align-items: center;
  justify-content: center;

  border-radius: 10px;

  margin-left: 5px;
  margin-right: 5px;
  padding: 10px 15px;
`;

const MarketPaginationSpace = styled(View)`
  flex-direction: row;

  margin-left: 5px;
  margin-right: 15px;
`;

const MarketPaginationFilterTextTabs = styled(Text)`
  color: ${COLORS.black};
  font-size: 16px;
`;

// * Content

const MarketContentContainer = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 25px;

  margin-bottom: 90px;
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

const MarketBannerView = styled(View)`
  gap: 10px;

  padding: 20px 20px;
  margin-left: 10px;
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
  width: 300px;
  height: 45px;

  background-color: ${COLORS.tertiary};
  border-radius: 10px;

  align-items: center;
  justify-content: center;

  margin-bottom: 60px;
  align-self: center;
`;

const MarketBannerButtonText = styled(Text)`
  color: ${COLORS.white};

  font-size: 16px;
  font-weight: 600;
`;

const MarketContentBoxContainer = styled(View)`
  width: 160px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
`;
