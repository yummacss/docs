/** biome-ignore-all lint/performance/noImgElement: This is a React demo not a Next.js demo */
export default function TeamSectionGrid() {
  return (
    <section className="py-12">
      <div className="ta-c mb-12">
        <h2 className="fs-3xl fw-600 c-black mb-4">The Team</h2>
        <p className="fs-lg c-silver-10 max-w-sm m-auto">
          Meet the people behind the magic. We are a diverse team of passionate
          individuals.
        </p>
      </div>
      <div className="d-g gtc-1 md:gtc-2 lg:gtc-4 g-6">
        <div className="d-f fd-c g-3 ta-c">
          <div className="w-22 m-auto br-pill o-h">
            <img
              src="https://untitledui.com/images/avatars/jordan-burgess"
              alt="Jordan Burgess"
              className="w-full ar-1/1 of-c"
            />
          </div>
          <div>
            <p className="fs-md fw-600 c-black">Jordan Burgess</p>
            <p className="fs-sm c-silver-10">Chief Technology Officer</p>
          </div>
        </div>
        <div className="d-f fd-c g-3 ta-c">
          <div className="w-22 m-auto br-pill o-h">
            <img
              src="https://untitledui.com/images/avatars/aysha-becker"
              alt="Aysha Becker"
              className="w-full ar-1/1 of-c"
            />
          </div>
          <div>
            <p className="fs-md fw-600 c-black">Aysha Becker</p>
            <p className="fs-sm c-silver-10">Product Manager</p>
          </div>
        </div>
        <div className="d-f fd-c g-3 ta-c">
          <div className="w-22 m-auto br-pill o-h">
            <img
              src="https://untitledui.com/images/avatars/sally-mason"
              alt="Sally Mason"
              className="w-full ar-1/1 of-c"
            />
          </div>
          <div>
            <p className="fs-md fw-600 c-black">Sally Mason</p>
            <p className="fs-sm c-silver-10">Lead Designer</p>
          </div>
        </div>
        <div className="d-f fd-c g-3 ta-c">
          <div className="w-22 m-auto br-pill o-h">
            <img
              src="https://untitledui.com/images/avatars/abraham-baker"
              alt="Abraham Baker"
              className="w-full ar-1/1 of-c"
            />
          </div>
          <div>
            <p className="fs-md fw-600 c-black">Abraham Baker</p>
            <p className="fs-sm c-silver-10">Software Engineer</p>
          </div>
        </div>
      </div>
    </section>
  );
}
