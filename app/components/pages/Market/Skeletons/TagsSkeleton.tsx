import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const TagsSkeleton = () => {
  return (
    <>
      <SkeletonPlaceholder borderRadius={4}>
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
          <SkeletonPlaceholder.Item
            marginLeft={15}
            flexDirection="row"
            gap={13}
            marginBottom={10}>
            <SkeletonPlaceholder.Item
              marginTop={6}
              width={65}
              height={40}
              borderRadius={8}
            />
            <SkeletonPlaceholder.Item
              marginTop={6}
              width={65}
              height={40}
              borderRadius={8}
            />
            <SkeletonPlaceholder.Item
              marginTop={6}
              width={90}
              height={40}
              borderRadius={8}
            />
            <SkeletonPlaceholder.Item
              marginTop={6}
              width={80}
              height={40}
              borderRadius={8}
            />
            <SkeletonPlaceholder.Item
              marginTop={6}
              width={140}
              height={40}
              borderRadius={8}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </>
  );
};

export default TagsSkeleton;
