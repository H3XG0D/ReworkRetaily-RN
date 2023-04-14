import React from 'react';
import styled from 'styled-components';
import {View, ScrollView, TouchableOpacity, Image, Text} from 'react-native';

import {siteUrl} from '../../../../../../constants';
import {getClient} from '../../../../../../api/api';
import BannerSkeleton from '../../../Skeletons/BannerSkeleton';

interface Props {
  showModal: () => void;
  setContent: any;
  loadSkeleton: any;
  setLoadSkeleton: any;
}

const Banner = (props: Props) => {
  const [image, setImage] = React.useState<any>([]);

  const getBanners = async () => {
    props.setLoadSkeleton(true);
    const result = await getClient({cmd: 'getbanners'});
    setImage(result);
    props.setLoadSkeleton(false);
  };

  React.useEffect(() => {
    getBanners();
  }, []);

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <MarketPaginationSpace>
        {props.loadSkeleton ? (
          <BannerSkeleton />
        ) : (
          <View style={{flexDirection: 'row'}}>
            {image?.standart && image.standart.length > 0
              ? image.standart.map((banner: any) => {
                  return (
                    <TouchableOpacity
                      onPressIn={() => {
                        props.setContent(banner);
                        props.showModal();
                      }}>
                      <MarketPaginationBox>
                        <Image
                          source={{
                            uri:
                              banner &&
                              banner.images &&
                              banner.images.length > 0
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
        )}
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
