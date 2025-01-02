import React from 'react';
import PropTypes from 'prop-types';
import {Box, Button, Tooltip, Typography} from '@mui/material';
import CheckBoxOutlined from '@mui/icons-material/CheckBoxOutlined';
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank';
import DeleteIcon from '@mui/icons-material/Delete';

const ManifestListTools = (
    {
        active = false,
        activeWindows = [],
        addWindow,
        manifestId,
        onDismissClick,
        removeWindow,
        t,
        updateWorkspaceMosaicLayout,
        classes,
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
        <Box alignContent="center" justifyContent="center">
            <Tooltip title={active ? t('window_remove') : t('window_add')}>
                <Button
                    className={classes.windowAddRemove}
                    onClick={active ? removeWindowHandler : addWindowHandler}
                >
                    {active ? <CheckBoxOutlined /> : <CheckBoxOutlineBlank />}
                </Button>
            </Tooltip>
            <Tooltip title={t('manifest_remove')}>
                <Button className={classes.manifestRemove} onClick={removeManifestHandler}>
                    <DeleteIcon/>
                </Button>
            </Tooltip>
        </Box>
    );
};

ManifestListTools.propTypes = {
    active: PropTypes.bool,
    activeWindows: PropTypes.arrayOf(PropTypes.string),
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
};

export default ManifestListTools;
