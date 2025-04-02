import React from 'react';
import AddButton from '../components/AddButton';
import CreateChartDialog from '../CreateChartDialog';
import ChartWrapper from '../components/ChartWrapper';

const CONFIG_BASE_URL = 'http://localhost:3000/';
const DEFAULT_SRC_IFRAME = `${CONFIG_BASE_URL}d-solo/ceetwcgabhgcgb/ping-go-server?orgId=1&from=1741098858351&to=1741100658351&timezone=browser&panelId=1&__feature.dashboardSceneSolo`;

interface ICreateIFrame {
  src: string;
  height: number;
  width: number;
  keyId: number;
}

export default function ChartsPage() {
  const [iframeList, setIFrameList] = React.useState<Map<
    number,
    React.JSX.Element
  > | null>(null);
  const [createChartOpen, setCreateChartOpen] = React.useState<boolean>(false);

  function handleDeleteIFrame(keyId: number) {
    const newMap = new Map(iframeList);
    newMap?.delete(keyId);
    setIFrameList(newMap);
  }

  function createIFrame({ src, height, width, keyId }: ICreateIFrame) {
    return (
      <ChartWrapper
        keyId={keyId}
        src={src}
        width={width}
        height={height}
        onDelete={handleDeleteIFrame}
      />
    );
  }

  function handleCreateChart(newUrl?: string | null) {
    const newKeyId = Date.now();
    const iframe = createIFrame({
      src: newUrl ?? DEFAULT_SRC_IFRAME,
      height: 200,
      width: 400,
      keyId: newKeyId
    });

    if (iframeList) {
      const newMap = new Map(iframeList);
      newMap.set(newKeyId, iframe);
      setIFrameList(newMap);
    } else {
      setIFrameList(new Map([[newKeyId, iframe]]));
    }
    setCreateChartOpen(false);
  }

  function handleOpenCreateChartDialog() {
    setCreateChartOpen(true);
  }

  return (
    <div>
      <AddButton handleClickButton={handleOpenCreateChartDialog} />

      {iframeList ? iframeList.values() : null}
      <CreateChartDialog
        open={createChartOpen}
        handleClose={(isCancel: boolean) =>
          isCancel && setCreateChartOpen(false)
        }
        sendNewUrl={(url: string | null) => handleCreateChart(url)}
      />
    </div>
  );
}
