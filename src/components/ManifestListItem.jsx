import React from 'react';
import ManifestListTools from '../containers/ManifestListTools';
import {Box} from "@mui/material";

const ManifestListItem = ({ TargetComponent, targetProps }) => {
    return (
        <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
        >
            <Box sx={{flexGrow: 1}}>
                <TargetComponent {...targetProps} />
            </Box>
            <Box>
                <ManifestListTools {...targetProps} />
            </Box>
        </Box>
    );
};

export default ManifestListItem;
