# mirador-mltools-plugin

Demo available here : https://tetras-iiif.github.io/mirador-mltools-plugin/

`mirador-mltools-plugin` is a [Mirador 4](https://github.com/projectmirador/mirador) plugin that adds tools to the manifest list displayed when `isWorkspaceAddVisible = true`. Users can remove an added manifest from the viewer by pressing the `Remove resource` button. Another feature is to open and close a manifest in the gallery view without switching views. 
## Installing `mirador-mltools-plugin`
`mirador-mltools-plugin` requires an instance of Mirador 4. See the [Mirador wiki](https://github.com/ProjectMirador/mirador/wiki) for examples of embedding Mirador within an application. See the [demo's index.js](https://github.com/slub/mirador-mltools-plugin/blob/main/demo/src/index.js) for an example of importing the `mirador-mltools-plugin`.

# Fork 

This repo is a fork from https://github.com/slub/mirador-mltools-plugin
- We add the M4 support (R19, MUI7, Vite build)
- We improve UI 
- We add GitHub actions to auto deploy demos (GitHub pages, with stable and latest)

We hae submitted unaccepted PR to the original repo. Original repo is not maintained anymore.
We also add some features to the plugin to support Mirador Multi User environment. See https://github.com/TETRAS-IIIF/mirador-multi-user

