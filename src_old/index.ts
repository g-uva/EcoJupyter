import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the egi-jupyterlab-ext extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'egi-jupyterlab-ext:plugin',
  description: 'A JupyterLab extension for EGI and Notebooks.',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension egi-jupyterlab-ext is activated!');
  }
};

export default plugin;
