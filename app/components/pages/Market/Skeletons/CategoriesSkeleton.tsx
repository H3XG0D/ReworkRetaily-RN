import React from 'react';
import {ScrollView} from 'react-native';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const CategoriesSkeleton = () => {
  return (
    <ScrollView>
      <SkeletonPlaceholder borderRadius={4}>
        <SkeletonPlaceholder borderRadius={4}>
          <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
            <SkeletonPlaceholder.Item
              marginLeft={5}
              flexDirection="row"
              flexWrap="wrap"
              gap={10}
              borderRadius={10}>
              <SkeletonPlaceholder.Item width={160} height={120} />
              <SkeletonPlaceholder.Item width={160} height={120} />
              <SkeletonPlaceholder.Item
                width={160}
                height={120}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={160}
                height={120}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={160}
                height={120}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={160}
                height={120}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={160}
                height={120}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={160}
                height={120}
                marginTop={10}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </SkeletonPlaceholder>
    </ScrollView>
  );
};

export default CategoriesSkeleton;
