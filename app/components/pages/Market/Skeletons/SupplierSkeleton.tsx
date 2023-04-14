import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const SupplierSkeleton = () => {
  return (
    <>
      <SkeletonPlaceholder borderRadius={4}>
        <SkeletonPlaceholder borderRadius={4}>
          <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
            <SkeletonPlaceholder.Item
              flexDirection="row"
              flexWrap="wrap"
              marginRight={20}
              marginLeft={30}
              borderRadius={10}
              marginTop={30}>
              <SkeletonPlaceholder.Item width={160} height={200} />
              <SkeletonPlaceholder.Item
                marginLeft={20}
                width={160}
                height={200}
              />
              <SkeletonPlaceholder.Item
                width={160}
                height={200}
                marginTop={30}
              />
              <SkeletonPlaceholder.Item
                marginLeft={20}
                width={160}
                height={200}
                marginTop={30}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </SkeletonPlaceholder>
    </>
  );
};

export default SupplierSkeleton;
