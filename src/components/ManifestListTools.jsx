import React from 'react';
import PropTypes from 'prop-types';
import {Box, Button, Tooltip} from '@mui/material';
import CheckBoxOutlined from '@mui/icons-material/CheckBoxOutlined';
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank';
import DeleteIcon from '@mui/icons-material/Delete';

const ManifestListTools = (
    {
        active = false,
        activeWindows = [],
        adapter,
        addCheckBox,
        addWindow,
        canvases,
        manifestId,
        onDismissClick,
        projectId,
        removeWindow,
        t,
        updateWorkspaceMosaicLayout,
        removeResourceButton,
    }) => {

    const addWindowHandler = () => {
        addWindow({ manifestId });
    };

    const removeWindowHandler = () => {
        activeWindows.forEach((windowId) => {
            removeWindow(windowId);
        });
        /**
         * Ugly hack, needs improvement
         * Error on display if windows are removed and none remains
         * Layout update prevents bug, this solution updates always
         * */
        if (activeWindows.length > 0) {
            updateWorkspaceMosaicLayout();
        }
    };

    const removeManifestHandler = () => {
        // Initialize an empty array to hold canvas IDs
        for(const canvas of canvases) {
        const storageAdapter = adapter(canvas.id, projectId)
        storageAdapter.delete();
        }
        activeWindows.forEach((windowId) => {
            removeWindow(windowId);
        });
        /**
         * Duplicate, see above
         * */
        if (activeWindows.length > 0) {
            updateWorkspaceMosaicLayout();
        }

        onDismissClick(manifestId);
    };

    return (
        <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            justifyContent="space-between"
            gap={2}
            width="100%"
        >
            {
                addCheckBox &&(
                    <Tooltip title={active ? t('window_remove') : t('window_add')}>
                        <Button
                            onClick={active ? removeWindowHandler : addWindowHandler}
                            sx={{
                                minWidth: '40px',
                                minHeight: '40px',
                                padding: 0,
                            }}
                        >
                            {active ? <CheckBoxOutlined /> : <CheckBoxOutlineBlank />}
                        </Button>
                    </Tooltip>
                )
            }
            {
                removeResourceButton && (
                    <Tooltip title={t('manifest_remove')}>
                        <Button
                            onClick={removeManifestHandler}
                            sx={{
                                minWidth: '40px',
                                minHeight: '40px',
                                padding: 0,
                            }}
                            color="error"
                        >
                            <DeleteIcon />
                        </Button>
                    </Tooltip>
                )
            }
        </Box>
    );
};

ManifestListTools.propTypes = {
    active: PropTypes.bool,
    activeWindows: PropTypes.arrayOf(PropTypes.string),
    addCheckBox: PropTypes.bool.isRequired,
    adapter: PropTypes.any.isRequired,
    manifest: PropTypes.any.isRequired,
    manifestId: PropTypes.string.isRequired,
    onDismissClick: PropTypes.func.isRequired,
    removeWindow: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    updateWorkspaceMosaicLayout: PropTypes.func.isRequired,
    addWindow: PropTypes.func.isRequired,
    removeResourceButton: PropTypes.bool.isRequired,
};

export default ManifestListTools;
