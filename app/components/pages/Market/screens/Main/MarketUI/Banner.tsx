import React from 'react';
import styled from 'styled-components';
import {View, ScrollView, TouchableOpacity, Image, Text} from 'react-native';

import {siteUrl} from '../../../../../../constants';
import {getClient} from '../../../../../../api/api';

const Banner = () => {
  const [image, setImage] = React.useState<any>([]);
  const [content, setContent] = React.useState<any>(undefined);

  const getBanners = async () => {
    const result = await getClient({cmd: 'getbanners'});
    setImage(result);
  };

  React.useEffect(() => {
    getBanners();
  }, []);

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <MarketPaginationSpace>
        <View style={{flexDirection: 'row'}}>
          {image?.standart && image.standart.length > 0
            ? image.standart.map((banner: any) => {
                return (
                  <TouchableOpacity onPressIn={() => setContent(banner)}>
                    <MarketPaginationBox>
                      <Image
                        source={{
                          uri:
                            banner && banner.images && banner.images.length > 0
                              ? siteUrl + '/api/repo/' + banner.images[0]
                              : undefined,
                        }}
                        style={{
                          width: '100%',
                          height: '100%',
                        }}></Image>
                    </MarketPaginationBox>
                  </TouchableOpacity>
                );
              })
            : undefined}
        </View>
      </MarketPaginationSpace>
    </ScrollView>
  );
};

export default Banner;

const MarketPaginationBox = styled(View)`
  width: 150px;
  height: 100px;
  border-radius: 10px;

  margin-left: 5px;
  margin-right: 5px;
  margin-top: 20px;
`;

const MarketPaginationSpace = styled(View)`
  flex-direction: row;

  margin-left: 5px;
  margin-right: 15px;
`;
