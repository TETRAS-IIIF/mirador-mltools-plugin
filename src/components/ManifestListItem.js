import React from 'react';
import ManifestListTools from '../containers/ManifestListTools';

const ManifestListItem = ({ TargetComponent, targetProps }) => {
  return (
      <div style={{ position: 'relative' }}>
        <TargetComponent {...targetProps} />
        <ManifestListTools {...targetProps} />
      </div>
  );
};

export default ManifestListItem;
