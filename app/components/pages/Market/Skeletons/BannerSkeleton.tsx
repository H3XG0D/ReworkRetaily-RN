import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const BannerSkeleton = () => {
  return (
    <>
      <SkeletonPlaceholder borderRadius={4}>
        <SkeletonPlaceholder borderRadius={4}>
          <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
            <SkeletonPlaceholder.Item
              flexDirection="row"
              marginRight={20}
              marginTop={25}
              marginLeft={10}>
              <SkeletonPlaceholder.Item width={140} height={90} />
              <SkeletonPlaceholder.Item
                marginLeft={10}
                width={140}
                height={90}
              />
              <SkeletonPlaceholder.Item
                marginLeft={10}
                width={140}
                height={90}
              />
              <SkeletonPlaceholder.Item
                marginLeft={10}
                width={140}
                height={90}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </SkeletonPlaceholder>
    </>
  );
};

export default BannerSkeleton;
