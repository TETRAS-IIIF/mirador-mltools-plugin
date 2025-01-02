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
        manifestId,
        manifest,
        projectId,
        removeWindow,
        t,
        updateWorkspaceMosaicLayout,
        classes,
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
        const canvasIds = [];
        console.log(projectId);
        // Iterate over the canvases in the `sequences` array
        if (manifest.__jsonld && manifest.__jsonld.sequences) {
            manifest.__jsonld.sequences.forEach(sequence => {
                if (sequence.canvases) {
                    sequence.canvases.forEach(canvas => {
                        if (canvas["@id"]) {
                            canvasIds.push(canvas["@id"]);
                        }
                    });
                }
            });
        }
        console.log('canvasIds',canvasIds);
        for(const canvasId of canvasIds) {
        const storageAdapter = adapter(canvasId, projectId)
        storageAdapter.delete();
        }
        // activeWindows.forEach((windowId) => {
        //     removeWindow(windowId);
        // });
        // /**
        //  * Duplicate, see above
        //  * */
        // if (activeWindows.length > 0) {
        //     updateWorkspaceMosaicLayout();
        // }
        //
        // onDismissClick(manifestId);
    };

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
            width="100%"
        >
            {
                addCheckBox &&(
                    <Tooltip title={active ? t('window_remove') : t('window_add')}>
                        <Button
                            className={classes.windowAddRemove}
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
                            className={classes.manifestRemove}
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
    classes: PropTypes.shape({
        windowAddRemove: PropTypes.string,
        manifestRemove: PropTypes.string,
    }).isRequired,
    removeResourceButton: PropTypes.bool.isRequired,
};

export default ManifestListTools;
