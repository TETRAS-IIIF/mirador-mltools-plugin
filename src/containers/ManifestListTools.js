import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@mui/styles';
import * as actions from 'mirador/dist/es/src/state/actions';
import {
  getWindowIds,
  getManifest,
  getWindowManifests,
  getManifestoInstance, getCanvases,
} from 'mirador/dist/es/src/state/selectors';
import ManifestListTools from '../components/ManifestListTools';

function mapStateToProps(state, { manifestId }) {
  const windowIds = getWindowIds(state);
  const activeWindowIds = [];

  windowIds.forEach((value) => {
    const manifest = getManifest(state, { windowId: value });
    if (manifest && manifest.id === manifestId) {
      activeWindowIds.push(value);
    }
  });

  return {
    active: getWindowManifests(state).includes(manifestId),
    activeWindows: activeWindowIds,
    adapter: state.config.annotation.adapter,
    addCheckBox: state.workspace.addCheckBox,
    canvases: getCanvases(state,{manifestId}),
    manifestId,
    projectId: state.config.projectId,
    removeResourceButton: state.workspace.removeResourceButton,
  };
}

const mapDispatchToProps = {
  addWindow: actions.addWindow,
  onDismissClick: actions.removeResource,
  removeWindow: actions.removeWindow,
  updateWorkspaceMosaicLayout: actions.updateWorkspaceMosaicLayout,
};

const enhance = compose(
    withTranslation(),
    connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(ManifestListTools);
