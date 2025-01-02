import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip, Typography } from '@mui/material';
import CheckBoxOutlined from '@mui/icons-material/CheckBoxOutlined';
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank';

const ManifestListTools = (
    {
        active,
        activeWindows,
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
        <>
            <Tooltip title={active ? t('window_remove') : t('window_add')}>
                <Button
                    className={classes.windowAddRemove}
                    onClick={active ? removeWindowHandler : addWindowHandler}
                >
                    {active ? <CheckBoxOutlined /> : <CheckBoxOutlineBlank />}
                </Button>
            </Tooltip>

            <Button className={classes.manifestRemove} onClick={removeManifestHandler}>
                <Typography variant="body1">{t('manifest_remove')}</Typography>
            </Button>
        </>
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

ManifestListTools.defaultProps = {
    active: false,
    activeWindows: [],
};

export default ManifestListTools;
