import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const MyRequestSkeleton = () => {
  return (
    <>
      <SkeletonPlaceholder borderRadius={4}>
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
          <SkeletonPlaceholder.Item marginLeft={20} flexDirection="column">
            <SkeletonPlaceholder.Item width={350} height={100} marginTop={20} />
            <SkeletonPlaceholder.Item width={350} height={100} marginTop={20} />
            <SkeletonPlaceholder.Item width={350} height={100} marginTop={20} />
            <SkeletonPlaceholder.Item width={350} height={100} marginTop={20} />
            <SkeletonPlaceholder.Item width={350} height={100} marginTop={20} />
            <SkeletonPlaceholder.Item width={350} height={100} marginTop={20} />
            <SkeletonPlaceholder.Item width={350} height={100} marginTop={20} />
            <SkeletonPlaceholder.Item width={350} height={100} marginTop={20} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </>
  );
};

export default MyRequestSkeleton;
