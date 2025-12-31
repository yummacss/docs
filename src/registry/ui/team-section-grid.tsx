export default function TeamSectionGrid() {
  return (
    <section className="py-12">
      <div className="ta-c mb-12">
        <h2 className="ff-s fs-3xl fw-600 c-black mb-4">The Team</h2>
        <p className="fs-lg c-silver-10 max-w-sm m-auto">
          Meet the people behind the magic. We are a diverse team of passionate
          individuals.
        </p>
      </div>
      <div className="d-g gtc-1 md:gtc-2 lg:gtc-4 g-6">
        <div className="d-f fd-c g-3 ta-c">
          <div className="w-22 m-auto br-pill o-h">
            <img
              src="/img/people/phoenix-baker.jpg"
              alt="Phoenix Baker"
              className="w-full ar-1/1 of-c"
            />
          </div>
          <div>
            <p className="fs-md fw-600 c-black">Phoenix Baker</p>
            <p className="fs-sm c-silver-10">Engineering Manager</p>
          </div>
        </div>
        <div className="d-f fd-c g-3 ta-c">
          <div className="w-22 m-auto br-pill o-h">
            <img
              src="/img/people/kaitlin-hale.jpg"
              alt="Kaitlin Hale"
              className="w-full ar-1/1 of-c"
            />
          </div>
          <div>
            <p className="fs-md fw-600 c-black">Kaitlin Hale</p>
            <p className="fs-sm c-silver-10">Product Designer</p>
          </div>
        </div>
        <div className="d-f fd-c g-3 ta-c">
          <div className="w-22 m-auto br-pill o-h">
            <img
              src="/img/people/kelly-williams.jpg"
              alt="Kelly Williams"
              className="w-full ar-1/1 of-c"
            />
          </div>
          <div>
            <p className="fs-md fw-600 c-black">Kelly Williams</p>
            <p className="fs-sm c-silver-10">Frontend Developer</p>
          </div>
        </div>
        <div className="d-f fd-c g-3 ta-c">
          <div className="w-22 m-auto br-pill o-h">
            <img
              src="/img/people/katy-fuller.jpg"
              alt="Katy Fuller"
              className="w-full ar-1/1 of-c"
            />
          </div>
          <div>
            <p className="fs-md fw-600 c-black">Katy Fuller</p>
            <p className="fs-sm c-silver-10">Marketing Specialist</p>
          </div>
        </div>
      </div>
    </section>
  );
}
