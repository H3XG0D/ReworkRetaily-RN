import React from 'react';
import styled from 'styled-components';

import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {COLORS} from '../../../../../../constants';
import TagsSkeleton from '../../../Skeletons/TagsSkeleton';

interface Props {
  setActive?: any;
  active?: any;
  suppliers: any;
  loadSkeleton: any;
}

const Tags = (props: Props) => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{marginTop: 25}}>
      {props.loadSkeleton ? (
        <TagsSkeleton />
      ) : (
        <>
          <TouchableOpacity onPress={() => props.setActive(undefined)}>
            <MarketPaginationFilterAll
              style={{
                backgroundColor:
                  props.active === undefined ? '#288AF4' : '#E4E4E6',
              }}>
              <MarketPaginationFilterTextTabs
                style={{color: props.active === undefined ? 'white' : 'black'}}>
                Все
              </MarketPaginationFilterTextTabs>
            </MarketPaginationFilterAll>
          </TouchableOpacity>
          <MarketPaginationSpace>
            {props.suppliers?.tags?.map((item: any) => {
              return (
                <TouchableOpacity onPress={() => props.setActive(item.code)}>
                  <MarketPagnationFilters
                    style={{
                      backgroundColor:
                        item.code === props.active ? '#288AF4' : '#E4E4E6',
                    }}>
                    <MarketPaginationFilterTextTabs
                      style={{
                        color: item.code === props.active ? 'white' : 'black',
                      }}>
                      {item.name}
                    </MarketPaginationFilterTextTabs>
                  </MarketPagnationFilters>
                </TouchableOpacity>
              );
            })}
          </MarketPaginationSpace>
        </>
      )}
    </ScrollView>
  );
};

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
