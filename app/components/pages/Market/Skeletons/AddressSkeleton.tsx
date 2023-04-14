import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const AddressSkeleton = () => {
  return (
    <>
      <SkeletonPlaceholder borderRadius={4}>
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
          <SkeletonPlaceholder.Item
            marginLeft={25}
            marginTop={5}
            flexDirection="column">
            <SkeletonPlaceholder.Item width={200} height={20} marginTop={20} />
            <SkeletonPlaceholder.Item marginTop={6} width={130} height={20} />
            <SkeletonPlaceholder.Item width={200} height={20} marginTop={20} />
            <SkeletonPlaceholder.Item marginTop={6} width={130} height={20} />
            <SkeletonPlaceholder.Item width={200} height={20} marginTop={20} />
            <SkeletonPlaceholder.Item marginTop={6} width={130} height={20} />
            <SkeletonPlaceholder.Item width={200} height={20} marginTop={20} />
            <SkeletonPlaceholder.Item marginTop={6} width={130} height={20} />
            <SkeletonPlaceholder.Item width={200} height={20} marginTop={20} />
            <SkeletonPlaceholder.Item marginTop={6} width={130} height={20} />
            <SkeletonPlaceholder.Item width={200} height={20} marginTop={20} />
            <SkeletonPlaceholder.Item marginTop={6} width={130} height={20} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </>
  );
};

export default AddressSkeleton;
