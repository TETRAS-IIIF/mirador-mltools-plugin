import React from 'react';
import ManifestListTools from '../containers/ManifestListTools';
import {Box} from "@mui/material";

const ManifestListItem = ({ TargetComponent, targetProps }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
        >
            <Box>
                <TargetComponent {...targetProps} />
            </Box>
            <Box>
                <ManifestListTools {...targetProps} />
            </Box>
        </Box>
    );
};

export default ManifestListItem;
