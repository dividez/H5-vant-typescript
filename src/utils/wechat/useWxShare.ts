import { useWxSDK } from "./useWxSDK";
import { getJsSdkConfig } from "@/api/authApi";
import {useVisitUrlStore} from "@/store/modules/visitUrlStore";

export function useWxShare(shareConfig: {
  title: string;
  imgUrl: string;
  desc: string;
  shareUrl?: string
}) {
  const { initConfig, setShareInfo, isiOSWechat } = useWxSDK();

  // 当前url
  const currentUrl = window.location.href.split("#")[0];
  const signatureUrl = isiOSWechat()
    ? useVisitUrlStore().getVisitUrl
    : currentUrl;

  const link = shareConfig.shareUrl || currentUrl;

  getJsSdkConfig({
    url: signatureUrl
  }).then((config: any) => {
    initConfig(config).then(() => {
      setShareInfo({
        ...shareConfig,
        link: link,
      });
    });
  });
}