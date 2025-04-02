import React from 'react';
import AddButton from '../components/AddButton';
import CreateChartDialog from '../CreateChartDialog';
import ChartWrapper from '../components/ChartWrapper';
import { Grid2 } from '@mui/material';

const CONFIG_BASE_URL = 'http://localhost:3000/';
const DEFAULT_SRC_IFRAME = `${CONFIG_BASE_URL}d-solo/fehivnuldmn7kb/new-dashboard?utm_source=grafana_gettingstarted&orgId=1&from=1743424187407&to=1743445787407&timezone=browser&panelId=1&__feature.dashboardSceneSolo`;

interface ICreateIFrame {
  src: string;
  height: number;
  width: number;
  keyId: number;
}

export default function ChartsPage() {
  const [iframeMap, setIFrameMap] = React.useState<
    Map<number, React.JSX.Element>
  >(new Map());

  const [createChartOpen, setCreateChartOpen] = React.useState<boolean>(false);

  function handleDeleteIFrame(keyId: number) {
    setIFrameMap(prevMap => {
      const newMap = new Map(prevMap);
      newMap?.delete(keyId);
      return newMap;
    });
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

  function createChart(newUrl?: string | null): [number, React.JSX.Element] {
    const newKeyId = Number(
      String(Date.now()) + String(Math.round(Math.random() * 10000))
    );
    const iframe = createIFrame({
      src: newUrl ?? DEFAULT_SRC_IFRAME,
      height: 200,
      width: 400,
      keyId: newKeyId
    });
    return [newKeyId, iframe];
  }

  function handleOpenCreateChartDialog() {
    setCreateChartOpen(true);
  }

  function handleNewMetrics(newMetrics: string[]) {
    const newMap = new Map<number, React.JSX.Element>(iframeMap);

    for (let i = 0; i < newMetrics.length; i++) {
      newMap.set(...createChart(DEFAULT_SRC_IFRAME));
    }

    setIFrameMap(newMap);
    setCreateChartOpen(false);
  }

  function handleSubmitUrl(newUrl?: string | null) {
    const newMap = new Map(iframeMap);
    newMap.set(...createChart(newUrl));
    // setIFrameMap(newMap);
  }

  // React.useMemo(() => {
  //   console.log(iframeMap);
  // }, [iframeMap]);

  return (
    <Grid2 sx={{ display: 'flex', flexDirection: 'column' }}>
      <AddButton handleClickButton={handleOpenCreateChartDialog} />

      {iframeMap ? iframeMap.values() : null}
      <CreateChartDialog
        open={createChartOpen}
        handleClose={(isCancel: boolean) =>
          isCancel && setCreateChartOpen(false)
        }
        sendNewMetrics={handleNewMetrics}
        sendNewUrl={(url: string | null) => handleSubmitUrl(url)}
      />
    </Grid2>
  );
}
