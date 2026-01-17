import {
  DownloadSimpleIcon,
  ShieldCheckIcon,
  TimerIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";

export default function StatisticsSectionIcons() {
  return (
    <section className="w-full px-4 py-12">
      <div className="d-g gtc-1 sm:gtc-2 lg:gtc-4 g-8">
        <div className="d-f fd-c ai-c g-4 ta-c">
          <div className="d-f ai-c jc-c w-12 h-12 br-pill bg-silver-1 c-black">
            <UsersThreeIcon size={24} />
          </div>
          <div className="d-f fd-c g-1">
            <span className="fs-3xl fw-700 c-black">86k+</span>
            <span className="fs-sm c-silver-10">Community Members</span>
          </div>
        </div>
        <div className="d-f fd-c ai-c g-4 ta-c">
          <div className="d-f ai-c jc-c w-12 h-12 br-pill bg-silver-1 c-black">
            <DownloadSimpleIcon size={24} />
          </div>
          <div className="d-f fd-c g-1">
            <span className="fs-3xl fw-700 c-black">21M+</span>
            <span className="fs-sm c-silver-10">Downloads</span>
          </div>
        </div>
        <div className="d-f fd-c ai-c g-4 ta-c">
          <div className="d-f ai-c jc-c w-12 h-12 br-pill bg-silver-1 c-black">
            <TimerIcon size={24} />
          </div>
          <div className="d-f fd-c g-1">
            <span className="fs-3xl fw-700 c-black">150ms</span>
            <span className="fs-sm c-silver-10">Average Latency</span>
          </div>
        </div>
        <div className="d-f fd-c ai-c g-4 ta-c">
          <div className="d-f ai-c jc-c w-12 h-12 br-pill bg-silver-1 c-black">
            <ShieldCheckIcon size={24} />
          </div>
          <div className="d-f fd-c g-1">
            <span className="fs-3xl fw-700 c-black">99.9%</span>
            <span className="fs-sm c-silver-10">Uptime Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
}
